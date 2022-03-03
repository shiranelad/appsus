export default {
  // props: [""],
  template: `
         <section class="side-bar">
            <button class="compose">Compose</button>
            <ul class="nav-list">
            <li class="inbox"><router-link :to="'/email'">Inbox</router-link></li>
                <li><a class="starred-emails">Starred</a></li>
                <li><a class="important">Important</a></li>
                <li><a class="sent">Sent</a></li>
                <li><a class="trash">Trash</a></li>
            </ul>
        </section> 
        
    `,
  components: {},
  created() {
  },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  unmounted() {},
}