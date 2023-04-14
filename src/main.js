import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import ToastService from "primevue/toastservice";

import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import Password from 'primevue/password';

const app = createApp(App);

app.use(router)
    .use(PrimeVue)
    .use(ToastService)
    .use(store)
    .mount('#app');

app.component('InputText', InputText)
    .component('Checkbox', Checkbox)
    .component('Button', Button)
    .component('ProgressSpinner', ProgressSpinner)
    .component('Password', Password)
    .component('Toast', Toast)
