const http = require('http');
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3000;

function status404(response) {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write('<h1>404 Not Found</h1>');
    response.end();
}

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.js': 'application/javascript'
};

function getFilename(req) {
    if (req.url === '/') return 'index.html';
    return req.url;
}

http.createServer((request, response) => {
    if (request.method === 'GET') {

        let filename = getFilename(request);
        let filepath = path.resolve('./public/' + filename);

        let mimeType = mimeTypes[path.extname(filepath)];
        if (!mimeType) return status404(response);

        fs.exists(filepath, (exists) => {
            if (!exists) return status404(response);

            response.writeHead(200, {'Content-Type': mimeType});
            fs.createReadStream(filepath).pipe(response);
        });

    }
}).listen(port);
console.log("Server running at port " + port);

