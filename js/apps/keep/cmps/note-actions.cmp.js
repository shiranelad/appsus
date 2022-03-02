
export default {
  props: ["noteType"],
  template: `
        <aside class="note-item-actions flex space-between">
                <i v-if="noteType === 'note-img'" title="Image note" class="far fa-image visible note-icons"></i>
                <i v-if="noteType === 'note-video'" title="Text note" class="fab fa-youtube visible note-icons"></i>
                <i v-if="noteType === 'note-txt'" title="Text note" class="fas fa-font visible note-icons"></i>
                <i v-if="noteType === 'note-todos'" title="Text note" class="fas fa-list visible note-icons"></i>
                <i title="Pin note" class="fas fa-thumbtack note-icons"></i> 
                <i title="Mark note" class="fas fa-check marked note-icons"></i> 
                <i title="Change note color" class="fas fa-palette info colors dropdown note-icons">
                    <div class="dropdown-content">
                        <span @click="emitColor('rgb(255, 255, 255)')" style="background-color: rgb(255, 255, 255);"> &nbsp; </span>
                        <span @click="emitColor('rgb(221, 221, 221)')" style="background-color: rgb(221, 221, 221);"> &nbsp; </span>
                        <span @click="emitColor('rgb(255, 136, 136)')" style="background-color: rgb(255, 136, 136);"> &nbsp; </span>
                        <span @click="emitColor('rgb(255, 204, 136)')" style="background-color: rgb(255, 204, 136);"> &nbsp; </span>
                        <span @click="emitColor('rgb(204, 255, 153)')" style="background-color: rgb(204, 255, 153);"> &nbsp; </span>
                        <span @click="emitColor('rgb(170, 255, 238)')" style="background-color: rgb(170, 255, 238);"> &nbsp; </span>
                        <span @click="emitColor('rgb(221, 187, 255)')" style="background-color: rgb(221, 187, 255);"> &nbsp; </span>
                        <span @click="emitColor('#5887FF')" style="background-color: #5887FF;"> &nbsp; </span>
                        <span @click="emitColor('#715AFF')" style="background-color: #715AFF;"> &nbsp; </span>
                        <span @click="emitColor('#102E4A')" style="background-color: #102E4A;"> &nbsp; </span>
                    </div>
                </i> 
                <i title="Edit note" class="fas fa-edit note-icons"></i> 
                <i title="Clone note" class="fas fa-clone info note-icons"></i> 
                <i @click="emitDelete" title="Delete note" class="fas fa-trash-alt danger note-icons"></i>
            </aside>
    `,
  components: {},
  created() {
  },
  data() {
    return {}
  },
  methods: {
    emitDelete(){
      this.$emit('delete')
    },
    emitColor(color) {
      this.$emit('setColor', color)
    }
  },
  computed: {},
  unmounted() {},
}