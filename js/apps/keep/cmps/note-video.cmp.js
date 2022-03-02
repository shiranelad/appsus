import noteActions from "./note-actions.cmp.js"

export default {
  props: ["info"],
  template: `
        <section class="note-card">
            <iframe width="240" height="180" :src="info.url" :title="info.title"></iframe>
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