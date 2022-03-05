export default {
    template: `
        <section class="book-filter">
            <label>
                Search
                <!-- <input @input="setFilter" type="text" v-model="filterBy.title"  placeholder="Search by Book Title"> -->
                <input type="text" v-model="filterBy.title"  placeholder="Search by Book Title">
            </label>
            <label>From Price
                <!-- <input @input="setFilter" type="number" v-model="filterBy.fromPrice" placeholder="Minimum Price"> -->
                <input type="number" v-model="filterBy.fromPrice" placeholder="Minimum Price">
            </label>
            <label>To Price
                <!-- <input @input="setFilter" type="number" v-model="filterBy.toPrice" placeholder="Maximum Price"> -->
                <input type="number" v-model="filterBy.toPrice" placeholder="Maximum Price">
            </label>
            <button @click="setFilter">Filter</button>
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: 0,
                toPrice:2000,
            }
        };
    },
    methods: {
        setFilter() {
            console.log(this.filterBy)
            // this.$emit('filtered', this.filterBy);
            this.$emit('filtered', {...this.filterBy});
        },
    },
    computed: {
        displayEmpty() {
            this.filterBy.fromPrice = null
            this.filterBy.toPrice = null
        },
    }

}