import noteList from '../cmps/note-list.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'

export default {
  // props: [""],
  template: `
        <section class="note-app">
            <note-filter></note-filter>
            <note-list></note-list>
        </section>
    `,
  components: {
      noteFilter,
      noteList,
  },
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  unmounted() {},
}