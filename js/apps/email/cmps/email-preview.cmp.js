import { utilService } from '../../../services/util.service.js'

export default {
    props: ['currEmail'],
    template: `
            <tr>
                <td><i class="icon email-checkbox" :class="checkboxClass" @click="isChecked = !isChecked"></i></td>
                <td>
                    <i class="icon star" :class="starClass" @click="isStarMarked = !isStarMarked"></i>
                </td>
                <td>
                    <i class="icon imp" :class="impClass" @click="isImpMarked = !isImpMarked"></i>
                </td>
                <td class="email-from">{{currEmail.from}}</td>
                <td class="email-subject">{{currEmail.subject}}<span class="email-body"> - {{currEmail.body}}</td>
                <!-- <td class="email-body"> - {{currEmail.body}}</td> -->
                <td class="email-time">{{dispDateTime}}</td>
            </tr>
    `,
    components: {
    },
    created() {
        // console.log(this.currEmail)
     },
    data() {
        return {
            isStarMarked: false,
            isImpMarked: false,
            isChecked: false,
            labels: false,
            labelsList: []
        }
    },
    methods: {},
    computed: {
        starClass(){
            return {starred: this.isStarMarked , star: !this.isStarMarked }
        },
        impClass(){
            return {'imp-marked': this.isImpMarked , 'imp' : !this.isImpMarked }
        },
        checkboxClass(){
            return {'email-checkbox-checked': this.isChecked , 'email-checkbox' : !this.isChecked }
        },
        checkLabels(){
            if(!this.currEmail.labels || !this.currEmail.labels.length ) return
            this.labelsList = this.currEmail.labels
            
            console.log(this.labelsList)
            this.labels = true
        },
        dispDateTime(){
            let dt = new Date(this.currEmail.sentAt)
            var hours = dt.getHours()
            var minutes = dt.getMinutes()
            var ampm = (hours < 12 ? 'AM' : 'PM')
            if (ampm === 'PM' && hours > 12) {
                hours = hours - 12
            }
            if (minutes < 10) minutes = '0' + minutes

            var monthName = dt.toLocaleString('default', { month: 'short' })

            let todayDisp = hours + ':' + minutes + ' ' + ampm
            let monthDisp = monthName + ' ' + dt.getDate()
            let yearDisp = dt.getDate() + '/' + (dt.getMonth()+1) + '/' + dt.getFullYear()

            var today = new Date()

            if (dt.getDate() === today.getDate() && dt.getMonth() === today.getMonth() && dt.getFullYear() === today.getFullYear()){
                return todayDisp
            }
            else if ( dt.getMonth() === today.getMonth() && dt.getFullYear() === today.getFullYear() )
                return monthDisp
            else return yearDisp
        },

    },
    unmounted() { },
}