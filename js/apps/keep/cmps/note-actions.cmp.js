
export default {
  props: ["noteType", "fontColor"],
  template: `
        <aside class="note-item-actions flex space-between" >
                <i v-if="noteType === 'note-img'" title="Image note" class="far fa-image visible"></i>
                <i v-if="noteType === 'note-video'" title="Text note" class="fab fa-youtube visible "></i>
                <i v-if="noteType === 'note-txt'" title="Text note" class="fas fa-font visible"></i>
                <i v-if="noteType === 'note-todos'" title="Text note" class="fas fa-list visible"></i>
                <i @click="emitPin" title="Pin note" class="fas fa-thumbtack" :class="darkModeColor"></i> 
                <i @click="emitMark" title="Mark note" class="fas fa-check marked " :class="darkModeColor"></i> 
                <i title="Change note color" class="fas fa-palette info colors dropdown " :class="darkModeColor">
                    <div class="dropdown-content">
                        <span @click="emitColor('rgb(255, 255, 255)', 'black')" style="background-color: rgb(255, 255, 255);"> &nbsp; </span>
                        <span @click="emitColor('#e3e3e3', 'black')" style="background-color: #e3e3e3;"> &nbsp; </span>
                        <span @click="emitColor('#f88', 'black')" style="background-color: #f88;"> &nbsp; </span>
                        <span @click="emitColor('#865687', 'black')" style="background-color: #865687;"> &nbsp; </span>
                        <span @click="emitColor('#4a4150')" style="background-color: #4a4150;"> &nbsp; </span>
                        <span @click="emitColor('#4a4a4a')" style="background-color: #4a4a4a;"> &nbsp; </span>
                        <span @click="emitColor('#222222')" style="background-color: #222222;"> &nbsp; </span>
                        <span @click="emitColor('#010630')" style="background-color: #010630;"> &nbsp; </span>
                        <span @click="emitColor('#440101')" style="background-color: #440101;"> &nbsp; </span>
                        <span @click="emitColor('#000')" style="background-color: #000;"> &nbsp; </span>
                    </div>
                </i> 
                <i @click="emitEdit" title="Edit note" class="fas fa-edit " :class="darkModeColor"></i> 
                <i @click="emitClone" title="Clone note" class="fas fa-clone info " :class="darkModeColor"></i> 
                <i @click="emitDelete" title="Delete note" class="fas fa-trash-alt danger" :class="darkModeColor"></i>
            </aside>
    `,
  components: {},
  created() {
  },
  data() {
    return {
      darkMode: false
    }
  },
  methods: {
    emitDelete(){
      this.$emit('delete')
    },
    emitColor(color, fontColor) {
      if (fontColor === 'black'){
        this.darkMode = false
        this.$emit('setColor', color)
      } else {
        this.darkMode = true
        this.$emit('setDarkColor', color)
      } 
    },
    emitPin(){
      this.$emit('setPin')
    },
    emitClone() {
      this.$emit('setClone')
    },
    emitMark(){
      this.$emit('setMark')
    },
    emitEdit() {
      this.$emit('edit')
    }
  },
  computed: {
    darkModeColor() {
      if(this.darkMode === true || this.fontColor === 'white') return 'notes-dark-mode'
      else return 'note-icons'
    }
  },
  unmounted() {},
}