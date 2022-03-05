// import bookApp from './miss-book/views/book-app.cmp.js';
import homePage from './pages/app-home.cmp.js'
import emailApp from './apps/email/pages/email-app.cmp.js'
import keepApp from './apps/keep/pages/note-app.cmp.js'
import bookApp from './apps/book/views/book-app.cmp.js'
import aboutPage from './pages/app-about.cmp.js'
import emailDetails from './apps/email/pages/email-details.cmp.js';
import emailList from './apps/email/cmps/email-list.cmp.js';
import emailPreview from './apps/email/cmps/email-preview.cmp.js';
import emailSidebarCmp from './apps/email/cmps/email-sidebar.cmp.js';
import emailCompose from './apps/email/cmps/email-compose.cmp.js';
import bookDetails from './apps/book/views/book-details.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/email',
        component: emailApp,
        children: [
            {
                path: '/email/inbox',
                component: emailList
            },
                
            {
                path: '/email/starred',
                component: emailList
            },
            {
                path: '/email/sent',
                component: emailList
            },
            {
                path: '/email/drafts',
                component: emailList
            },
            {
                path: '/email/trash',
                component: emailList
            },
            {
                path: '/email/important',
                component: emailList
            },
            {
                path: '/email/search',
                component: emailList
            },
        ]
    },
    {
        path: '/email/inbox/:emailId',
        component: emailDetails,
    },
    {
        path: '/email/starred/:emailId',
        component: emailDetails,
    },
    {
        path: '/email/important/:emailId',
        component: emailDetails,
    },
    {
        path: '/email/sent/:emailId',
        component: emailDetails,
    },
    {
        path: '/email/drafts/:emailId',
        component: emailDetails,
    },
    {
        path: '/email/trash/:emailId',
        component: emailDetails,
    },
    {
        path: '/email/drafts',
        component: emailCompose,
        query: {compose: 'emailId'}
    },
    {
        path: '/keep',
        component: keepApp,
    },
    {
        path: '/about',
        component: aboutPage,
    },
];

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});
