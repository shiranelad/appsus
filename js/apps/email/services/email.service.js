import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage-service.js'


const EMAILS_KEY = 'emails'
_createEmails()
// const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY)
    if (!emails || !emails.length) {
         emails = [
            {id: "e101", subject: "Miss you!", body: "Would love to catch up sometimes", isRead: false, sentAt: 1551133930594, from:"shiranelad@gmail.com", to: "momo@momo.com", labels: ['Friends', 'todo']},
            {id: "e102", subject: "Sale in Superpharm!", body: "Come see our new products", isRead: false, sentAt: 1646226959454, from:"superpharm@superpharm.co.il", to: "shiranelad@gmail.com", labels: ['Promotions']},
            {id: "e103", subject: "Your email is out of storage!", body: "Come see our new products", isRead: false, sentAt: 1646226959454, from:"admin@google.com", to: "shiranelad@gmail.com", labels: ['Notifications']},
            {id: "e104", subject: "Your bill from the electric company", body: "Come see our new products", isRead: false, sentAt: 1646226959454, from:"iec@iec.co.il", to: "shiranelad@gmail.com", labels: ['bills']},
            {id: "e105", subject: "New friend request", body: "Come see our new products", isRead: false, sentAt: 1646226959454, from:"facebook@facebook.com", to: "shiranelad@gmail.com"},
        ]
    }
    utilService.saveToStorage(EMAILS_KEY, emails)

}

function query() {
    return storageService.query(EMAILS_KEY)
}

function remove(emailId) {
    return storageService.remove(EMAILS_KEY, emailId)
}
function getEmailById(emailId) {
    return storageService.get(EMAILS_KEY, emailId)
    .then( email => {
            return _setNextPrevEmailId(email)
    })
}

function save(email) {
    return storageService.post(EMAILS_KEY, email)
}


function _setNextPrevEmailId(email) {
    return storageService.query(EMAILS_KEY).then(emails => {
        const emailIdx = emails.findIndex(currEmail => currEmail.id === email.id)
        email.nextEmailId = (emails[emailIdx+1])? emails[emailIdx+1].id : emails[0].id
        email.prevEmailId = (emails[emailIdx-1])? emails[emailIdx-1].id : emails[emails.length-1].id
        return email
    })
}

function updateEmail(email){
    return storageService.put(EMAILS_KEY, email)
}



export const emailService = {
    query,
    remove,
    getEmailById,
    save,
    updateEmail
}
