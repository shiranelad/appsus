import { emailService } from '../services/email.service.js'
// import emailPreview from '../cmps/email-preview.cmp.js'
// import emailFilter from '../cmps/email-filter.cmp.js'
import emailSidebar from '../cmps/email-sidebar.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
import emailDetails from '../pages/email-details.cmp.js'
// import emailSearch from '../cmps/email-search.cmp.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/eventBus-service.js'


export default {
  // props: [""],
  template: `
  <section class="main-layout main-content flex">
          <!-- <email-filter @filtered="setFilter" ></email-filter> -->
          
          <email-sidebar @filterBy="setFilterBy"></email-sidebar>
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
      filterBy: { isStarred: 'not', isImportant: 'not', to: '', from: ''}


    }
  },
  methods: {
    selectEmail(email) {
      this.selectedEmail = email;
    },

    setFilterBy(filterBy){
      this.filterBy = { isStarred: 'not', isImportant: 'not', to: '', from: ''}
        //  this.filterBy['isStarred'] = (filterBy === 'isStarredOn' || filterBy === 'isStarredBoth' ? 'on' : 'not')
        //  this.filterBy['isImportant'] = (filterBy === 'isImportantOn' || filterBy === 'isImportantBoth' ? 'on' : false)
         
         if(filterBy === 'inbox'){
           this.filterBy['isStarred'] = 'both'
           this.filterBy['isImportant'] = 'both'
           this.filterBy['to'] = emailService.getLoggedInUser().email
           
         }
         if(filterBy === 'sent'){
           this.filterBy['isStarred'] = 'both' //'isStarredBoth' 
           this.filterBy['isImportant'] = 'both'
           this.filterBy['from'] = emailService.getLoggedInUser().email
         }
         console.log(filterBy)
    }
    
  },
  computed: {

    emailsToShow() {
      if (!this.emails || !this.emails.length) return;
      if (!this.filterBy) return this.emails;
      console.log(this.filterBy.to)
      console.log(this.filterBy.from)
      var toOrFrom = this.filterBy.to === '' ? 'to' : 'from'
       return this.emails.filter(email => email.isImportant === (this.filterBy.isImportant === 'both') ? email.isImportant : 
       (this.filterBy.isImportant === 'not') ? false : true && 
        email.isStarred === (this.filterBy.isStarred === (this.filterBy.isStarred === 'both') ? email.isStarred : 
        (this.filterBy.isStarred === 'not') ? false : true && 
        email[toOrFrom] === this.filterBy[toOrFrom]))
      
      // return this.emails.filter(email => email[toOrFrom] === this.filterBy[toOrFrom] &&
      //   email.isStarred === this.filterBy['isStarred'] === 'both' ? email.isStarred : this.filterBy['isStarred'])

    },
        
        // const subject = new RegExp(this.filterBy.subject, 'i');
        // const body = new RegExp(this.filterBy.body, 'i');
      // var isStarred = this.filterBy.isStarred === 'on' || this.filterBy.isStarred === 'both' ? true : false
      // var isImportant = this.filterBy.isImportant === 'on' || this.filterBy.isStarred === 'both' ? true : false
      // const star = this.filterBy.starred;
      // const max = this.filterBy.toPrice || 200;
      // return this.emails.filter(email => subject.test(email.subject) && (min <= book.listPrice.amount) && max >= book.listPrice.amount)


  },
  unmounted() { },
}















