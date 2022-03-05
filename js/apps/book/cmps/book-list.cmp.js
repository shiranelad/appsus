import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
        <section>
            <ul class="book-list">
                <li v-for="book in books" :key="book.id" class="book-item">
                    <book-preview :book="book" />
                    <div class="actions">
                        <button @click="remove(book.id)">X</button>
                        <router-link :to="'/book/'+book.id">Details</router-link>
                        <!-- <button @click="select(book)">Details</button> -->
                    </div>
                </li>
            </ul>
        </section>
    `,
    components: {
        bookPreview,
    },
    created(){

    },
    data() {
        return {

        }
    },
    methods: {
        remove(id){
            this.$emit('remove', id);
        },
        
        select(book) {
            this.$emit('selected', book);
        }
    },
    computed: {
       
    },
    unmounted(){

    }
}
