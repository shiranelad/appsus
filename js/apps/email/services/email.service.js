import { storageService } from '../../../services/async-storage-service.js'


const EMAILS_KEY = 'emails'
_createEmails()
// const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }


function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY)
    if (!emails || !emails.length) {
         emails = [
            {id: e101, subject: "Miss you!", body: "Would love to catch up sometimes", isRead: false, sentAt: 1551133930594, to: "momo@momo.com"},
            {id: e102, subject: "Sale in Superpharm!", body: "Come see our new products", isRead: false, sentAt: 1646226959454, to: "shiranelad@gmail.com"},
            {id: e103, subject: "Your email is out of storage!", body: "Come see our new products", isRead: false, sentAt: 1646226959454, to: "shiranelad@gmail.com"},
            {id: e104, subject: "Your bill from the electric company", body: "Come see our new products", isRead: false, sentAt: 1646226959454, to: "shiranelad@gmail.com"},
            {id: e105, subject: "New friend request", body: "Come see our new products", isRead: false, sentAt: 1646226959454, to: "shiranelad@gmail.com"},
        ]
    }
    utilService.saveToStorage(EMAILS_KEY, emails)

}

// id: 'e101', 
//     subject: 'Miss you!', 
//     body: 'Would love to catch up sometimes', 
//     isRead: false, 
//     sentAt : 1551133930594, 
//     to: 'momo@momo.com',
// },

function query() {
    return storageService.query(EMAILS_KEY)
}

export const emailService = {
    query,
}
