// entry-server.js
import { createSSRApp } from 'vue';
import { sync } from 'vuex-router-sync';
import { renderToString } from '@vue/server-renderer';

import App from './App.vue';
import createRouter from "./modules/router/index"
import createStore from "./modules/store/index"

export async function render(url) {
    const router = createRouter();
    const store = createStore();
    sync(store, router);

    const app = createSSRApp(App);
    app.use(router);
    app.use(store);

    await router.push(url);
    await router.isReady();
    const state = store.state;
    const appHtml = await renderToString(app, {});

    return { appHtml, state };
}