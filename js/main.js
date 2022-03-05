import { router } from './router.js'
import appHeader from './cmps/app-header.cmp.js'
import bookApp from './apps/book/views/book-app.cmp.js'
import emailApp from './apps/email/pages/email-app.cmp.js'
import keepApp from './apps/keep/pages/note-app.cmp.js'
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
        emailApp,
        keepApp,
        appFooter,
        userMsg
    }
}

const app = Vue.createApp(options);
app.use(router)
app.mount('#app');

