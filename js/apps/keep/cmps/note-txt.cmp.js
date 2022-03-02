export default {
  props: ["info"],
  template: `
        <section class="note-card" :style="info.style">
            <h3>{{info.title}}</h3>
            <p>{{info.txt}}</p>
            <aside class="note-item-actions flex space-between">
                <i title="Image note" class="far fa-image visible"></i>
                <i title="Pin note" class="fas fa-thumbtack"></i> 
                <i title="Mark note" class="fas fa-check marked"></i> 
                <i title="Change note color" class="fas fa-palette info colors dropdown">
                    <!-- <div class="dropdown-content">
                        <span class="" style="background-color: rgb(255, 255, 255);"> &nbsp; </span>
                        <span class="" style="background-color: rgb(255, 136, 136);"> &nbsp; </span>
                        <span class="" style="background-color: rgb(255, 204, 136);"> &nbsp; </span>
                        <span class="selected" style="background-color: rgb(255, 255, 136);"> &nbsp; </span>
                        <span class="" style="background-color: rgb(204, 255, 153);"> &nbsp; </span>
                        <span class="" style="background-color: rgb(170, 255, 238);"> &nbsp; </span>
                        <span class="" style="background-color: rgb(136, 221, 255);"> &nbsp; </span>
                        <span class="" style="background-color: rgb(136, 187, 255);"> &nbsp; </span>
                        <span class="" style="background-color: rgb(221, 187, 255);"> &nbsp; </span>
                        <span class="" style="background-color: rgb(221, 221, 221);"> &nbsp; </span>
                    </div> -->
                </i> 
                <i title="Edit note" class="fas fa-edit"></i> 
                <i title="Clone note" class="fas fa-clone info"></i> 
                <i title="Delete note" class="fas fa-trash-alt danger"></i>
            </aside>
        </section>
    `,
  components: {},
  created() {
  },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  unmounted() {},
}