import { bookService } from "../services/book-service.js"
export default {
    // props: ["book"],
    template: `
        <section class="review">
            <h4>Add your review here:</h4>
            <form @submit.prevent class="add-review">
                <table>
                    <tr>                
                        <td>
                            <label>Full Name</label>
                        </td>
                        <td>
                            <input ref="reader" type="text" v-model="review.name"/>
                        </td> 
                    </tr>
                    <tr>
                        <td>
                            <label for="rating" >Rate:</label>
                        </td>
                        <td>
                            <select id="rating" v-model="review.rate">
                                <option v-for="i in 5" >{{i}}</option>
                            </select>                                
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Read At:</label>
                        </td>
                        <td>
                            <input type="date" v-model="review.date">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Your Review</label>
                        </td>
                        <td>
                            <textarea v-model="review.desc" cols="30" rows="7"></textarea>
                        </td>
                    </tr>
                </table>
                <button @click="save">Save</button>
                <button @click="closed">Close</button>
            </form>            
        </section>
    `,
    components: {},
    created() {
        const id = this.$route.params.bookId;
        bookService.getBookById(id)
            .then(book => this.book = book)
    },
    mounted() {
        this.$refs.reader.focus()
    },
    data() {
        return {
            book: null,
            review: {
                name: 'Book Reader',
                rate: 5,
                date: new Date().toISOString().slice(0, 10),
                desc: '',
            },
        }

    },
    methods: {

        save() {
                this.$emit('newReview', {...this.review});
                this.review = {
                name: 'Book Reader',
                    rate: null,
                    date: new Date().toISOString().slice(0, 10),
                    desc:''
                }
        },

        closed() {
            this.$emit('closed')
        },

    },
    computed: {

    },
    unmounted() { },
}

