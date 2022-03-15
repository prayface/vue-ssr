import {createSSRApp} from 'vue';
import {sync} from "vuex-router-sync"

import App from './App.vue';
import createRouter from "./modules/router/index"
import createStore from "./modules/store/index"
import uiModules from "@/components/ui-modules"

const router = createRouter();
const store = createStore();
sync(store, router);

const app = createSSRApp(App);
app.use(uiModules);
app.use(router);
app.use(store);

router.beforeResolve((to, from, next) => {
    next()
});

router.isReady().then(() => {
    app.mount('#app', true);
});

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}