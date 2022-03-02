export default {
  // props: [""],
  template: `
        <section class="side-bar">
            <button class="compose">+Compose</button>
            <ul>
                <li><a class="compose">Inbox</a></li>
                <li><a class="starred">Starred</a></li>
                <li><a class="important">Important</a></li>
                <li><a class="sent">Sent</a></li>
                <li><a class="trash">Trash</a></li>
            </ul>
        </section>
    `,
  components: {},
  created() {
    console.log('hi')
  },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  unmounted() {},
}