import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/email.service.js'
import { eventBus } from '../../../services/eventBus-service.js'
import { noteService } from '../../keep/services/note.service.js'
import emailSidebar from '../cmps/email-sidebar.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'


export default {
    template: `
        <section v-if="email" class="email-details flex main-layout main-content">
            <email-sidebar></email-sidebar>
            <email-compose v-if="isCompose"></email-compose>
            <section class="display-email emails-table">
                <div class="space-between flex align-center">
                    <div class="flex align-center">
                        <i class="user-icon"></i>
                        <div class="from-subject flex col">
                            <span class="subject"><b>{{email.subject}}<b></span>
                            <span class="to"><b>To {{email.to}}<b></span>
                        </div>
                    </div>
                    <div class="flex justify-center align-center">
                    <span class="email-date">{{dispDateTime}}
                    <i class="icon send-note" title="Send email as a note" @click="sendNote"></i>
                    <i class="icon compose-delete compose-icon" title="Delete Mail" @click="deleteMail"></i>
                    </span>
                    </div>
                    
                </div>
                <div class="email-body align-center">{{email.body}}</div>
            </section>
        </section>
    `,
    components: {
        emailSidebar,
        emailCompose,
    },
    created() {
        emailService.query()
        .then(emails => {
          this.emails = emails})
  
        this.unsubscribe = eventBus.on('compose', this.showCompose);

    },
    data() {
        return {
            email: null,
            isCompose: null,
        }
    },
    methods: {

      
        sendNote(){
            noteService.createTxtNote(this.email.subject, this.email.body)
        },
        deleteMail(){
              emailService.remove(this.email)
            },
        
        loadEmail() {
            emailService.getEmailById(this.emailId)
            .then(email => this.email = email)
            .then( () => {
                emailService.query()
                .then(emails => emails.filter(email => !email.isRead && email.to === emailService.getLoggedInUser().email))
                .then(num => eventBus.emit('calcUnread', ({ emailNum: num.length })))    
            })
        },
        showCompose(c) {
            this.isCompose = c.isCompose
            console.log(c.isCompose, this.isCompose)
            },
          },
    computed: {
        emailId() {
            return this.$route.params.emailId
        },
        dispDateTime() {
            let dt = this.email.sentAt
            return utilService.dispDateTime(dt, 'withTime')
        }
    },

    watch: {
        emailId: {
            handler() {
                this.loadEmail()
            },
            immediate: true,
            deep: true,
        }
    },

    unmounted() { 
        this.unsubscribe();
    },
}
