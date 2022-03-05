import { eventBus } from '../services/eventBus-service.js'

export const aboutLeadership = {
    template: `<section>
        <h2>Leadership</h2>
        <ul>
            <li>
                <h2>Minnie Mouse, CEO</h2>
                <img class="ls-img" src="img/leadership/minnie.png" alt="">
            </li>
            <li>
                <h2>Mickey Mouse, CFO</h2>
                <img class="ls-img" src="img/leadership/mickey.png" alt="">
            </li>
            <li>
                <h2>Donald Duck, VP HR</h2>
                <img class="ls-img" src="img/leadership/donald.png" alt="">
            </li>
            <li>
                <h2>Goofy, VP Happiness</h2>
                <img class="ls-img" src="img/leadership/goofy.png" alt="">
            </li>
        </ul>
    </section>`
}

export const aboutCareers = {
    template: `<section>
        <h2>Careers</h2>
        <ul>
            <li>VP Book Product</li>
            <li>Warehouseman</li>
            <li>Gift Wrapper</li>
            <li>Book Editor</li>
        </ul>
    </section>`
}



export default {
    // name: 'about-page',
    template:`
        <section class="about-page app-main main-layout">
        <h1>About</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nemo, similique reprehenderit non quas exercitationem praesentium asperiores rerum quia veritatis dolorum excepturi libero explicabo. Consectetur accusamus dolor sapiente vel suscipit!
            Nulla sunt sapiente velit. Eos inventore quis illum, dolorem obcaecati numquam aperiam dolor delectus, similique fuga ducimus soluta at maiores eum quia cumque porro possimus magnam dignissimos neque sunt. Consectetur.
            Quidem ducimus doloribus eaque voluptatem repudiandae fuga autem maiores ipsum. Deleniti, laboriosam at qui ipsa magni, sed accusamus veniam iste, beatae veritatis dolores atque expedita pariatur nobis unde aliquid officia.
            Nulla voluptates in quibusdam itaque necessitatibus, adipisci mollitia ut sequi totam tempora praesentium et reiciendis ducimus fugiat architecto excepturi odit ullam aliquid. Dignissimos possimus officia doloribus sed molestiae saepe obcaecati!
            Aliquid, cum nam doloribus quibusdam, nostrum perferendis eos sit maiores rem veritatis consectetur ab aut? Numquam quia asperiores nesciunt, aperiam adipisci fuga blanditiis ea ut nisi cumque dolore voluptates quas?
            </p>
            <img src="img/books.png" alt="">
            <nav>
                <router-link to="/about/leadership">Leadership</router-link> |
                <router-link to="/about/careers">Careers</router-link>
            </nav>
            <router-view></router-view>

        </section>
    `,
    created(){


    },
    methods:{
        callBus(){
            console.log('Calling bus!');
            eventBus.emit('test','test data')
        }
    },
    unmounted(){
        console.log('done...')
        // clearInterval(this.aboutInt)
    }
}