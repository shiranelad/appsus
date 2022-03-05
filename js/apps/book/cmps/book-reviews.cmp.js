import { bookService } from "../services/book-service.js";
import { showErrorMsg, showSuccessMsg }  from "../services/eventBus-service.js";

export default {
  props: ["reviews"],
  template: `
        <section>
          <hr />
            <h3>Readers Reviews</h3>
            <ul>
              <li v-for="review in reviews" class="single-review">
                <small>Rated: {{review.rate}}</small>
                <p><b><i>"{{review.desc}}"</i></b></p>
                <p><small>Reviewed By: {{review.name}}, {{review.date}}</small></p>
                <button @click="remove(review.id)">X</button>
              </li>
              <br>
            </ul>
        </section>
    `,
  components: {

  },
  created() {
    const id = this.$route.params.bookId;
    bookService.getBookById(id)
      .then(book => {
        this.bookReviews = book.reviews
        this.book = book
      })
  },
  data() {
    return {
      book: null,
      bookReviews: this.reviews,
    }
  },
  methods: {
    remove(reviewId) {
      bookService.removeReview(this.book.id, reviewId)
        .then(book => {
          this.$emit('bookUpdated', book)
        })
        .then(() => {
          showSuccessMsg('Review deleted succesfully');
      })
      .catch(err => {
          console.error(err);
          showErrorMsg('Error - please try again later')
      });
        
    }
  },
  computed: {
  },

  unmounted() { },
}