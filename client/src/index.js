import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueHtmlToPaper from 'vue-html-to-paper';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css',
    './print-styles.css?v=1.6',
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: 'Распечатка страницы'
}

Vue.use(VueHtmlToPaper, options);