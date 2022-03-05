
export default {
  props: ["noteType", "fontColor"],
  template: `
        <aside class="note-item-actions flex space-between" :class="onDropdownClick" >
                <i v-if="noteType === 'note-img'" title="Image note" class="far fa-image visible"></i>
                <i v-if="noteType === 'note-video'" title="Video note" class="fab fa-youtube visible "></i>
                <i v-if="noteType === 'note-txt'" title="Text note" class="fas fa-font visible"></i>
                <i v-if="noteType === 'note-todos'" title="List note" class="fas fa-list visible"></i>
                <i @click="emitPin" title="Pin note" class="fas fa-thumbtack" ></i> 
                <i @click="emitMark" title="Mark note" class="fas fa-check marked " ></i> 
                <i title="Change note color" @click.stop="openDropdown" class="fas fa-palette info colors dropdown " >
                    <div class="dropdown-content" :class="onDropdownClick">
                        <span @click="emitColor('#e8eaed')" style="background-color: #e8eaed;"> &nbsp; </span>
                        <span @click="emitColor('#e6c9a8')" style="background-color: #e6c9a8;"> &nbsp; </span>
                        <span @click="emitColor('#fdcfe8')" style="background-color: #fdcfe8;"> &nbsp; </span>
                        <span @click="emitColor('#d7aefb')" style="background-color: #d7aefb;"> &nbsp; </span>
                        <span @click="emitColor('#aecbfa')" style="background-color: #aecbfa;"> &nbsp; </span>
                        <span @click="emitColor('#cbf0f8')" style="background-color: #cbf0f8;"> &nbsp; </span>
                        <span @click="emitColor('#a7ffeb')" style="background-color: #a7ffeb;"> &nbsp; </span>
                        <span @click="emitColor('#ccff90')" style="background-color: #ccff90;"> &nbsp; </span>
                        <span @click="emitColor('#fff475')" style="background-color: #fff475;"> &nbsp; </span>
                        <span @click="emitColor('#fbbc04')" style="background-color: #fbbc04;"> &nbsp; </span>
                        <span @click="emitColor('#f28b82')" style="background-color: #f28b82;"> &nbsp; </span>
                        <span @click="emitColor('#fff')" class="droplet" style="background-color: #fff;"> <i class="fa-solid fa-droplet-slash"></i> </span>
                        <span @click="emitImage('https://www.gstatic.com/keep/backgrounds/celebration_light_0714_rtl.svg')" class="bg-img-note" style="background-image: url('https://www.gstatic.com/keep/backgrounds/celebration_light_0714_rtl.svg')"> &nbsp; </span>
                        <span @click="emitImage('https://www.gstatic.com/keep/backgrounds/video_light_0609_rtl.svg')" class="bg-img-note" style="background-image: url('https://www.gstatic.com/keep/backgrounds/video_light_0609_rtl.svg')"> &nbsp; </span>
                        <span @click="emitImage('https://www.gstatic.com/keep/backgrounds/travel_light_0614_rtl.svg')" class="bg-img-note" style="background-image: url('https://www.gstatic.com/keep/backgrounds/travel_light_0614_rtl.svg')"> &nbsp; </span>
                        <span @click="emitImage('https://www.gstatic.com/keep/backgrounds/places_light_0609_rtl.svg')" class="bg-img-note" style="background-image: url('https://www.gstatic.com/keep/backgrounds/places_light_0609_rtl.svg')"> &nbsp; </span>
                        <span @click="emitImage('https://www.gstatic.com/keep/backgrounds/notes_light_0609_rtl.svg')" class="bg-img-note" style="background-image: url('https://www.gstatic.com/keep/backgrounds/notes_light_0609_rtl.svg')"> &nbsp; </span>
                        <span @click="emitImage('https://www.gstatic.com/keep/backgrounds/recipe_light_0609_rtl.svg')" class="bg-img-note" style="background-image: url('https://www.gstatic.com/keep/backgrounds/recipe_light_0609_rtl.svg')"> &nbsp; </span>
                        <span @click="emitImage('https://www.gstatic.com/keep/backgrounds/music_light_0609_rtl.svg')" class="bg-img-note" style="background-image: url('https://www.gstatic.com/keep/backgrounds/music_light_0609_rtl.svg')"> &nbsp; </span>
                        <span @click="emitImage('https://www.gstatic.com/keep/backgrounds/food_light_0609_rtl.svg')" class="bg-img-note" style="background-image: url('https://www.gstatic.com/keep/backgrounds/food_light_0609_rtl.svg')"> &nbsp; </span>
                        <span @click="emitImage('https://www.gstatic.com/keep/backgrounds/grocery_light_0609_rtl.svg')" class="bg-img-note" style="background-image: url('https://www.gstatic.com/keep/backgrounds/grocery_light_0609_rtl.svg')"> &nbsp; </span>
                        <span @click="emitColor('#fff')" class="bg-img-note set-no-background" style="background-color: #fff"> &nbsp; </span>
                    </div>
                </i> 
                <i @click="emitEdit" title="Edit note" class="fas fa-edit " ></i> 
                <i @click="emitClone" title="Clone note" class="fas fa-clone info " ></i> 
                <i @click="emitDelete" title="Delete note" class="fas fa-trash-alt danger" ></i>
            </aside>
    `,
  components: {},
  created() {
  },
  data() {
    return {
      isDropdownOpen: false
    }
  },
  methods: {
    emitDelete(){
      this.$emit('delete')
    },
    emitColor(color, fontColor) {
        this.$emit('setColor', color)
    },
    emitImage(url) {
      this.$emit('setBgImage', url)
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
    },
    openDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
      document.body.addEventListener('click', this.closeDropdown, true)
    },
    closeDropdown() {
      this.isDropdownOpen = false
      document.body.removeEventListener('click')
    }
  },
  computed: {
    onDropdownClick(){
      return (this.isDropdownOpen) ? 'onclick-dropdown-content' : ''
    }
  },
  unmounted() {},
}