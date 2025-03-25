module.exports = (server) => {
    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        next();
    });

    server.db.on('ready', () => {
        const db = server.db.getState();
        server.use((req, res, next) => {
            if (req.method === 'GET' && req.path === '/attractions') {
                const data = db.attractions;
                res.header('X-Total-Count', data.length);
            }
            next();
        });
    });

    return server;
};