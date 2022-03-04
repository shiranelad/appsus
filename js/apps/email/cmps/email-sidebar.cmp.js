import { emailService } from "../services/email.service.js"

export default {
  // props: [""],
  template: `
         <section class="side-bar">
            <button class="compose">Compose</button>
            <ul class="nav-list">
            <li class="inbox flex align-center" :class="liClass(1)" @click="setSelectedClass(1)">
              <router-link :to="'/email'" @click="setFilterBy('inbox')" class="flex align-center">
                <i class="inbox-sb-icon icon"></i>
                <span class="sb-text">Inbox</span>
                <span class="mail-count">{{calcUnread}}</span>
              </router-link>
            </li>
            <li class="flex align-center" :class="liClass(2)" @click="setSelectedClass(2)">
              <router-link :to="'/email'" @click="setFilterBy('isStarred')" class="flex align-center starred-email">
                <i class="star-sb-icon icon"></i>
                <span>Starred</span>
              </router-link>
            </li>
            <li class="flex align-center" :class="liClass(3)" @click="setSelectedClass(3)">
              <router-link :to="'/email'" @click="setFilterBy('isImportant')" class="important flex align-center">
                <i class="important-sb-icon icon"></i>
                <span>Important</span>
              </router-link>
            </li>
            <li class="flex align-center" :class="liClass(4)" @click="setSelectedClass(4)">
                <router-link :to="'/email'" @click="setFilterBy('sent'); " class="sent flex align-center">
                  <i class="sent-sb-icon icon"></i>
                  <span>Sent</span>
                </router-link></li>
                <li class="flex align-center" :class="liClass(5)" @click="setSelectedClass(5)">
                  <router-link :to="'/email'" @click="setFilterBy('trash')" class="trash flex align-center">
                    <i class="trash-sb-icon icon"></i>
                    <span>Trash</span>
                  </router-link>
                </li>
            </ul>
        </section> 
        
    `,
  components: {},
  created() {
  },
  data() {
    return {
      selectedLi: 0,
      emails: [],
      unreadCount: '',
    }
  },
  methods: {
    setFilterBy(val) {
      this.$emit('filterBy', val)
    },

    setSelectedClass(val){
      this.selectedLi = val
    },
    liClass(val) {
      return { 'selected-li' : this.selectedLi === val }
    },


  },
  computed: {
    calcUnread(){
    return emailService.query()
      .then(emails => { 
  this.emails = (emails.filter(email => !email.isRead && email.to === emailService.getLoggedInUser().email))
      }).then (() => Promise.resolve(this.emails))
      // return em
      // console.log(em.length)
      // return `(${this.emails.length})`
    }


  },
  unmounted() { },
}