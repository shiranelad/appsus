import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template: `
        <section class="emails-table">
            <ul class="email-list">
                
                <li v-for="email in emails" :key="email.id" class="email-item">
                    <table class="main-layout">
                    <email-preview :currEmail="email" />
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
        // console.log(this.emails)
    },
    data() {
        return {
            // emails: this.emails,
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
