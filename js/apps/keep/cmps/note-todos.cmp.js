

export default {
  props: ["info"],
  template: `
        <section class="note-card">
            <h3>{{info.title}}</h3>
            <ul>
                <li v-for="(todo, idx) in info.todos" :style="todo.doneAt ? {'text-decoration': 'line-through'} : {'text-decoration': 'none'}" @click="toggleMark(idx)">
                    {{todo.txt}}
                </li>
            </ul>
        </section>
    `,
  components: {},
  created() {},
  data() {
    return {}
  },
  methods: {
    toggleMark(idx) {
      console.log(this.info.todos[idx].doneAt)
      this.info.todos[idx].doneAt = (this.info.todos[idx].doneAt) ? null : Date.now()
    }
  },
  computed: {
  },
  unmounted() {},
}