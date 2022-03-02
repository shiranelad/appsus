
export default {
    // props: [""],
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
                    {{email.subject}}
                <td>
                </td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </section>
    `,
    components: {
        emailService,
    },
    created() {
        this.email = emailService.email
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