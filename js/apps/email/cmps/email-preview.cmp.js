import { utilService } from '../../../services/util.service.js'

export default {
    props: ['email'],
    template: `
        <section class="main-layout">
            <tr>
                <td>asdasdsa</td>
                <td>
                    <i class="fa-regular fa-star checked icon star"></i>
                </td>
                <td>
                    <i class="icon imp"></i>
                </td>
                    <!-- {{email.subject}} -->
                <td>
                </td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </section>
    `,
    components: {
    },
    created() {
        console.log(this.email)
     },
    data() {
        return {
            email: null,
        }
    },
    methods: {},
    computed: {},
    unmounted() { },
}