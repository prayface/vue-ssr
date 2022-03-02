const fs = require('fs');
const path = require('path');
const express = require('express');
const {createServer: createViteServer} = require('vite');

const app = express();

createViteServer({
    server: {middlewareMode: true},
}).then(vite => {
    app.use(vite.middlewares);
    app.get("*", async (req, res) => {
        // serve index.html - we will tackle this next
        const url = req.originalUrl;

        try {
            // 1. Read index.html
            let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

            // 2. Apply vite HTML transforms.
            template = await vite.transformIndexHtml(url, template);

            // 3. Load the server entry. vite.ssrLoadModule
            const {render} = await vite.ssrLoadModule('/src/entry-server.js');

            // 4. render the app HTML.
            const {appHtml, state} = await render(url);

            // 5. Inject the app-rendered HTML into the template.
            const html = template.replace('<!--ssr-outlet-->', appHtml)
                .replace(`'<!--vuex-state-->'`, JSON.stringify(state))
                .replace('<!--title-->', state.route.meta.title || '模板初始化');

            // 6. Send the rendered HTML back.
            res.status(200).set({'Content-Type': 'text/html'}).send(html);
        } catch (e) {
            // If an error is caught,
            vite.ssrFixStacktrace(e);
            console.error(e);
            res.status(500).end(e.message);
        }
    });

    app.listen(8080, () => {
        console.log('http://localhost:8080');
    });
})
