
export default {
  props: ["info"],
  template: `
        <section class="note-card">
            <img :src="info.url" :title="info.title">
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