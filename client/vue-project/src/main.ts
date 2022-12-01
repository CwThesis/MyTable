import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import * as ConfirmDialog from 'vuejs-confirm-dialog';
import { Amplify } from 'aws-amplify';
import awsExports from '../src/services/AWS';
Amplify.configure(awsExports);

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(ConfirmDialog)

app.mount('#app')
