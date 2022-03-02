import { emailService } from '../services/email.service.js'
import emailPreview from '../cmps/email-preview.cmp.js'
// import emailFilter from '../cmps/email-filter.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
// import emailDetails from '../views/book-email.cmp.js'
// import emailSearch from '../cmps/email-search.cmp.js'
import { showSuccessMsg , showErrorMsg} from '../../../services/eventBus-service.js'


export default {
  // props: [""],
  template: `
        <section class="main-layout main-content">
          <!-- <email-filter @filtered="setFilter" ></email-filter> -->
          <!-- <email-preview></email-preview> -->
            <email-list :emails="emails"  @selected="selectEmail"></email-list>
            <!-- <email-details :book="selectedEmail" v-if="selectedEmail"></email-details> -->
        </section>

    `,
  components: {
    emailService,
    emailPreview,
    emailList,
    showSuccessMsg,
    showErrorMsg
  },
  created() {
    emailService.query()
    .then(emails => {
      this.emails = emails
      // console.log(emails)
    });
  },
  data() {
    return {
      emails: null,

    }
  },
  methods: {
   
  },
  computed: {},
  unmounted() {},
}















