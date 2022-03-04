import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/email.service.js'
import { eventBus } from '../../../services/eventBus-service.js'
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
                    <span class="email-date">{{dispDateTime}}</span>
                </div>
                <div class="email-body align-center">{{email.body}}</div>

                <button @click="composeMail">edit</button>
                <button>delete</button>
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