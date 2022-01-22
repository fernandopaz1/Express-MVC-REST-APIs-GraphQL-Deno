# Backend Node

Este es un proyecto parte de un [curso de udemy](https://www.udemy.com/course/nodejs-the-complete-guide/) sobre nodejs.

Acá cubro la parte básica que es como montar un backend sin librerias para comprender cada parte por separado.


## Event loop [[fuente](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)]

Node esta basado en una arquitectura event driven, básicamente definimos callbacks que se ejecutan cuando ciertos eventos son disparados. 
El event loop es un proceso que se encarga de chequear que tipos de eventos ocurren y a que callback llamar. Una vez termina esa iteración, empieza una nueva.

El orden de ejecución en cada iteración es el siguiente:

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
   ```

* Primero se encarga de ejecutar los callbacks correspondientes a eventos de Timers, ejecutando los setTimeout y setIntervals si el tiempo se cumplió.
* Pending callbacks: son los que se dan luego de la finalización de una tarea pendiente (Bloqueante) por ejemplo una operación de I/O o recibir tipos de  errores TCP. En estos casos se ejecuta la tarea posterior a la finalización de la operación pendiente.
* idle, prepare: se usa solo internamente.
* Poll fase: en esta parte nodejs se fija si hay nuevos I/O events y ejecuta sus callbacks inmediatamente si es posible, si no es posible en la siguiente iteración son tratados como pending callbacks.
* Check fase: Es la fase que nos permite ejecutar código inmediatamente, pero siempre y cuando algún callback haya ocurrido.
* Close callback: si el socket es cerrado abruptamente se emite el ``close`` event y se el callback correspondiente.

## Como pensar eventDriven [[fuente](https://nodejs.org/en/docs/guides/dont-block-the-event-loop/)]

La idea principal de node es que el event loop corre en un proceso single thread. Esto significa que si alguno de estos callbacks que llamamos se bloquea entonces se bloquea el event loop y nuestro servidor deja de escucha las peticiones.

### Worker Pool
El worker pool es el responsable de las operaciones que requieren un mayor poder de calculo y podrían bloquear el even loop si las ejecutáramos sincronicamente. Básicamente se trata de un subproceso distinto del event loop y cuando esta operación termina se ejecuta un callback que dispara un evento avisando al event loop que la tarea esta completa.<br>
 La gran ventaja es que los procesos dentro del worker pool no están limitados a un solo thread haciendo posible que muchas de estas operaciones se ejecuten concurrentemente sin afectar al event loop.

### Como deben ser los callbacks
Es importante notar que los callbacks deben ser funciones que se ejecuten rápidamente sin bloquear el event loop asi tenemos la oportunidad de seguir iterando atendiendo las peticiones de otros usuarios.

También queremos darle un tiempo de atención a cada usuario equitativo, es decir no darle mucha atención a un solo usuario en detrimento de los demás.

Un buen indicio puede ser que la complejidad computational de nuestros callbacks sea constante e independiente del usuario que hace la llamada. Si esto no fuera asi podría haber algunos usuarios con datos que requieran mas tiempo que otros.

En caso de no poder hacer esto y tener una complejidad no constante otra opción es limitar el los tipos de datos que pueden tener ciertos usuarios.

### Problemas de seguridad DOS

Un problema que puede pasar si no cuidamos la calidad de nuestros callbacks son los ataques de denegación de servicio ([DoS](https://en.wikipedia.org/wiki/Denial-of-service_attack)).
Esto ocurre porque por error dejamos callbacks que pueden tener un computo intensivo dependiendo de los datos del usuario, bloqueado el event loop. Si este tipo de peticiones se repiten con una frecuencia muy grande el event loop estaría bloqueado la mayoría del tiempo si poder atender nuevas peticiones.

Hay ciertos tipos de patrones que pueden llegar a permitir un ataque DoS, estos son:

* REDOS: Es cuando dentro del callback se usa una expresión regular para validar un dato. Dependiendo de la expresión regular y de la implementación puede llegar a tener complejidad exponencial. <br>
Hay herramientas para chequear la seguridad de expresiones regulares como [safe-regex](https://github.com/substack/safe-regex) y [rxxr2](http://www.cs.bham.ac.uk/~hxt/research/rxxr2/).
También existen otras implementaciones de expresiones regulares como la libreria [node-re2](https://github.com/uhop/node-re2), que si bien es más rápida, no soporta todas las expresiones regulares como el motor V8.

* JSON DOS: `JSON.parse` y `JSON.stringify` son potencialmente peligrosos, ya que ambos son `O(n)`. Por ejemplo `JSON.parse` y `JSON.stringify` sobre un archivo de tamaño 2^21 podría tardar 1.3 segundos en correr ambas operaciones, lo cual haciéndolo repetidas veces bloquea el event loop. <br>
Una forma de evitar este comportamiento es usando librerías que hagan estas operaciones de forma asíncrona como [JSONStream](https://www.npmjs.com/package/JSONStream) y
[Big-Friendly JSON](https://www.npmjs.com/package/bfj) 


### Particionado y offLoading

El particionado y offloading son dos estrategias para hacer cálculos complejos sin bloquear el event loop.

* Partitioning: Es básicamente guardar el estado de la función que requiere el calculo complejo y mediante un llamado a `setImmediate` hacer que retome en la siguiente iteración del event loop.<br>
Esto tiene una desventaja que es que estamos usando el event loop para hacer cálculos complejos y no aprovechamos los multiples cores de la maquina, pero al menos estamos seguros de no bloquearlo. La idea es que el event loop maneje los client request, no tiene que completarlos por si mismo.

* Offloading: Esta opción es utilizando directamente el built-in working pool desarrollando un addon en C++ o simplemente creando un nuevo working pool usando [Child Process](https://nodejs.org/api/child_process.html) o [Cluster](https://nodejs.org/api/cluster.html).<br>
Es importante no crear un proceso por cada cliente ya que pueden llegar peticiones mas rápido de lo que se puedan crear transformando al server en un fork bomb.