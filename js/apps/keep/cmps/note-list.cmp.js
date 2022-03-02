import notePreview from '../cmps/note-preview.cmp.js'

export default {
  // props: [""],
  template: `
        <section class="note-cards-container main-layout">
          <div @click="showCard" class="note-card"></div>
          <div class="note-card"></div>
          <div class="note-card"></div>
          <div class="note-card"></div>
        </section>
    `,
  components: {},
  created() {},
  data() {
    return {}
  },
  methods: {
    showCard() {
      console.log('thats a card');
    }
  },
  computed: {},
  unmounted() {},
}