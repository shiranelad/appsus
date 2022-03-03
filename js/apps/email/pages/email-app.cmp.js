import { emailService } from '../services/email.service.js'
// import emailPreview from '../cmps/email-preview.cmp.js'
// import emailFilter from '../cmps/email-filter.cmp.js'
import emailSidebar from '../cmps/email-sidebar.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
import emailDetails from '../pages/email-details.cmp.js'
// import emailSearch from '../cmps/email-search.cmp.js'
import { showSuccessMsg , showErrorMsg} from '../../../services/eventBus-service.js'


export default {
  // props: [""],
  template: `
        <section class="main-layout main-content flex">
          <!-- <email-filter @filtered="setFilter" ></email-filter> -->
          
           <email-sidebar></email-sidebar>
            <email-list :emails="emails"  @selected="selectEmail"></email-list>
            <email-details :email="selectedEmail" v-if="selectedEmail"></email-details>
        </section>

    `,
  components: {
    emailService,
    // emailPreview,
    emailSidebar,
    emailList,
    emailDetails,
    showSuccessMsg,
    showErrorMsg
  },
  created() {
    emailService.query()
    .then(emails => {
      this.emails = emails
      // console.log(emailS)
    });
  },
  data() {
    return {
      emails: null,
      selectedEmail: null,

    }
  },
  methods: {
    selectEmail(email) {
      this.selectedEmail = email;
  },
  },
  computed: {},
  unmounted() {},
}















