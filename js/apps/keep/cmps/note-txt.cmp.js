import noteActions from "./note-actions.cmp.js"
export default {
  props: ["info"],
  template: `
        <section class="note-card" :style="info.style">
            <h3>{{info.title}}</h3>
            <p>{{info.txt}}</p>
            <note-actions></note-actions>
        </section>
    `,
  components: {
    noteActions
  },
  created() {
  },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  unmounted() {},
}