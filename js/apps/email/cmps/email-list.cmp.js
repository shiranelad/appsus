import { emailService } from '../services/email.service.js'
import emailPreview from './email-preview.cmp.js'


export default {
    props: ['emails'],
    template: `
        <section class="emails-table">
            <ul class="email-list">
                
                <li v-for="email in emails" :key="email.id" class="email-item">
                    <table class="main-layout">
                    <email-preview :currEmail="email" @remove="removeEmail"/>
                    </table>
                    <!-- <div class="actions">
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
        
        }
    },
    methods: {
        removeEmail(id) {
            emailService.remove(id)
                .then(() => {
                    const idx = this.emails.findIndex(email => email.id === id)
                    this.emails.splice(idx, 1)
                }) 
        },

    },
    computed: {
       
    },
    unmounted(){

    }
}
