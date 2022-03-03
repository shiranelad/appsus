import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'

export default {
  // props: [""],
  template: `
        <section class="note-app main-content notes-layout roboto">
            <note-filter></note-filter>
            <note-add></note-add>
            <note-list></note-list>
        </section>
    `,
  components: {
      noteAdd,
      noteList,
      noteFilter
  },
  created() {
  },
  data() {
    return {
      notes: null
    }
  },
  methods: {},
  computed: {
  },
  unmounted() {},
}