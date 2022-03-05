export default {
  // props: [""],
  template: `
        <section class="main-content home-page flex justify-center">
          <div class="homepage-header">Welcome to <span>Appsus</span></div>
          <div class="horse-logo-div"></div>
          <div class="flex align-center gap-5 homepage-nav">
            <div class="homepage-nav-button">
                <router-link :to="'/book/'">
                To Book App
                </router-link>
            </div>
            <div class="homepage-nav-button">
                <router-link :to="'/email/'">
                To Mail App
                </router-link>
            </div>
            <div class="homepage-nav-button">
                <router-link :to="'/keep/'">
                To Keep App
                </router-link>
            </div>
          </div>
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