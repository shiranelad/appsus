import { emailService } from '../services/email.service.js'
import emailPreview from './email-preview.cmp.js'


export default {
    props: ['emails'],
    template: `
        <section class="emails-table">
            <ul class="email-list">
                
                <li v-for="email in emails" :key="email.id" :class="displaySelected(email)">
                    <table class="main-layout">
                    <email-preview :currEmail="email" @remove="removeEmail" @selected="getSelected(email)" @unselected="getUnSelected(email)"/>
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
            selectedEmail: null,
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

        getSelected(email){
            this.selectedEmail = email
        },
        getUnSelected(email){
            this.selectedEmail = null

        },

        displaySelected(email){

                    return { 'email-item' : !this.selectedEmail === email , 'email-selected' : this.selectedEmail === email}
                },
    

    },
    computed: {
    //    displaySelected(email){
    //     //    if (this.selectedEmail === email) return
    //     console.log(this.selectedEmail)
    //     console.log(email)
    //         // else {
    //             return { 'email-item' : !this.selectedEmail , 'email-selected' : !!this.selectedEmail}
    //         },
    },
    unmounted(){

    }
}
