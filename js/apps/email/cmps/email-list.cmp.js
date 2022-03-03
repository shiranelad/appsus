import { emailService } from '../services/email.service.js'
import emailPreview from './email-preview.cmp.js'


export default {
    props: ['emails'],
    template: `
        <section class="emails-table">
            <ul class="email-list">
                <div v-if="checkEmails" class="no-mails" >No Emails to display</div>
                <li v-for="email in emails" :key="email.id" :class="displaySelected(email)" >
                    <table class="main-layout">
                    <email-preview :currEmail="email" @remove="removeEmail" @selected="getSelected(email)" @unselected="getUnSelected(email)"/>
                    <!-- <router-link :to="'/email/'+email.id">Details</router-link> -->
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
                console.log()
            console.log(this.noEmails)
            console.log(this.emails)
            console.log(this.emails.length)
        },

        getSelected(email){
            this.selectedEmail = email
            this.selectedEmail.isSelected = true
            emailService.updateEmail(email)
            .then(e => {
                email.isSelected = true
                e.isSelected = true
            })
        },
        getUnSelected(email){
            this.selectedEmail = null
            emailService.updateEmail(email)
            .then(e => {
                email.isSelected = false
                e.isSelected = false
            })
        },

        displaySelected(email){

                    return { 'email-item' : !email.isSelected, 'email-selected' : email.isSelected}
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

    checkEmails(){
        return (Array.isArray(this.emails) &&  this.emails.length > 0) ? false : true

    },
},
    unmounted(){

    }
}
