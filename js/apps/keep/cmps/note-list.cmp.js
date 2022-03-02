import {noteService} from '../services/note.service.js'
import notePreview from '../cmps/note-preview.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteVideo from './note-video.cmp.js'

export default {
  // props: [""],
  template: `
        <section class="note-cards-container main-layout">
          <div v-for="(cmp, idx) in notes">
            <component :is="cmp.type"  :info="{...cmp.info}" :cmpData="{...cmp}" :style="cmp.style" @setVal="setAns($event, idx)"></component>
          </div>
        </section>
    `,
  components: {
    notePreview,
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
  },
  methods: {
    setVal() {
      console.log('thats a card');
    }
  },
  computed: {},
  unmounted() {},
}