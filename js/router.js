// import bookApp from './miss-book/views/book-app.cmp.js';
import homePage from './pages/app-home.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import keepApp from './apps/keep/pages/note-app.cmp.js'
// import bookApp from './apps/book/pages/book-app.cmp.js'
import aboutPage from './pages/app-about.cmp.js'
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
        path: '/mail',
        component: mailApp,
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
