import { eventBus } from "../../../services/eventBus-service.js"

eventBus
export default {
    // props: [""],
    template: `
        <section class="email-filter">
            <input class="email-filter-input" v-model="criteria.freetext" type="text" @click="openFields = !openFields"  placeholder="Search">
            <section v-if="openFields" class="criteria flex col">
                <div class="input-group">
                    <label for="from">From</label>
                    <input type="text" name="from" id="from" v-model="criteria.from" >
                </div>
                <div class="input-group">
                    <label for="to">To</label>
                    <input type="text" name="to" id="to" v-model="criteria.to">
                </div>
                <div class="input-group">
                    <label for="subject">Subject</label>
                    <input type="text" name="" id="subject" v-model="criteria.subject">
                </div class="input-group">
                <div class="input-group">
                    <label for="read">Read</label>
                    <input type="checkbox" checked name="" id="read" v-model="criteria.read">
                    <label for="unread">Unread</label>
                    <input type="checkbox" checked name="" id="unread" v-model="criteria.unread">
                </div class="input-group">
                <div class="action-buttons">
                    <button @click="openFields = !openFields" @click="findCriteria">Search</button>
                    <button @click="openFields = !openFields" >Close</button>
                </div>
            </section>
        </section>
    `,
    components: {},
    created() { },
    data() {
        return {
            openFields: false,
            criteria: {from: '' , to: '' , subject: '' , freetext: '' , read: true, unread: true},
        }
    },
    methods: {
        findCriteria(){
            eventBus.emit('searchCriteria', this.criteria)
        }
    },
    computed: {

    },
    unmounted() { },
}