import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'

export default {
  // props: [""],
  template: `
        <section class="note-app">
            <note-add></note-add>
            <note-list></note-list>
        </section>
    `,
  components: {
      noteAdd,
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