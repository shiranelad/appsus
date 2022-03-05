export default {
  // props: [""],
  template: `
        <section class="app-header">
        <router-link to="/"><h3 class="main-layout">Miss Book</h3></router-link>
        <nav class="nav-bar main-layout">
                <router-link to="/">Home</router-link> |
                <router-link to="/book">Books</router-link> |
                <router-link to="/about">About</router-link>
            </nav>
        </section>
    `,
  components: {},
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  unmounted() {},
}