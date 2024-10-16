import { createServer } from 'http';
// const PORT = process.env.PORT;
const PORT = 8000;

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Tac Yon' },
    { id: 3, name: 'Jorge Yon' },
];

//Logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}

const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}

//Route handler for GET /api/users
const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
}

//Route handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
    const urlSplit = req.url.split('/');
    const id = urlSplit[urlSplit.length - 1];
    const user = users.find((user) => user.id === parseInt(id))

    if (user) {
        res.write(JSON.stringify(user));
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: '404: user not founr' }));
    }
    res.end()
}

//Route handler for POST /api/users
const createUserHandler = (req, res) => {
    let body = '';
    // Listen for data
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const newUser = JSON.parse(body);
        users.push(newUser);
        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
        res.end();
    })
}

// Not found handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'routeNotFound' }));
    res.end();
}

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === '/api/users' && req.method === 'GET') {
                getUsersHandler(req, res);
            } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
                getUserByIdHandler(req, res);
            } else if (req.url === '/api/users' && req.method === 'POST') {
                createUserHandler(req, res)
            } else {
                notFoundHandler(req, res);
            }
        })
    })
});

server.listen(PORT, () => {
    console.log(`server running on portTTT ${PORT}`);
})