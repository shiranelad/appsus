import { emailService } from '../services/email.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/eventBus-service.js'
import { eventBus } from '../../../services/eventBus-service.js'
import { utilService } from '../../../services/util.service.js'
// import emailFilter from '../cmps/email-filter.cmp.js'
import emailSidebar from '../cmps/email-sidebar.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
import emailDetails from '../pages/email-details.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
// import emailSearch from '../cmps/email-search.cmp.js'


export default {
  // props: [""],
  template: `
  <section class="main-layout main-content flex relative">
    <!-- <email-filter @filtered="setFilter" ></email-filter> -->
    
    <email-sidebar @filterBy="setFilterBy"></email-sidebar>
    <email-list :emails="emailsToShow"  @selected="selectEmail"></email-list>
    <email-details :email="selectedEmail" v-if="selectedEmail"></email-details>
    <email-compose v-if="isCompose"></email-compose>
  </section>

    `,
  components: {
    emailService,
    emailSidebar,
    emailCompose,
    emailList,
    emailDetails,
    showSuccessMsg,
    showErrorMsg
  },
  created() {
    emailService.query()
      .then(emails => {
        this.emails = emails})

    this.unsubscribe = eventBus.on('compose', this.showCompose);

  },
  data() {
    return {
      emails: null,
      selectedEmail: null,
      // filterBy: { isStarred: null, isImportant: null, to: emailService.getLoggedInUser().email, from: '', },
      filterBy:     { 
        isStarred: null, 
        isImportant: null, 
        to: emailService.getLoggedInUser().email, 
        from: '', 
        isDeleted: null,
        isDraft: null,
    },
      isCompose: null,
    }
  },
  methods: {
    selectEmail(email) {
      this.selectedEmail = email;
    },

    setFilterBy(filterBy){
      // this.filterBy = { isStarred: null, isImportant: null, to: '', from: ''}
      this.filterBy =     { 
        isStarred: null, 
        isImportant: null, 
        to: emailService.getLoggedInUser().email, 
        from: '', 
        isDeleted: null,
        isDraft: null,
    }

        //  this.filterBy['isStarred'] = (filterBy === 'isStarredOn' || filterBy === 'isStarredBoth' ? 'on' : 'not')
        //  this.filterBy['isImportant'] = (filterBy === 'isImportantOn' || filterBy === 'isImportantBoth' ? 'on' : false)
         if(filterBy === 'isStarred') {
           this.filterBy['isStarred'] = true
         }
         
         if(filterBy === 'isImportant') {
           this.filterBy['isImportant'] = true
         }
         if(filterBy === 'inbox'){
           this.filterBy['to'] = emailService.getLoggedInUser().email
           
         }
         if(filterBy === 'sent'){
           this.filterBy['from'] = emailService.getLoggedInUser().email
         }
         if(filterBy === 'drafts'){
           this.filterBy['isDraft'] = true
         }
         if(filterBy === 'trash'){
           this.filterBy['isDeleted'] = true
         }
        //  console.log(filterBy)

    },

    showCompose(c) {
      this.isCompose = c.isCompose
      console.log(c.isCompose, this.isCompose)
      },
    },

    computed: {

    emailsToShow() {
      if (!this.emails || !this.emails.length) return;
      if (!this.filterBy) return this.emails;

      // emailService.getFilter(this.emails, this.filterBy, filterBy)
      if(this.filterBy.isStarred){
        return this.emails.filter(email => email.isStarred === this.filterBy.isStarred && !email.isDeleted)
      }
      if(this.filterBy.isImportant){
        return this.emails.filter(email => email.isImportant === this.filterBy.isImportant && !email.isDeleted)
      }
      if(this.filterBy.isDraft){
        return this.emails.filter(email => email.isDraft === this.filterBy.isDraft && !email.isDeleted)
      }
      if(this.filterBy.isDeleted){
        return this.emails.filter(email => email.isDeleted === this.filterBy.isDeleted)
      }
      if(this.filterBy.from){
        return this.emails.filter(email => email.from === this.filterBy.from && !email.isDeleted)
      }
      if(this.filterBy.to){
        return this.emails.filter(email => email.to === this.filterBy.to && !email.isDeleted)
      }
    },


  },
  unmounted() { 
    this.unsubscribe();
  },
}