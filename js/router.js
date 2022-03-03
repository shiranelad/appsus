// import bookApp from './miss-book/views/book-app.cmp.js';
import homePage from './pages/app-home.cmp.js'
import emailApp from './apps/email/pages/email-app.cmp.js'
import keepApp from './apps/keep/pages/note-app.cmp.js'
// import bookApp from './apps/book/pages/book-app.cmp.js'
import aboutPage from './pages/app-about.cmp.js'
import emailDetails from './apps/email/pages/email-details.cmp.js';
// import bookDetails from './views/book-details.cmp.js';

const routes = [
    {
        path: '/',
        component: homePage
    },
    // {
    //     path: '/book',
    //     component: bookApp
    // },
    {
        path: '/email',
        component: emailApp,
    },
    {
        path: '/email/:emailId',
        component: emailDetails,
    },
    {
        path: '/keep',
        component: keepApp,
    },
    {
        path: '/about',
        component: aboutPage,
    },
    // {
    //     path: '/book/:bookId',
    //     component: bookDetails
    // },
];

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});
