import { noteService} from '../services/note.service.js'
import noteActions from "./note-actions.cmp.js"

export default {
  props: ["info", "cmpData"],
  template: `
        <section class="note-card" :style="info.style" :class="markNote">
          <i v-if="cmpData.isPinned" title="Pin note" class="fas fa-thumbtack note-icons pinned-note"></i>     
          <h5>{{info.title}}</h5>
            <iframe width="225" height="170" :src="info.url" :title="info.title"></iframe>
            <note-actions @delete="deleteNote" @setColor="setColor" @setDarkColor="setDarkColor" @setPin="setPin" @setMark="setMark" @setClone="setClone" :noteType="cmpData.type" :fontColor="cmpData.style.color"></note-actions>
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
      this.noteData.style.color = 'black'
      this.noteData.style.backgroundColor = color
      noteService.save(this.noteData)
    },
    setDarkColor(color) {
      this.noteData.style.color = 'white'
      this.noteData.style.backgroundColor = color
      noteService.save(this.noteData)
    },
    setPin() {
      if(!this.noteData.isPinned ) {
        this.noteData.isPinned = true
      } else this.noteData.isPinned = !this.noteData.isPinned 
      noteService.save(this.noteData).then(()=> {
        this.$emit('updateData')
      })
    },
    setMark() {
      if(!this.noteData.isMarked){
        this.noteData.isMarked = true
      } else this.noteData.isMarked = !this.noteData.isMarked
      noteService.save(this.noteData)
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