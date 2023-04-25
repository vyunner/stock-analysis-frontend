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
import messagePlugin from './utils/message.plugin'


import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import Password from 'primevue/password';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Message from 'primevue/message';
import SelectButton from 'primevue/selectbutton';
import Chart from 'primevue/chart';


const app = createApp(App);


app.component('InputText', InputText)
    .component('InputNumber', InputNumber)
    .component('Checkbox', Checkbox)
    .component('Button', Button)
    .component('ProgressSpinner', ProgressSpinner)
    .component('Password', Password)
    .component('Toast', Toast)
    .component('DataTable', DataTable)
    .component('Column', Column)
    .component('ColumnGroup', ColumnGroup)
    .component('Row', Row)
    .component('Dialog', Dialog)
    .component('Calendar', Calendar)
    .component('Dropdown', Dropdown)
    .component('Message', Message)
    .component('SelectButton', SelectButton)
    .component('Chart', Chart)

app.use(router)
  .use(PrimeVue)
  .use(ToastService)
  .use(store)
  .use(messagePlugin)
  .mount('#app');


