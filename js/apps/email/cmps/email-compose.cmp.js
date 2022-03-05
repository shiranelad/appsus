import { eventBus } from "../../../services/eventBus-service.js"
import { emailService } from "../services/email.service.js"

export default {
  // props: [""],
  template: `
        <section class="compose-box">
            <div class="compose-header">
                <table>
                    <tbody>
                    <tr>
                        <td class="new-message">New Message</td>
                        <td class="header-icons">
                            <!-- <i class="minimize icon" label="Minimize"></i>
                            <i class="pop-out icon" label="Pop-Out"></i> -->
                            <i class="close icon" label="Close" @click="closeDraft"></i>
                        </td>
                    </tr>
                    </tbody>
                </table>  
                <form @submit.prevent>
                    <input type="email" class="compose-to" v-model="draft.to" placeholder="Recipients">
                    <input type="text" class="compose-subject" v-model="draft.subject" placeholder="Subject">
                </form> 
            </div>
            <textarea class="compose-body" role="textbox" contenteditable="true" aria-multiline="true" v-model="draft.body"></textarea>
            <div class="compose-toolbar flex align-center space-between">
                <button class="compose-send" @click="sendEmail">Send</button>
                <div class="send-save flex align-center">
                    <i class="compose-save icon compose-icon" title="Save Draft" @click="saveDraft"></i>
                    <i class="icon compose-delete compose-icon" title="Delete Draft"></i>
                </div>
            </div>
        </section>
    `,
  components: {},
  created() {

  },
  data() {
    return {
        draft: emailService.getEmptyEmail(),
    }   
  },
  methods: {

    sendEmail(){
        this.draft.from = emailService.getLoggedInUser().email
        this.draft.isDraft = false
        this.draft.sentAt = Date.now()
console.log(this.draft)
        emailService.save(this.draft)
        
    },

    deleteDraft(){
        emailService.remove(this.draft)
    },

    saveDraft(){
            this.draft.from = emailService.getLoggedInUser().email
            this.draft.isDraft = true
            this.draft.sentAt = Date.now()
            emailService.save(this.draft)
            .then(email => this.draft.id = email.id)
            this.$router.push(this.$route.path + '?compose=' + this.draft.id)
    },

    closeDraft(){
        this.$emit('closeCompose', true);

    }
  },
  computed: {},
  unmounted() { 
    // this.unsubscribe();
  },
}