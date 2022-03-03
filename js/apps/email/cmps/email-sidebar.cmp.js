export default {
  // props: [""],
  template: `
         <section class="side-bar">
            <button class="compose">Compose</button>
            <ul class="nav-list">
            <li class="inbox flex align-center">
              <router-link :to="'/email'" @click="setFilterBy('inbox')" class="flex align-center">
                <i class="inbox-sb-icon icon"></i>
                <span class="sb-text">Inbox</span>
              </router-link>
            </li>
            <li class="flex align-center">
              <router-link :to="'/email'" @click="setFilterBy('isStarredOn')" class="flex align-center starred-email">
                <i class="star-sb-icon icon"></i>
                <span>Starred</span>
              </router-link>
            </li>
            <li class="flex align-center">
              <router-link :to="'/email'" @click="setFilterBy('isImportantOn')" class="important flex align-center">
                <i class="important-sb-icon icon"></i>
                <span>Important</span>
              </router-link>
            </li>
            <li class="flex align-center">
                <router-link :to="'/email'" @click="setFilterBy('sent')" class="sent flex align-center">
                  <i class="sent-sb-icon icon"></i>
                  <span>Sent</span>
                </router-link></li>
                <li class="flex align-center">
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

    }
  },
  methods: {
    setFilterBy(val) {
      this.$emit('filterBy', val)
    }

  },
  computed: {},
  unmounted() { },
}