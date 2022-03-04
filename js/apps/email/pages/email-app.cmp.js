import { emailService } from '../services/email.service.js'
// import emailFilter from '../cmps/email-filter.cmp.js'
import emailSidebar from '../cmps/email-sidebar.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
import emailDetails from '../pages/email-details.cmp.js'
// import emailSearch from '../cmps/email-search.cmp.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/eventBus-service.js'
import { utilService } from '../../../services/util.service.js'


export default {
  // props: [""],
  template: `
  <section class="main-layout main-content flex">
          <!-- <email-filter @filtered="setFilter" ></email-filter> -->
          
          <email-sidebar @filterBy="setFilterBy"></email-sidebar>
            <email-list :emails="emailsToShow"  @selected="selectEmail"></email-list>
            <email-details :email="selectedEmail" v-if="selectedEmail"></email-details>
        </section>

    `,
  components: {
    emailService,
    emailSidebar,
    emailList,
    emailDetails,
    showSuccessMsg,
    showErrorMsg
  },
  created() {
    // setInterval( () =>
    emailService.query()
      .then(emails => {
        this.emails = emails})
      // }), 5000)
  },
  data() {
    return {
      emails: null,
      selectedEmail: null,
      filterBy: { isStarred: null, isImportant: null, to: emailService.getLoggedInUser().email, from: ''},
    }
  },
  methods: {
    selectEmail(email) {
      this.selectedEmail = email;
    },

    setFilterBy(filterBy){
      this.filterBy = { isStarred: null, isImportant: null, to: '', from: ''}
        //  this.filterBy['isStarred'] = (filterBy === 'isStarredOn' || filterBy === 'isStarredBoth' ? 'on' : 'not')
        //  this.filterBy['isImportant'] = (filterBy === 'isImportantOn' || filterBy === 'isImportantBoth' ? 'on' : false)
         if(filterBy === 'isStarred') {
           this.filterBy['isStarred'] = true
          //  this.filterBy['isImportant'] = 'both'
         }
         
         if(filterBy === 'isImportant') {
           this.filterBy['isImportant'] = true
          //  this.filterBy['isStarred'] = 'both'
         }
         if(filterBy === 'inbox'){
          //  this.filterBy['isStarred'] = 'both'
          //  this.filterBy['isImportant'] = 'both'
           this.filterBy['to'] = emailService.getLoggedInUser().email
           
         }
         if(filterBy === 'sent'){
          //  this.filterBy['isStarred'] = 'both' //'isStarredBoth' 
          //  this.filterBy['isImportant'] = 'both'
           this.filterBy['from'] = emailService.getLoggedInUser().email
          //  this.filterBy['to'] = ''
         }
         console.log(filterBy)

    },

      // console.log(this.inboxNum)

      },
  computed: {

    emailsToShow() {
      if (!this.emails || !this.emails.length) return;
      if (!this.filterBy) return this.emails;

      if(this.filterBy.isStarred){
        return this.emails.filter(email => email.isStarred === this.filterBy.isStarred)
      }
      if(this.filterBy.isImportant){
        return this.emails.filter(email => email.isImportant === this.filterBy.isImportant)
      }
      if(this.filterBy.from){
        return this.emails.filter(email => email.from === this.filterBy.from)
      }
      if(this.filterBy.to){
        return this.emails.filter(email => email.to === this.filterBy.to)
      }
    },

    },
  unmounted() { 

  },
}















