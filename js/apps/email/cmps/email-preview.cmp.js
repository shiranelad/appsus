import { utilService } from '../../../services/util.service.js'

export default {
    props: ['currEmail'],
    template: `
        <!-- <section > -->
            <tr>
                <td><i class="icon email-checkbox" :class="checkboxClass" @click="isChecked = !isChecked"></i></td>
                <td>
                    <i class="icon star" :class="starClass" @click="isStarMarked = !isStarMarked"></i>
                </td>
                <td>
                    <i class="icon imp" :class="impClass" @click="isImpMarked = !isImpMarked"></i>
                </td>
                <td class="email-from">{{currEmail.from}}</td>
                <td v-if="checkLabels">
                    <ul>
                        <li v-for="label in currEmail.labels">{{label}}</li>
                    </ul>
                </td>
                <td class="email-subject">{{currEmail.subject}}</td>
                <td class="email-body"> - {{currEmail.body}}</td>
                <td></td>
            </tr>
        <!-- </section> -->
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
            labels: false
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
            console.log(this.currEmail.labels)
            this.labels = true
        }
    },
    unmounted() { },
}