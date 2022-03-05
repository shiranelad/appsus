export default {
    props: ['txt'],
    template: `
        
        <span v-if="!isShown">... </span>    
        <span v-if="isShown"> {{restText}} </span>
        <button class="readmore" @click="toggleRead"> Read {{moreOrLess}} </button>
    `,
    components: {},
    created() { },
    data() {
        return {
            isShown: false,
            show: 'Less'
        }
    },
    methods: {
        toggleRead() {
            this.isShown = !this.isShown
        }

    },    
    computed: {
        
        moreOrLess() {
            if (this.isShown) return 'Less'
            else return 'More'
        },    
        
        restText() {
                return this.txt.substr(100,this.txt.length) 
        },    
        
    },
    unmounted() { },
}