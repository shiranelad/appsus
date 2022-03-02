export default {
  // props: [""],
  template: `
        <section>
          <div class="search-box">
            <input v-model="val" type="text" placeholder="Search">
            <button @click>Search</button>
          </div>
        </section>
    `,
  components: {},
  created() {},
  data() {
    return {
      val: null,
    }
  },
  methods: {},
  computed: {},
  unmounted() {},
}