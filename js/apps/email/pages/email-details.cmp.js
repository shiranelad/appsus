import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/email.service.js'
import { eventBus } from '../../../services/eventBus-service.js'
import emailSidebar from '../cmps/email-sidebar.cmp.js'

export default {
    template: `
        <section v-if="email" class="email-details flex main-layout main-content">
            <email-sidebar></email-sidebar>
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
            </section>
        </section>
    `,
    components: {
        emailSidebar,
    },
    created() {
    },
    data() {
        return {
            email: null,
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

    unmounted() { },
}