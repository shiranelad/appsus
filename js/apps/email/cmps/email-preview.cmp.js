import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/email.service.js';

export default {
    props: ['currEmail'],
    template: `
            <tr>
                <td><i class="icon email-checkbox" :class="checkboxClass" @click="selectWithCheck(currEmail)"></i></td>
                <td>
                    <i class="icon star" :class="starClass" @click="setStar(currEmail)"></i>
                </td>
                <td>
                    <i class="icon imp" :class="impClass" @click="isImpMarked = !isImpMarked"></i>
                </td>
                <td class="email-from" :class="readClass">
                        <router-link :to="'/email/'+currEmail.id">{{currEmail.from}}</router-link>
                </td>
                <td class="email-subject">
                    <router-link :to="'/email/'+currEmail.id">
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

        toggleRead(email) {
            this.currEmail.isRead = !this.currEmail.isRead
            emailService.updateEmail(email)
                .then(email => this.currEmail.isRead = email.isRead)
        },

        setStar(email) {
            this.isStarMarked = !this.isStarMarked
            email.isStarred = this.isStarMarked
            emailService.updateEmail(email)
                .then(email => this.currEmail.isStarred = email.isStarred)
        }

    },
    computed: {
        starClass() {
            return { starred: this.isStarMarked, star: !this.isStarMarked }
        },
        impClass() {
            return { 'imp-marked': this.isImpMarked, 'imp': !this.isImpMarked }
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
        // dispDateTime(emailDate) {
        //     // let dt = new Date(this.currEmail.sentAt)
        //     let dt = new Date(emailDate)
        //     var hours = dt.getHours()
        //     var minutes = dt.getMinutes()
        //     var ampm = (hours < 12 ? 'AM' : 'PM')
        //     if (ampm === 'PM' && hours > 12) {
        //         hours = hours - 12
        //     }
        //     if (minutes < 10) minutes = '0' + minutes

        //     var monthName = dt.toLocaleString('default', { month: 'short' })

        //     let todayDisp = hours + ':' + minutes + ' ' + ampm
        //     let monthDisp = monthName + ' ' + dt.getDate()
        //     let yearDisp = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear()

        //     var today = new Date()

        //     if (dt.getDate() === today.getDate() && dt.getMonth() === today.getMonth() && dt.getFullYear() === today.getFullYear()) {
        //         return todayDisp
        //     }
        //     else if (dt.getMonth() === today.getMonth() && dt.getFullYear() === today.getFullYear())
        //         return monthDisp
        //     else return yearDisp
        // },

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
        }



    },
    unmounted() { },
}