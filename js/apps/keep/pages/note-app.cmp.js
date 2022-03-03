import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'

export default {
  // props: [""],
  template: `
        <section class="note-app main-content notes-layout roboto">
            <div v-if="isModalOpen" class="screen-for-modal" @click="closeScreen"></div>
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
    this.unsubscribe = eventBus.on('openNote', this.openScreen)
  },
  data() {
    return {
      notes: null,
      isModalOpen: false
    }
  },
  methods: {
    openScreen(){
      this.isModalOpen = !this.isModalOpen
    },
    closeScreen(){
      this.isModalOpen = !this.isModalOpen
      eventBus.emit('closeNote')
    }
  },
  computed: {
  },
  unmounted() {},
}