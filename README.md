# Práctica de laboratorio 4: Traducción dirigida por la sintaxis
Esta práctica tiene como objetivo configurar el entorno de trabajo para el resto de prácicas de la asignatura. Se utiliza JavaScript como lenguaje principal y se introduce Jison como generador de analizadores sintácticos para crear estructuras como árboles sintácticos abstractos (AST).

Está práctica tiene como objetivo el desarrollo de una calculadora aritmética utilizando **Jison**, un generador de analizadores sintácticos para **JavaScript**. La idea será implementar una **definición dirigida por la sintaxis** que permita no solo reconocer expresiones matemáticas, sino que también calcular su valor en tiempo real durante el análisis.

Esta práctica forma parte de la asignatura **Procesadores de Lenguajes**, una de las [asignaturas obligatorias del itinerario de Computación](https://drive.google.com/file/d/12ELpn-UL12sExDYd6yw_X6WwZVcq4q4G/view).

## Estructura del informe
Las tareas que debemos realizar para configurar el entorno serán:

1. Instalar dependencias y ejecutar los test
2. 

---

### 1. Instalar dependencias y ejecutar los test
El repositorio ya incluía una base con la gramática, el lexer y las funciones de cálculo. Los pasos realizados fueron:

- Instalación: Se ejecutó `npm install` para obtener las dependencias necesarias, como Jison y Jest.
- Compilación: Se generó el analizador sintáctico ejecutable con el comando `npx jison src/grammar.jison -o src/parser.js`.
- Test: Se ejecutó `npm test` para comprobar que todo funcionaba correctamente.

![test](media/test)