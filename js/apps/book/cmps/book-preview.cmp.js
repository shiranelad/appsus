import { utilService } from "../services/util-service.js"

export default {
    props: ['book'],
    template: `
        <section class="book-preview">
            <div class="image-container"><img :src="book.thumbnail" /></div>
            <p class="title">{{book.title}}</p>
            <p class="price">
                <span>{{getCurrSymbol(book.listPrice['currencyCode'])}}</span> <span >{{book.listPrice['amount']}}</span>
            </p>
        </section>
    `,
    components: {
        utilService,

    },
    created() { },
    data() {


        return {}
    },
    methods: {
        getCurrSymbol(code) {
            return utilService.getCurrencySymbol(code)
        }
    },

    computed: {},
    unmounted() { },
}