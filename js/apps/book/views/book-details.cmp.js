import { utilService } from "../services/util-service.js"
import { bookService } from "../services/book-service.js";
import { showSuccessMsg, showErrorMsg } from "../services/eventBus-service.js";
import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'
import bookReviews from '../cmps/book-reviews.cmp.js'

export default {
    template: `
        <section v-if="book" class="book-details main-layout app-main">
            <!-- <h3 class="details-header">Details</h3> -->
            <span>
                <img class="bookimg" :src="book.thumbnail"/>
                <img v-if="isOnSale" class="sale" src="img/sale.png"/>
            </span>
            
            <h2 class="title">{{book.title}} 
                
            </h2>
            <p><u>Authors</u>: <span v-for="author in book.authors">{{author}}{{addSeperator}}</span></p>
            <p><u>Published Date</u>: {{book.publishedDate}}
                <span class="publish">{{dispPublish}} </span> 
            </p>
            <p><u>Description</u>: {{editDesc}}
                <long-text v-if="longTextStr" v-bind:txt="book.description"></long-text>
            </p>
            <p><u>No. of Pages</u>: {{book.pageCount}}</p>
            <p><u>Categories</u>: <span v-for="cat in book.categories">{{cat}},</span></p>
            <p><u>Language</u>: {{book.language}}</p>
            <p><u>Price</u>: <span :class="color">{{getCurrSymbol(book.listPrice['currencyCode'])}} {{book.listPrice.amount}}</span></p>
            <div class="reading">{{checkReadingLength}}</div>
            <router-link :to="'/book/'+book.prevBookId">Prev Book</router-link> | 
            <router-link :to="'/book/'+book.nextBookId">Next Book</router-link> | 
            <hr />
            <button v-if="!addReview" @click="addReview = !addReview">Add a Review</button>
            <review-add v-if="addReview" @closed="toggleAddReview" @newReview="saveReview"></review-add>
            <book-reviews @bookUpdated="bookUpdated" :reviews="book.reviews"></book-reviews>
        </section>
    `,
    components: {
        longText,
        reviewAdd,
        bookReviews
    },
    created() {
        // const id = this.$route.params.bookId;
        // bookService.getBookById(id)
        //     .then(book => {
        //         this.book = book
        //         this.longTextStr = this.book.description.length > 100
        //     });
    },

    data() {
        return {
            longTextStr: null, 
            isShown: false,
            book: null,
            addReview: false,
        }
    },
    methods: {
        getCurrSymbol(code) {
            return utilService.getCurrencySymbol(code)
        },
        toggleAddReview() {
            this.addReview = !this.addReview
        },

        saveReview(review){
            bookService.addReview(this.book.id, review)
            .then(book => this.book.reviews = book.reviews)
            .then(() => {
                showSuccessMsg('Review added succesfully');
            })
            .catch(err => {
                console.error(err);
                showErrorMsg('Error - please try again later')
            });
        },
        bookUpdated(book){
            this.book = book
        },
        loadBook() {
            bookService.getBookById(this.bookId)
            .then(book => this.book = book);
        }
    },
    computed: {

        bookId() {
            return this.$route.params.bookId
        },


        addSeperator() {
            if (this.book.authors.length > 1) return ', '
            else return ''
        },
        checkReadingLength() {
            if (this.book.pageCount > 500) return 'Long Reading'
            else if (this.book.pageCount > 200) return 'Descent Reading'
            else if (this.book.pageCount < 100) return 'Light Reading'
        },
        dispPublish() {
            var dateDiff = new Date().getFullYear() - this.book.publishedDate
            if (dateDiff > 10) return 'Veteran Book'
            else if (dateDiff < 1) return 'New!'
        },
        color() {
            var price = this.book.listPrice['amount']
            return { red: price > 150, green: price < 20 }
        },
        isOnSale() {
            return this.book.listPrice.isOnSale
        },
        editDesc() {
            return this.book.description.substr(0, 100)
        }

    },
    watch : {
        bookId : {
            handler(){
                this.loadBook()
            },
            immediate : true
        }
    },

    unmounted() {

    },
}