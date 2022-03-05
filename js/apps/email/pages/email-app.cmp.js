import { emailService } from '../services/email.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/eventBus-service.js'
import { eventBus } from '../../../services/eventBus-service.js'
import { utilService } from '../../../services/util.service.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailSidebar from '../cmps/email-sidebar.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
import emailDetails from '../pages/email-details.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import { router } from '../../../router.js'
// import emailSearch from '../cmps/email-search.cmp.js'


export default {
  // props: [""],
  template: `
  <section class="main-layout main-content flex relative">
    <!-- <email-filter @filtered="setFilter" ></email-filter> -->
    <email-filter></email-filter>
    <email-sidebar @filterBy="setFilterBy"></email-sidebar>
    <email-list @updateView="updateList"  :emails="emailsToShow" @selected="selectEmail"></email-list>
    <email-details :email="selectedEmail" v-if="selectedEmail"></email-details>
    <email-compose v-if="isCompose" @closeCompose="closeCompose" @saveDraft="updateList"></email-compose>
  </section>

    `,
  components: {
    emailService,
    emailFilter,
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
        this.emails = emails}
        
        )

    this.unsubscribe = eventBus.on('compose', this.showCompose);
    this.unsubscribe_2 = eventBus.on('searchCriteria', this.searchAndView);

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
        isDeleted: false,
        isDraft: null,
    },
      isCompose: null,
      criteria: null,
    }
  },
  methods: {
    selectEmail(email) {
      this.selectedEmail = email;
    },

    searchAndView(searchCriteria){
      // console.log(searchCriteria)
      this.$router.push({path: '/email/search'})
        this.criteria = searchCriteria
      },


    updateList(){
      emailService.query()
      .then(emails => {
        this.emails = emails
      })
    },

    setFilterBy(filterBy){
      // this.filterBy = { isStarred: null, isImportant: null, to: '', from: ''}
      this.filterBy =     { 
        isStarred: null, 
        isImportant: null, 
        to: emailService.getLoggedInUser().email, 
        from: '', 
        isDeleted: false,
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

    closeCompose(val){
      if (val === true){
        this.isCompose = !this.isCompose
      }
      console.log(this.isCompose)
    },


    showCompose(c) {
      this.isCompose = c.isCompose

      this.$router.push({path: c.currPath, query: { compose: 'new'}})
      // console.log(c.isCompose, this.isCompose)
      },
    },

    computed: {

    emailsToShow() {
      
      // console.log(this.emails)
      if (!this.emails || !this.emails.length) return;

      if(!!this.criteria){
        const free = new RegExp(this.criteria.freetext, 'i');
        const from = new RegExp(this.criteria.from, 'i');
        const to = new RegExp(this.criteria.to, 'i');
        const subject = new RegExp(this.criteria.subject, 'i');
        return this.emails.filter(email => (free.test(email.body) || free.test(email.subject) || free.test(email.from) || free.test(email.to))  
        && (from.test(email.from)) 
        && to.test(email.to) 
        && subject.test(email.subject)
        && (email.isRead === this.criteria.read || email.isRead !== this.criteria.unread)
        )
      }

      if (!this.filterBy) return this.emails;

      // emailService.getFilter(this.emails, this.filterBy)
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
    this.unsubscribe_2();

  },
}