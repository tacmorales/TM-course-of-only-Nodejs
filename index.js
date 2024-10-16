// console.log(global); objeto del ambiente de node
// console.log(process); objeto del ambiente de node

// COMMONJS para importar!!!!
// const generateRandomNumber = require('./utils');
// console.log(`Numero al azar: ${generateRandomNumber()}`)

// COMMONJS para importar 2 funciones!!!!
// Un patron es guardar todas las funciones en un objeto y simplemente se importa el objeto
// También se tiende a expotar funciones un poco más grandes que hacen un proceso en la aplicación
// const { generateRandomNumber, celciusToFahrenheit} = require('./utils');
// const celsius = generateRandomNumber();
// console.log(`Temperatura celsius al azar: ${celsius}`)
// console.log(`La misma temperatura pero en Fahrenheit: ${celciusToFahrenheit(celsius)}`)

// ESMODULES para importar import export
// para eso se agrega "type": "module"; en package.json en la raiz del objeto
// sin curly braces {} solo default.
// con curly braces son para los export
import getPosts, {getPostsLength} from "./postController.js";

console.log(getPosts());
console.log(getPostsLength());

