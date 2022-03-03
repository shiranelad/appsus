import { noteService} from '../services/note.service.js'
import noteActions from "./note-actions.cmp.js"

export default {
  props: ["info", "cmpData"],
  template: `
        <section v-if="info.todos.length" :class="markNote" :style="info.style" class="note-card">
            <i v-if="cmpData.isPinned" title="Pin note" class="fas fa-thumbtack note-icons pinned-note"></i>     
            <h3>{{info.title}}</h3>
            <ul>
                <li v-for="(todo, idx) in info.todos" :style="todo.doneAt ? {'text-decoration': 'line-through'} : {'text-decoration': 'none'}" @click="toggleDone(idx)">
                    {{todo.txt}}
                    <i @click="removeTodo(idx)" class="fa-solid fa-x delete-todo-icon"></i>
                  </li>
            </ul>
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
    toggleDone(idx) {
      console.log(this.info.todos[idx].doneAt)
      this.info.todos[idx].doneAt = (this.info.todos[idx].doneAt) ? null : Date.now()
    },
    deleteNote(){
      noteService.remove(this.noteData.id).then(()=> {
        this.$emit('updateData')
      })
    },
    removeTodo(idx){
      console.log('this.noteData',this.noteData.info.todos);
      this.noteData.info.todos.splice(idx, 1)
      console.log('this.noteData',this.noteData.info.todos);
      noteService.save(this.noteData)
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