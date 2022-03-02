import noteActions from "./note-actions.cmp.js"

export default {
  props: ["info"],
  template: `
        <section class="note-card">
            <img :src="info.url" :title="info.title">
            <note-actions></note-actions>
        </section>
    `,
  components: {
    noteActions
  },
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  unmounted() {},
}