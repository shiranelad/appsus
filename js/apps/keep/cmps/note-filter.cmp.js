export default {
  // props: [""],
  template: `
        <section>
          <div class="search-notes flex justify-center align-center">
            <input v-model="val" type="text" class="search-input" placeholder="Search">
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