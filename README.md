# Práctica de laboratorio 4: Traducción dirigida por la sintaxis
Esta práctica tiene como objetivo configurar el entorno de trabajo para el resto de prácicas de la asignatura. Se utiliza JavaScript como lenguaje principal y se introduce Jison como generador de analizadores sintácticos para crear estructuras como árboles sintácticos abstractos (AST).

Está práctica tiene como objetivo el desarrollo de una calculadora aritmética utilizando **Jison**, un generador de analizadores sintácticos para **JavaScript**. La idea será implementar una **definición dirigida por la sintaxis** que permita no solo reconocer expresiones matemáticas, sino que también calcular su valor en tiempo real durante el análisis.

Esta práctica forma parte de la asignatura **Procesadores de Lenguajes**, una de las [asignaturas obligatorias del itinerario de Computación](https://drive.google.com/file/d/12ELpn-UL12sExDYd6yw_X6WwZVcq4q4G/view).

## Estructura del informe
Las tareas que debemos realizar para configurar el entorno serán:

1. Instalar dependencias y ejecutar los test
2. Cuestiones sobre el Lexer en Jison
3. Modificar el analizador léxico de grammar.jison para que se salte los comentarios de una línea que empiezan por //.
4. Modificar el analizador léxico de grammar.jison para que reconozca números en punto flotante.
5. Añadir pruebas para las modificaciones del analizador léxico de grammar.jison.

---

### 1. Instalar dependencias y ejecutar los test
El repositorio ya incluía una base con la gramática, el lexer y las funciones de cálculo. Los pasos realizados fueron:

- Instalación: Se ejecutó `npm install` para obtener las dependencias necesarias, como Jison y Jest.
- Compilación: Se generó el analizador sintáctico ejecutable con el comando `npx jison src/grammar.jison -o src/parser.js`.
- Test: Se ejecutó `npm test` para comprobar que todo funcionaba correctamente.

![test](media/test.png)

### 2. Cuestiones sobre el Lexer en Jison

1. **Describa la diferencia entre /\* skip whitespace \*/ y devolver un token.**

Cuando usamos `/* skip whitespace */` lo que sucede es que el analizador lo ignora y pasa al siguiente carácter, como si no hubiera habido nada en el fichero. Sin embargo, cuando usamos `return` el lexer lo identifica (ya sea número u operador) y se lo pasa al analizador sintáctico.

2. **Escriba la secuencia exacta de tokens producidos para la entrada 123\*\*45+@.**

123 → NUMBER

\** → OP

45 → NUMBER

\+ → OP

@ → INVALID

al terminar la entrada → EOF

3. **Indique por qué ** debe aparecer antes que [-+*/].**

Porque el lexer aplica las reglas en orden. Es decir, si tenemos la regla de [-+*/] antes que **, no llegaría a ** sino que se quedaría con * y luego el segundo * como otro OP diferente. Lo que queremos es que ** se reconozca como un solo operador para evitar errores. Siempre que una regla pueda coincidir al inicio con otra, debemos escribir la más larga arriba.

Esto también puede coincidir con *else* y *elseif*, que siguiendo esta lógica, *elseif* tendría que ir el primero.

4. **Explique cuándo se devuelve EOF.**

EOF se devuelve cuando se llega al final del fichero y no no quedan más caracteres por leer. Es una forma de indicarle al parser que el análisis ha terminado.

5. **Explique por qué existe la regla . que devuelve INVALID.**

La regla *.* se aplicará a cualquier carácter que no haya sido reconocido por las reglas anteriores. Nos va a servir para identificar errores, como devolvemos el token *INVALID* podremos gestionar dicho error como queramos. De esta manera el programa no se rompe de golpe sino que podemos decir, por ejemplo, `Expecting 'NUMBER', got 'INVALID'`.

### 3. Modificar el analizador léxico de grammar.jison para que se salte los comentarios de una línea que empiezan por //.

Para lograr que el analizador ignore los comentarios, he añadido una nueva regla al bloque %lex en el archivo `grammar.jison`:

`"//".*           { /* skip comments */ }`

Gracias a esta regla, cualquier texto que empiece por //, seguido de cualquier carácter (.*), será ignorado.

![comments](media/comments.png)

### 4. Modificar el analizador léxico de grammar.jison para que reconozca números en punto flotante.

Lo que hice en este caso fue modificar la regla original que decía que los números seguían la regla [0-9]+. Esta es la nueva expresión regular:

`[0-9]+(\.[0-9]+)?([eE][-+]?[0-9]+)?      { return 'NUMBER'; }`

Con esta nueva expresión, el token NUMBER puede reconocer números **enteros**, u opcionalmente tener **parte decimal**, con **notación científica**, o **ambas**. Para la notación científica acepta tanto negativos como positivos, y *e* mayúscula y minúscula.

![float-numbers](media/float-numbers.png)

### 5. Añadir pruebas para las modificaciones del analizador léxico de grammar.jison.

Para verificar que las modificaciones funcionan correctamente, he añadido nuevas pruebas al fichero `parser.test.js`. Además de comprobar que se procesan correctamente (ignorando los comentarios y tomando los flotantes como números), se hacen operaciones con números float.

Estos son las pruebas añadidas:

![modified-test](media/modified-test.png)

Y vemos que se ejecutan correctamente:

![test-final](media/test-final.png)