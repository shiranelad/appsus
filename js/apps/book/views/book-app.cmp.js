import { bookService } from '../services/book-service.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import bookDetails from '../views/book-details.cmp.js'
import bookSearch from '../cmps/book-search.cmp.js'
import { showSuccessMsg , showErrorMsg} from '../services/eventBus-service.js'

export default {
    template: `
        <section class="main-layout">
            <book-search @addedBook="addBook" />
            <book-filter @filtered="setFilter" ></book-filter>
            <book-list :books="booksToShow" @remove="removeBook" @selected="selectBook"></book-list>
            <book-details :book="selectedBook" v-if="selectedBook"></book-details>
        </section>
    `,
    components: {
        bookService,
        bookFilter,
        bookList,
        bookDetails,
        bookSearch,
    },
    data() {
        return {
            books: null,
            filterBy: {
                title: '',
                fromPrice: 0,
                toPrice: 200,
            },
            selectedBook: null,
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books);
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book;
        },

        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        removeBook(id) {
            bookService.remove(id)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === id)
                    this.books.splice(idx, 1)
                })
        },
        addBook(book){
            if(this.books.find(b => b.title === book.volumeInfo.title)) {
                showErrorMsg('Book already in collection')
                return
            }
            bookService.addGoogleBook(book)
            .then(books => this.books = books)
            .then(() => {
                showSuccessMsg('Book Added succesfully');
            })
            .catch(err => {
                console.error(err);
                showErrorMsg('Error - please try again later')
            });
            bookService.query()
            .then(books => this.books = books);
              }

    },
    computed: {
        booksToShow() {
            if (!this.books || !this.books.length) return;
            if (!this.filterBy) return this.books;
            const regex = new RegExp(this.filterBy.title, 'i');
            const min = this.filterBy.fromPrice || 0;
            const max = this.filterBy.toPrice || 200;
            return this.books.filter(book => regex.test(book.title) && (min <= book.listPrice.amount) && max >= book.listPrice.amount)
        },
    },

    unmounted() { },
}