const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    next();
});

server.use((req, res, next) => {
    if (req.method === 'GET' && req.path === '/attractions') {
        const data = router.db.getState().attractions;
        res.setHeader('X-Total-Count', data.length);
    }
    next();
});

server.use(router);

server.listen(3001, () => {
    console.log('JSON Server работает на порту 3001');
});