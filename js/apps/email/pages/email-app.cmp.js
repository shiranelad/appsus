import { emailService } from '../services/email.service.js'
import emailPreview from '../cmps/email-preview.cmp.js'
// import emailFilter from '../cmps/email-filter.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
// import emailSidebar from '../cmps/email-sidebar.cmp'
// import emailDetails from '../views/book-email.cmp.js'
// import emailSearch from '../cmps/email-search.cmp.js'
import { showSuccessMsg , showErrorMsg} from '../../../services/eventBus-service.js'


export default {
  // props: [""],
  template: `
        <section class="main-layout main-content flex">
          <!-- <email-filter @filtered="setFilter" ></email-filter> -->
          <!-- <email-preview></email-preview> -->
          <section class="side-bar">
            <button class="compose">+Compose</button>
            <ul>
                <li><a class="compose">Inbox</a></li>
                <li><a class="starred-emails">Starred</a></li>
                <li><a class="important">Important</a></li>
                <li><a class="sent">Sent</a></li>
                <li><a class="trash">Trash</a></li>
            </ul>
        </section>
          <!-- <email-sidebar></email-sidebar> -->
            <email-list :emails="emails"  @selected="selectEmail"></email-list>
            <!-- <email-details :book="selectedEmail" v-if="selectedEmail"></email-details> -->
        </section>

    `,
  components: {
    emailService,
    emailPreview,
    emailList,
    // emailSidebar,
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

    }
  },
  methods: {
   
  },
  computed: {},
  unmounted() {},
}















