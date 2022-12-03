import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Amplify } from 'aws-amplify'
import awsExports from '../src/services/AWS'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faTrash,
  faFileArrowDown,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import {
  faArrowsRotate,
  faPaperPlane,
  faHouse,
  faReceipt,
  faQrcode,
  faUtensils,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faArrowsRotate,
  faTrash,
  faFileArrowDown,
  faPaperPlane,
  faHouse,
  faSpinner,
  faReceipt,
  faQrcode,
  faUtensils,
  faMagnifyingGlass,
)

Amplify.configure(awsExports)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
