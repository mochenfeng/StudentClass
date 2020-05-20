import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import departmentselect from '@/components/departmentselect'
import majorselect from '@/components/majorselect'
import gradeselect from '@/components/gradeselect'
import teacherselect from '@/components/teacherselect'
import courseselect from '@/components/courseselect'
import courseStartselect from '@/components/courseStartselect'
import courseState from '@/components/courseState'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import './static/fonts/iconfont/iconfont.css'

/**
 * If you don't want to use mock-server
 * you want to use mockjs for request interception
 * you can execute:
 *
 * import { mockXHR } from '../mock'
 * mockXHR()
 */

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.component("departmentselect", departmentselect)
Vue.component("majorselect", majorselect)
Vue.component("gradeselect", gradeselect)
Vue.component("teacherselect", teacherselect)
Vue.component("courseselect", courseselect)
Vue.component("courseStartselect", courseStartselect)
Vue.component("courseState", courseState)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})