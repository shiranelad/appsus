import { emailService } from "../services/email.service.js"
import { eventBus } from '../../../services/eventBus-service.js'


export default {
  // props: ['emailUnread'],
  template: `
         <section class="side-bar">
            <div class="compose-placeholder compose" role="button" @click="composeMail">Compose</div>
            <ul class="nav-list">
            <li class="inbox flex align-center" :class="liClass(1)" @click="setSelectedClass(1)">
              <router-link :to="'/email/inbox'" @click="setFilterBy('inbox')" class="flex align-center">
                <i class="inbox-sb-icon icon sb-icon"></i>
                <span class="sb-text">Inbox</span>
                <span class="mail-count">{{emailNum}}</span>
              </router-link>
            </li>
            <li class="flex align-center" :class="liClass(2)" @click="setSelectedClass(2)">
              <router-link :to="'/email/starred'" @click="setFilterBy('isStarred')" class="flex align-center starred-email">
                <i class="star-sb-icon icon sb-icon"></i>
                <span>Starred</span>
              </router-link>
            </li>
            <li class="flex align-center" :class="liClass(3)" @click="setSelectedClass(3)">
              <router-link :to="'/email/important'" @click="setFilterBy('isImportant')" class="important flex align-center">
                <i class="important-sb-icon icon sb-icon"></i>
                <span>Important</span>
              </router-link>
            </li>
            <li class="flex align-center" :class="liClass(4)" @click="setSelectedClass(4)">
                <router-link :to="'/email/sent'" @click="setFilterBy('sent')" class="sent flex align-center">
                  <i class="sent-sb-icon icon sb-icon"></i>
                  <span>Sent</span>
                </router-link></li>
                <li class="flex align-center" :class="liClass(5)" @click="setSelectedClass(5)">
                  <router-link :to="'/email/drafts'" @click="setFilterBy('drafts')" class="drafts flex align-center">
                    <i class="drafts-sb-icon icon sb-icon"></i>
                    <span>Drafts</span>
                  </router-link>
                </li>
                <li class="flex align-center" :class="liClass(6)" @click="setSelectedClass(6)">
                  <router-link :to="'/email/trash'" @click="setFilterBy('trash')" class="trash flex align-center">
                    <i class="trash-sb-icon icon sb-icon"></i>
                    <span>Trash</span>
                  </router-link>
                </li>
            </ul>
        </section> 
        
    `,
  components: {
  },
  created() {
    this.unsubscribe = eventBus.on('calcUnread', this.showNum);
  },

  data() {
    return {
      selectedLi: 0,
      emailNum: '',     
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

    showNum(e) {
      if(e.emailNum === 0) this.emailNum = ''
      else this.emailNum = `(${e.emailNum})`
  },
  composeMail(){
    eventBus.emit('compose', {isCompose: true})
    console.log('hi')
  }

  
},
computed: {

  },
  unmounted() {
    this.unsubscribe();
  },
}