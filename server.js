// server.js
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const resolve = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(resolve('./dist/client/index.html'), 'utf-8');
const manifest = require('./dist/client/ssr-manifest.json');
const render = require('./dist/server/entry-server.js').render;

app.use(express.static(resolve('./dist/client'), { index: false }));
app.get('*', async (req, res) => {
    const url = req.originalUrl;
    try {
        const {appHtml, state} = await render(url, manifest);
        const html = template.replace('<!--ssr-outlet-->', appHtml)
            .replace(`'<!--vuex-state-->'`, JSON.stringify(state))
            .replace('<!--title-->', state.route.meta.title || '模板初始化');
        res.status(200).set({'Content-Type': 'text/html'}).send(html);
    } catch (e) {
        console.log(e);
        res.status(500).end(e.message);
    }
});

app.listen(2000, () => {
    console.log('生产环境： http://localhost:2000');
});