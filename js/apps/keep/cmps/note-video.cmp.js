import { noteService} from '../services/note.service.js'
import noteActions from "./note-actions.cmp.js"
import {utilService} from '../../../services/util.service.js'
import { eventBus } from '../../../services/eventBus-service.js'

export default {
  props: ["info", "cmpData"],
  template: `
        <section class="note-card" :style="info.style" :class="isModal" :class="markNote" >
          <i v-if="cmpData.isPinned" @click="setPin" title="Pin note" class="fas fa-thumbtack note-icons pinned-note"></i>     
          <h5 @click="openModal">{{info.title}}</h5>
            <iframe width="225" height="170" :src="info.url" :title="info.title"></iframe>
            <input v-if="isEdit" @keyup.enter="updateNote" type="text" :id="cmpId" class="card-url-input" placeholder="Enter video URL">
            <note-actions @edit="setEdit" @delete="deleteNote" @setColor="setColor" @setDarkColor="setDarkColor" @setPin="setPin" @setMark="setMark" @setClone="setClone" :noteType="cmpData.type" :fontColor="cmpData.style.color"></note-actions>
        </section>
    `,
  components: {
    noteActions
  },
  created() {
    this.cmpId = utilService.makeId()
    this.noteData = this.cmpData
    this.unsubscribe = eventBus.on('closeNote', this.closeModal)

  },
  data() {
    return {
      noteData: null,
      cmpId: null,
      isEditable: false,
      openNote: false

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
    },
    setEdit() {
      this.isEditable = !this.isEditable
    },
    updateNote() {
      let url = document.getElementById(this.cmpId).value;
      let getVideoId = url.split('=')
      let newUrl = `https://www.youtube.com/embed/${getVideoId[1]}`
      this.noteData.info.url = newUrl
      noteService.save(this.noteData).then(()=> {
        document.getElementById(this.cmpId).value = ''
        this.isEditable = false
      })
    },
    openModal() {
      if(this.openNote) return
      this.openNote = true
      eventBus.emit('openNote')
    },
    closeModal() {
      this.openNote = false
    }
  },
  computed: {
    markNote() {
      if(this.noteData.isMarked) return 'marked-note'
    },
    isEdit(){
      return this.isEditable
    },
    isModal() {
      if(this.openNote) return 'note-modal'
    }
  },
  unmounted() {
    this.unsubscribe()
  },
}