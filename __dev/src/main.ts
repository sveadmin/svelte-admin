import App from './App.svelte';

//Enabled modules
import('./view/index/index.js').then(module => module.addRoutes())
import('./view/simple-table/index.js').then(module => module.addRoutes())
import('./view/side-by-side/index.js').then(module => module.addRoutes())

const app = new App({
    target: document.body,
    props: {
    },
});

export default app;