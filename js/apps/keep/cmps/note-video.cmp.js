import { noteService} from '../services/note.service.js'
import noteActions from "./note-actions.cmp.js"

export default {
  props: ["info", "cmpData"],
  template: `
        <section class="note-card">
          <h5>{{info.title}}</h5>
            <iframe width="225" height="170" :src="info.url" :title="info.title"></iframe>
            <note-actions @delete="deleteNote" @setColor="setColor" :noteType="cmpData.type"></note-actions>
        </section>
    `,
  components: {
    noteActions
  },
  created() {
    this.noteData = this.cmpData
  },
  data() {
    return {
      noteData: null
    }
  },
  methods: {
    deleteNote(){
      noteService.remove(this.noteData.id)
    },
    setColor(color) {
      this.noteData.style.backgroundColor = color
    }
  },
  computed: {},
  unmounted() {},
}