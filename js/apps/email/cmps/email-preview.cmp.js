import { utilService } from '../../../services/util.service.js'

export default {
    props: ['currEmail'],
    template: `
        <section class="main-layout">
            <tr>
                <td></td>
                <td>
                    <i class="fa-regular fa-star checked icon star"></i>
                </td>
                <td>
                    <i class="icon imp"></i>
                </td>
                    {{currEmail.subject}}
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
        console.log(this.currEmail)
     },
    data() {
        return {
        }
    },
    methods: {},
    computed: {},
    unmounted() { },
}