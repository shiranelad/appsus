import { noteService} from '../services/note.service.js'
import noteActions from "./note-actions.cmp.js"
import {utilService} from '../../../services/util.service.js'
import { eventBus } from '../../../services/eventBus-service.js'

export default {
  props: ["info", "cmpData"],
  template: `
        <section v-if="info.todos.length" :class="markNote" :class="isModal" :style="info.style" class="note-card" >
            <i v-if="cmpData.isPinned" @click="setPin" title="Pin note" class="fas fa-thumbtack note-icons pinned-note"></i>     
            <h3 @click="openModal">{{info.title}}</h3>
            <ul :id="cmpId">
                <li v-for="(todo, idx) in info.todos" @keyup="updateNote" :contentEditable="isEdit" :style="todo.doneAt ? {'text-decoration': 'line-through'} : {'text-decoration': 'none'}" @click="toggleDone(idx)">
                    {{todo.txt}}
                    <i @click.stop="removeTodo(idx)" class="fa-solid fa-x delete-todo-icon"></i>
                  </li>
            </ul>
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
      cmpId: null,
      isEditable: false,
      focus: false,
      openNote: false
    }
  },
  methods: {
    toggleDone(idx) {
      if(this.isEditable) return
      this.noteData.info.todos[idx].doneAt = (this.noteData.info.todos[idx].doneAt) ? null : Date.now()
      noteService.save(this.noteData).then(()=> this.$emit('updateData'))
    },
    deleteNote(){
      noteService.remove(this.noteData.id).then(()=> {
        this.$emit('updateData')
        if(this.openNote) eventBus.emit('closeScreen')
      })
    },
    removeTodo(idx){
      console.log('this.noteData',this.noteData.info.todos);
      this.noteData.info.todos.splice(idx, 1)
      console.log('this.noteData',this.noteData.info.todos);
      noteService.save(this.noteData).then(()=> this.$emit('updateData'))
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
      noteService.save(this.noteData).then(()=> {
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
      let elTodos = document.getElementById(`${this.cmpId}`).children
      let todos = []
      for(var i = 0; i < elTodos.length; i++) {
        todos.push({
          txt: elTodos[i].innerText,
          doneAt: null
        })
      }
      let copyNote = {...this.noteData}
      let copyInfo = {...copyNote.info}
      copyNote.info = copyInfo
      copyNote.info.todos = todos
      noteService.save(copyNote).then(()=> this.$emit('updateData'))
    },
    removeShowEdit() {
      if(this.isEditable) this.focus = true
      else this.focus = false
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