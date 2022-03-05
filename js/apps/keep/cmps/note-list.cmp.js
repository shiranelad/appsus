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
        <section class="note-cards-container">
          <div v-for="(cmp, idx) in notes" class="cmp-note-container">
            <component v-if="cmp.isPinned" :is="cmp.type" :info="{...cmp.info}" :cmpData="{...cmp}" :style="cmp.style" @updateData="updateData"></component>
          </div>
        </section>
        <br>
        <section class="note-cards-container">
          <div v-for="(cmp, idx) in notes" class="cmp-note-container">
            <component v-if="!cmp.isPinned" :is="cmp.type" :info="{...cmp.info}" :cmpData="{...cmp}" :style="cmp.style" @updateData="updateData"></component>
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
    eventBus.on('filterNotes', this.notesToShow)
  },
  methods: {
    updateData() {
      noteService.query().then(noteList => this.notes = noteList)
    },
    notesToShow(filterBy) {
      if (!filterBy) {
        return noteService.query().then(noteList =>{
          this.notes = noteList
          })
      }
      const regex = new RegExp(filterBy, 'i');
      return noteService.query().then(noteList =>{
        return this.notes = noteList.filter(note => (regex.test(note.info.title) || regex.test(note.info.txt)));
        })
    },
  },
  computed: {},
  unmounted() {
    this.unsubscribe()
  },
}