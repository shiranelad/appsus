export default {
  // props: [""],
  template: `
        <section>
          <div class="search-box">
            <input v-model="val" type="text" placeholder="Search">
            <button @click="searchVal">Search</button>
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
  methods: {
    searchVal() {
      console.log('Val has changed',this.val);
    }
  },
  computed: {},
  unmounted() {},
}