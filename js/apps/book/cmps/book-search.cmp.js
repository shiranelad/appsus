import { bookService } from "../services/book-service.js"

export default {
  // props: [""],
  template: `
        <section>
            <input type="text" name="searchBook" v-model="searchVal" placeholder="Search Books...">
            <button @click="searchBook(searchVal)">Search</button>
            <ul>
                <li v-for="book in books">
                    <button @click="addedBook(book)">+</button> 
                    <span><b>{{book.volumeInfo.title}}</b>, {{book.volumeInfo.publishedDate.substr(0,4)}}</span>
                </li>
            </ul>
        </section>
    `,
  components: {},
  created() {},
  data() {
    return {
        searchVal: '',
        books: null
    }
  },
  methods: {
      searchBook(searchVal){
        return bookService.searchGoogleBooks(searchVal)
        .then(books => this.books = books)
      },

      addedBook(book){
          this.$emit('addedBook',book)
      }
  },
  computed: {},
  unmounted() {},
}