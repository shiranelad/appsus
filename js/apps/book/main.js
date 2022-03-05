import { router } from './router.js'
import appHeader from './cmps/app-header.cmp.js'
import bookApp from './views/book-app.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'

const options = {
    template: `
    <section>
        <app-header />
        <user-msg />
        <router-view />
        <app-footer />
    </section>
    `,

    components: {
        appHeader,
        bookApp,
        appFooter,
        userMsg
    }
}

const app = Vue.createApp(options);
app.use(router)
app.mount('#app');

