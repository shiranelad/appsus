import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/email.service.js';

export default {
    props: ['currEmail', 'currPath'],
    template: `
            <tr>
                <td><i class="icon email-checkbox" :class="checkboxClass" @click="selectWithCheck(currEmail)"></i></td>
                <td>
                    <i class="icon star" :class="starClass" @click="setStar(currEmail)"></i>
                </td>
                <td>
                    <i class="icon imp" :class="impClass" @click="setImportant(currEmail)"></i>
                </td>
                <td class="email-from" :class="readClass">
                        <router-link :to="currPath+currEmail.id" @click="openEmail(currEmail)" @click="setRead(currEmail)">{{displayToFrom}}</router-link>
                </td>
                <td class="email-subject">
                    <router-link :to="setPath" @click="openEmail(currEmail)" @click="setRead(currEmail)">
                        <span :class="readClass">{{currEmail.subject}}</span>
                        <span class="email-body-header"> - {{currEmail.body}}</span>
                    </router-link>
                </td>
                <td class="email-time">{{dispDateTime}}</td>
                <td class="action-icons d-none gap-5" >
                    <i class="icon email-delete" title="Delete" @click="remove(currEmail.id)"></i>
                    <i class="icon" :class="setReadIcon" @click="toggleRead(currEmail)" :title="setReadUnread"></i>
                </td>
            </tr>
    `,
    components: {
    },
    created() {
        this.currEmail.isSelected = false

    },
    data() {
        return {
            isStarMarked: false,
            isImpMarked: false,
            isChecked: false,
            labels: false,
            labelsList: [],
        }
    },
    methods: {

        remove(id) {
            this.$emit('remove', id);
        },

        select(email) {
            this.$emit('selected', email);
        },

        unselect(email) {
            this.$emit('unselected', email);
        },


        selectWithCheck(email) {
            this.isChecked = !this.isChecked
            if (this.isChecked) this.select(email)
            else this.unselect(email)
            email.isSelected = this.isChecked
            emailService.updateEmail(email)
                .then(email => this.currEmail.isSelected = email.isSelected)
        },

        setRead(email) {
            email.isRead = true
            emailService.updateEmail(email)
                .then(e => this.currEmail = e)
            return email
        },


        toggleRead(email) {
            this.currEmail.isRead = !this.currEmail.isRead
            emailService.updateEmail(email)
                .then(email => this.currEmail.isRead = email.isRead)
        },

        setStar(email) {
            this.isStarMarked = !this.isStarMarked
            email.isStarred = this.isStarMarked
            emailService.updateEmail(email)
                .then(e => this.currEmail.isStarred = e.isStarred)
        },
        setImportant(email) {
            this.isImpMarked = !this.isImpMarked
            email.isImportant = this.isImpMarked
            emailService.updateEmail(email)
                .then(e => this.currEmail.isImportant = e.isImportant)
        }

    },
    computed: {

        starClass() {
            return { starred: this.currEmail.isStarred, star: !this.currEmail.isStarred }
        },
        impClass() {
            return { 'imp-marked': this.currEmail.isImportant, 'imp': !this.currEmail.isImportant }
        },
        checkboxClass() {
            return { 'email-checkbox-checked': this.isChecked, 'email-checkbox': !this.isChecked }
        },
        checkLabels() {
            if (!this.currEmail.labels || !this.currEmail.labels.length) return
            this.labelsList = this.currEmail.labels

            console.log(this.labelsList)
            this.labels = true
        },

        dispDateTime(){
            let dt = this.currEmail.sentAt
            return utilService.dispDateTime(dt)
        },

        displayToFrom(){
            if (this.currEmail.from === emailService.getLoggedInUser().email)
                return this.currEmail.to
            else return this.currEmail.from
        },
        
        setReadUnread() {
            if (this.currEmail.isRead) {
                this.markRead = 'Mark as Unread'
            } else this.markRead = 'Mark as Read'
            return this.markRead
        },

        setReadIcon() {
            return { 'email-unread': !this.currEmail.isRead, 'email-read': this.currEmail.isRead }
        },

        readClass() {
            return { 'unread-status': !this.currEmail.isRead }
        },

        setPath(){
            console.log(this.currPath)
            if(this.currPath === '/email/drafts/') return `/email/drafts?compose=${this.currEmail.id}`
            else return `${this.currPath}${this.currEmail.id}`
        }
    },
    unmounted() { },
}