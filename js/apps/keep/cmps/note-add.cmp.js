import { noteService } from "../services/note.service.js";
import { eventBus } from "../../../services/eventBus-service.js"

export default {
  // props: [""],
  template: `
        <section>
          <div class="add-notes flex justify-center align-center">
            <div class="add-note-container flex space-between align-center">
              <div class="flex col long-input-container">
                <input v-model="title" type="text" class="add-input-title add-input" placeholder="Title">
                <input v-model="val" @keyup.enter="addNote" type="text" class="add-input long-input" :placeholder="holder">
              </div>
              <div class="flex gap-5">
                <i @click="setType('text')" class="fas fa-font fa-lg note-icons"></i>
                <i @click="setType('img')" class="far fa-image fa-lg note-icons"></i>
                <i @click="setType('todos')" class="fas fa-list fa-lg note-icons"></i>
                <i @click="setType('video')" class="fab fa-youtube fa-lg note-icons"></i>
                <!-- <i @click="setType('audio')" class="fas fa-volume-up fa-lg note-icons"></i> -->
              </div>
            </div>
          </div>
        </section>
    `,
  components: {},
  created() {},
  data() {
    return {
      val: null,
      noteType: "text",
      title: "",
    };
  },
  methods: {
    addNote() {
      if (this.noteType === "text"){
        if (!this.title.length) this.title = "New note";
        noteService.createTxtNote(this.title, this.val);
      } else if(this.noteType === 'img'){
        if (!this.title.length) this.title = "New image";
        noteService.createImgNote(this.title, this.val)
      } else if(this.noteType === 'todos'){
        if (!this.title.length) this.title = "New list";
        noteService.createTodoNote(this.title, this.val)
      } else if(this.noteType === 'video'){
        if (!this.title.length) this.title = "New video";
        noteService.createVideoNote(this.title, this.val)
      } 
      this.val = null;
      this.title = "";
      this.noteType = "text";
      setTimeout(() => {
        eventBus.emit('updateByBus')
      }, 500);
    },

    setType(type) {
      this.noteType = type
    }
  },
  computed: {
    holder() {
      if (this.noteType === "text") return "Note here";
      else if (this.noteType === "img") return "Enter image URL";
      else if (this.noteType === "todos") return "Write comma seperated list";
      else if (this.noteType === "video") return "Enter video URL";
    },
  },
  unmounted() {},
};
