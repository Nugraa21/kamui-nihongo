// ========================================
// NihonGo! Preview Server (Node.js)
// Run: node preview.js
// ========================================

const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
};

const PORT = 3000;
const SRC_DIR = path.join(__dirname, 'src');

const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/index.html';

    const filePath = path.join(SRC_DIR, urlPath);
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Security: prevent directory traversal
    if (!filePath.startsWith(SRC_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <html>
                <body style="background:#1e1f22;color:#f2f3f5;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">
                    <div style="text-align:center">
                        <h1 style="font-size:48px;margin:0">404</h1>
                        <p>File not found: ${urlPath}</p>
                    </div>
                </body>
                </html>
            `);
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType + '; charset=utf-8' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log('');
    console.log('  ╔══════════════════════════════════════╗');
    console.log('  ║     NihonGo! Preview Server          ║');
    console.log('  ║                                      ║');
    console.log(`  ║  -> http://localhost:${PORT}             ║`);
    console.log('  ║                                      ║');
    console.log('  ║  Press Ctrl+C to stop                ║');
    console.log('  ╚══════════════════════════════════════╝');
    console.log('');
});
