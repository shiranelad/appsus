import bookApp from './views/book-app.cmp.js';
import homePage from './views/home-page.cmp.js'
import aboutPage, { aboutLeadership, aboutCareers} from './views/about-page.cmp.js'
import bookDetails from './views/book-details.cmp.js';

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage,
        children: [
            {
                path: 'leadership',
                component: aboutLeadership
            },
            {
                path: 'careers',
                component: aboutCareers
            },
        ]

    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
];

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});
