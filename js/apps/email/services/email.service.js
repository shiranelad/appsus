import { storageService } from '../../../services/async-storage-service.js'

export const emailService = {
    query,
}

// const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

const EMAILS_KEY = 'emails'

// const email = { 
//     id: 'e101', 
//     subject: 'Miss you!', 
//     body: 'Would love to catch up sometimes', 
//     isRead: false, 
//     sentAt : 1551133930594, 
//     to: 'momo@momo.com',
// },

function query() {
    return storageService.query(EMAILS_KEY)
}
