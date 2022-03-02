import {noteService} from '../services/note.service.js'
import {eventBus} from "../../../services/eventBus-service.js"
import { storageService } from '../../../services/async-storage-service.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteVideo from './note-video.cmp.js'

export default {
  // props: [""],
  template: `
        <section class="note-cards-container main-layout">
          <div v-for="(cmp, idx) in notes">
            <component v-if="cmp.isPinned" :is="cmp.type"  :info="{...cmp.info}" :cmpData="{...cmp}" :style="cmp.style" @updateData="updateData"></component>
          </div>
        </section>
        <hr>
        <section class="note-cards-container main-layout">
          <div v-for="(cmp, idx) in notes">
            <component v-if="!cmp.isPinned" :is="cmp.type"  :info="{...cmp.info}" :cmpData="{...cmp}" :style="cmp.style" @updateData="updateData"></component>
          </div>
        </section>
    `,
  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo
  },
  data() {
    return {
      notes: null
    }
  },
  created() {
    noteService.query().then(noteList =>{
      this.notes = noteList
      })
    this.unsubscribe = eventBus.on('updateByBus', this.updateData)
  },
  methods: {
    updateData() {
      noteService.query().then(noteList => this.notes = noteList)
    }
  },
  computed: {},
  unmounted() {
    this.unsubscribe()
  },
}