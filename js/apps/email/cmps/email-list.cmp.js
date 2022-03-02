import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template: `
        <section>
            <ul class="email-list">
                <li v-for="email in emails" :key="email.id" class="email-item">
                    <table>
                    <email-preview :email="email" />
                    </table>
                    <!-- <div class="actions">
                        <button @click="remove(email.id)">X</button>
                        <router-link :to="'/email/'+email.id">Details</router-link>
                    </div> -->
                </li>
            </ul>
        </section>
    `,
    components: {
        emailPreview,
    },
    created(){

    },
    data() {
        return {
            emails : null,
        }
    },
    methods: {
        remove(id){
            this.$emit('remove', id);
        },
        
        select(book) {
            this.$emit('selected', book);
        }
    },
    computed: {
       
    },
    unmounted(){

    }
}
