import { noteService} from '../services/note.service.js'
import noteActions from "./note-actions.cmp.js"

export default {
  props: ["info", "cmpData"],
  template: `
        <section class="note-card" :style="info.style" :class="markNote">
          <h5>{{info.title}}</h5>
            <img :src="info.url" :title="info.title">
            <note-actions @delete="deleteNote" @setColor="setColor" @setPin="setPin" @setMark="setMark" @setClone="setClone" :noteType="cmpData.type"></note-actions>
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
      noteService.remove(this.noteData.id).then(()=>{
        this.$emit('updateData')
      })
    },
    setColor(color) {
      this.noteData.style.backgroundColor = color
      noteService.save(this.noteData)
    },
    setPin() {
      if(!this.noteData.isPinned ) {
        this.noteData.isPinned = true
      } else this.noteData.isPinned = !this.noteData.isPinned 
      noteService.save(this.noteData)
    },
    setMark() {
      if(!this.noteData.isMarked){
        this.noteData.isMarked = true
      } else this.noteData.isMarked = !this.noteData.isMarked
      noteService.save(this.noteData).then(()=>{
        this.$emit('updateData')
      })
    },
    setClone() {
      let copyNote = {...this.noteData}
      copyNote.id = null
      noteService.save(copyNote).then(()=>{
        this.$emit('updateData')
      })
    }
  },
  computed: {
    markNote() {
      if(this.noteData.isMarked) return 'marked-note'
    }
  },
  unmounted() {},
}