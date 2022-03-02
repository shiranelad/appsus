import { noteService} from '../services/note.service.js'
import noteActions from "./note-actions.cmp.js"

export default {
  props: ["info", "cmpData"],
  template: `
        <section v-if="info.todos.length" class="note-card">
            <h3>{{info.title}}</h3>
            <ul>
                <li v-for="(todo, idx) in info.todos" :style="todo.doneAt ? {'text-decoration': 'line-through'} : {'text-decoration': 'none'}" @click="toggleMark(idx)">
                    {{todo.txt}}
                    <i @click="removeTodo(idx)" class="fa-solid fa-x delete-todo-icon"></i>
                  </li>
            </ul>
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
    toggleMark(idx) {
      console.log(this.info.todos[idx].doneAt)
      this.info.todos[idx].doneAt = (this.info.todos[idx].doneAt) ? null : Date.now()
    },
    deleteNote(){
      noteService.remove(this.noteData.id)
    },
    removeTodo(idx){
      console.log('this.noteData',this.noteData.info.todos);
      this.noteData.info.todos.splice(idx, 1)
      console.log('this.noteData',this.noteData.info.todos);
      noteService.save(this.noteData)
    },
    setColor(color) {
      this.noteData.style.backgroundColor = color
    }
  },
  computed: {
  },
  unmounted() {},
}