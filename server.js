// Se importa el modulo http para poder crear el servidor, con el metodo createServer, el cual recibe una función asincrona -para leer los archivos sin bloqueo-. Esta función recibe 2 parametros req y res (podemos definir cualquier nombre, pero es un request -peticion- y un response -respuesta- en ese orden) dentro gracias a los metodos de res.write, res.setHeader y res.statusCode se configura el servidor y se envía los archivos que se desean entregar. Se le pregunta al req.url, req.method para saber que tipo de petición está haciendo (req.method para GET, POST, etc...) y las URL que está solicitandose). Para que el servidor comience a "escuchar" o a "correr" se usa el objeto creado de createServer y se le llama el metodo .listen(PORT, callback)
import http from 'http';

// El módulo url es usado para llamar a su metodo .fileURLtoPath, el cual es necesario para transformar el objeto import.meta.url en la dirección absoluta del archivo donde está este mismo servidor.
import url from 'url';

// Con este módulo quitamos la parte del archivo en la ruta que nos devolvió url.fileURLtoPath(import.meta.url) y de esta forma tenemos la ruta donde podemos encontrar los archivos que deseamos servir. Por ejemplo en la carpeta Public, index.html y about.html. Esto se logra con path.dirname()
//Por ejemplo path.dirname(utl.fileURLToPath(import.meta.url))
// Además usamos su metodo .join para unir __dirname, public, index.html que nos devuelve __dirname/public/index.html (la verdad no entiendo porque no hacer esto hardcordeado, es una función un poco innecesaria si lo pienso hasta acá...) 
import path from 'path';


// Se importa el modulo fs de promesas (tiene otras versiones, esta es la recomendada para que no se bloquee! recordar que la función que recibe createServer debe ser async para que este funcione.) fs.readFile(filePath) es la funcion usada aqui y la ocupamos para leer el archivo html. el filePath se obtiene gracias al modulo url y path
import fs from 'fs/promises'

//
const PORT = process.env.PORT;

//Get current path
// estos no son accesibles si se usa ESMODULES ("type": "module";) asi que quedan comentados pero no es dificil obtenerlos gracias a url y path
// __filename 
// __dirname

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename, __dirname);

const server = http.createServer(async (req, res) => {
    // res.write('whaaat');
    // res.setHeader('Content-Type', 'text/html');
    // res.statusCode = 404;
    // console.log(req.url);
    // console.log(req.method);
    try {
        // Verificar que es un GET request
        if(req.method === 'GET') {
            let filePath;
            if (req.url === "/"){
                filePath = path.join(__dirname, 'public', 'index.html')
            } else if (req.url === "/about"){
                filePath = path.join(__dirname, 'public', 'about.html')

            } else{
                throw new Error('Not Found')
            }

            const data = await fs.readFile(filePath);
            res.setHeader('Content-Type', 'text/html');
            res.write(data);
            res.end()
        } else {
            throw new Error('Method not allowed')
        }
    } catch (error) {
        res.writeHead(500,"whaaat",{'Content-Type': 'text/plain'})
        res.end(`Server Error`);
    }

    
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});