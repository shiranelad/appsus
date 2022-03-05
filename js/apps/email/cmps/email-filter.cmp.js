export default {
    // props: [""],
    template: `
        <section class="email-filter">
            <input class="email-filter-input" type="text" @click="openFields = !openFields"  placeholder="Search">
            <section v-if="openFields" class="criteria flex col">
                <div class="input-group">
                    <label for="from">From</label>
                    <input type="text" name="from" id="from">
                </div>
                <div class="input-group">
                    <label for="to">To</label>
                    <input type="text" name="to" id="to">
                </div>
                <div class="input-group">
                    <label for="subject">Subject</label>
                    <input type="text" name="" id="subject">
                </div class="input-group">
                <div class="input-group">
                    <label for="read">Read</label>
                    <input type="checkbox" checked name="" id="read">
                    <label for="read">Unread</label>
                    <input type="checkbox" checked name="" id="unread">
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
            // criteria: {from, to, subject, freetext, read, unread},
        }
    },
    methods: {
        findCriteria(){
            console.log()
        }
    },
    computed: {

    },
    unmounted() { },
}