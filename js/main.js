import { router } from './router.js'
import appHeader from './cmps/app-header.cmp.js'
import bookApp from './apps/book/pages/book-app.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import keepApp from './apps/keep/pages/keep-app.cmp.js'
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
        mailApp,
        keepApp,
        appFooter,
        userMsg
    }
}

const app = Vue.createApp(options);
app.use(router)
app.mount('#app');

