module.exports = {
    server: {
        middleware: {
            1: function (req, res, next) {
                if (req.url === '/favicon.ico') {
                    res.writeHead(204, { 'Content-Type': 'image/x-icon' });
                    res.end('');
                } else {
                    next();
                }
            }
        }
    }
};
