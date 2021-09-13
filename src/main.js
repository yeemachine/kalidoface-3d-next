import './hmr';
import App from './App.svelte';
// import '@pwabuilder/pwaupdate'

const app = new App({
  target: document.body
});

window.app = app;

export default app;

const initSW = () => {
  if ('serviceWorker' in navigator) {
    // Register service worker
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
      }).catch((e) => {
        console.log(e);
    });
  }
}
initSW()

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
// if (import.meta.hot) {
//   import.meta.hot.accept();
//   import.meta.hot.dispose(() => {
//     app.$destroy();
//   });
// }
