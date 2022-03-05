import { noteService} from '../services/note.service.js'
import {utilService} from '../../../services/util.service.js'
import noteActions from "./note-actions.cmp.js"
import { eventBus } from '../../../services/eventBus-service.js'

export default {
  props: ["info", "cmpData"],
  template: `
        <section class="note-card" :class="markNote" :class="isModal" :style="info.style" :id="cmpId" >
        <i v-if="cmpData.isPinned" @click="setPin" title="Pin note" class="fas fa-thumbtack note-icons pinned-note"></i> 
            <h3 @keyup="updateNote" :contentEditable="isEdit" @click="openModal">{{info.title}}</h3>
            <p @keyup="updateNote" :contentEditable="isEdit" :class="showEdit" @click="openModal" @click="removeShowEdit">{{info.txt}}</p>
            <note-actions @edit="setEdit" @delete="deleteNote" @setColor="setColor" @setBgImage="setBgImage" @setPin="setPin" @setMark="setMark" @setClone="setClone" :noteType="cmpData.type" :fontColor="cmpData.style.color"></note-actions>
        </section>
    `,
  components: {
    noteActions
  },
  created() {
    this.noteData = this.cmpData
    this.cmpId = utilService.makeId()
    this.unsubscribe = eventBus.on('closeNote', this.closeModal)

  },
  data() {
    return {
      noteData: null,
      isEditable: false,
      focus: false,
      cmpId: null,
      openNote: false

    }
  },
  methods: {
    deleteNote(){
      noteService.remove(this.noteData.id).then(()=>{
        this.$emit('updateData')
        if(this.openNote) eventBus.emit('closeScreen')
      })
    },
    setColor(color) {
      this.noteData.style.color = 'black'
      this.noteData.style.backgroundImage = ''
      this.noteData.style.backgroundColor = color
      noteService.save(this.noteData).then(()=> this.$emit('updateData'))
    },
    setBgImage(url){
      console.log('url',url);
      this.noteData.style.color = 'black'
      this.noteData.style.backgroundColor = ''
      this.noteData.style.backgroundImage = `url(${url})`
      noteService.save(this.noteData).then(()=> this.$emit('updateData'))
    },
    setPin() {
      if(!this.noteData.isPinned ) {
        this.noteData.isPinned = true
      } else this.noteData.isPinned = !this.noteData.isPinned 
      noteService.save(this.noteData).then(()=>{
        this.$emit('updateData')
        if(this.openNote) eventBus.emit('closeScreen')
      })
    },
    setMark() {
      if(!this.noteData.isMarked){
        this.noteData.isMarked = true
      } else this.noteData.isMarked = !this.noteData.isMarked
      noteService.save(this.noteData).then(()=> this.$emit('updateData'))
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
      if(this.noteData.isPinned) {
        this.noteData.info.title = document.getElementById(`${this.cmpId}`).children[1].innerText
        this.noteData.info.txt = document.getElementById(`${this.cmpId}`).children[2].innerText
      } else {
        this.noteData.info.title = document.getElementById(`${this.cmpId}`).children[0].innerText
        this.noteData.info.txt = document.getElementById(`${this.cmpId}`).children[1].innerText
      }
      noteService.save(this.noteData).then(()=> this.$emit('updateData'))
    },
    removeShowEdit() {
      if(this.isEditable) this.focus = true
      else this.focus = false
    },
    openModal() {
      if(this.isEditable) return
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
    isEdit() {
      return this.isEditable
    },
    showEdit() {
      if(this.focus) return
      if(this.isEditable) return 'on-edit-note'
    },
    isModal() {
      if(this.openNote) return 'note-modal'
    }
  },
  unmounted() {
    this.unsubscribe()
  },
}