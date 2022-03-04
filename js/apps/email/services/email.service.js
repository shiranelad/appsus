import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage-service.js'


const EMAILS_KEY = 'emails'
_createEmails()
// const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

const loggedinUser = { email: 'shiran@codingacademy.com', fullname: 'Shiran Elad'}
const criteria = 
    { 
        isStarred: null, 
        isImportant: null, 
        to: getLoggedInUser().email, 
        from: '', 
        isDeleted: null,
        isDraft: null,
    }



function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY)
    if (!emails || !emails.length) {
        emails = [
            {
                id: "e101",
                subject: "Miss you!",
                body: "Would love to catch up sometimes",
                isRead: false,
                sentAt: 1551133930594,
                from: "shiran@codingacademy.com",
                to: "momo@momo.com",
                labels: ['Friends', 'todo'],
                isSelected: false,
                isStarred: false,
                isImportant: false, 
                isDraft: false,
            },
            {
                id: "e102",
                subject: "Sale in Superpharm!",
                body: "Come see our new products",
                isRead: false,
                sentAt: 1646226959454,
                from: "superpharm@superpharm.co.il",
                to: "shiran@codingacademy.com",
                labels: ['Promotions'],
                isSelected: false,
                isStarred: false,
                isImportant: false, 
                isDraft: false,
            },
            {
                id: "e103",
                subject: "Your email is out of storage!",
                body: "Come see our new products",
                isRead: false,
                sentAt: 1646226959454,
                from: "admin@google.com",
                to: "shiran@codingacademy.com",
                labels: ['Notifications'],
                isSelected: false,
                isStarred: false,
                isImportant: false, 
                isDraft: false,
            },
            {
                id: "e104",
                subject: "Your bill from the electric company",
                body: "Come see our new products",
                isRead: false,
                sentAt: 1646226959454,
                from: "iec@iec.co.il",
                to: "shiran@codingacademy.com",
                labels: ['bills'],
                isSelected: false,
                isStarred: false,
                isImportant: false, 
                isDraft: false,
            },
            {
                id: "e105",
                subject: "New friend request",
                body: "Come see our new products",
                isRead: false,
                sentAt: 1646226959454,
                from: "facebook@facebook.com",
                to: "shiran@codingacademy.com",
                isSelected: false,
                isStarred: false,
                isImportant: false, 
                isDraft: false,
            },
            {
                id: "e106",
                subject: "Miss you!",
                body: "Would love to catch up sometimes",
                isRead: false,
                sentAt: 1551133930594,
                from: "shiran@codingacademy.com",
                to: "momo@momo.com",
                labels: ['Friends', 'todo'],
                isSelected: false,
                isStarred: false,
                isImportant: false, 
                isDraft: false,
            },
            {
                id: "e107",
                subject: "Re: Sale in Superpharm!",
                body: "Unsubscribe me",
                isRead: false,
                sentAt: 1646332343055,
                from: "shiran@codingacademy.com",
                to: "superpharm@superpharm.co.il",
                labels: ['Promotions'],
                isSelected: false,
                isStarred: false,
                isImportant: false, 
                isDraft: false,
            },
            {
                id: "e108",
                subject: "Re: Your email is out of storage!",
                body: "OK. thanks for lettling me know",
                isRead: false,
                sentAt: 1646322343055,
                from: "shiran@codingacademy.com",
                to: "admin@google.com",
                labels: ['Notifications'],
                isSelected: false,
                isStarred: false,
                isImportant: false, 
                isDraft: false,
            },
            {
                id: "e109",
                subject: "Your bill from the electric company",
                body: "Come see our new products",
                isRead: false,
                sentAt: 1646332543055,
                from: "iec@iec.co.il",
                to: "shiran@codingacademy.com",
                labels: ['bills'],
                isSelected: false,
                isStarred: false,
                isImportant: false, 
                isDraft: false,
            },
            {
                id: "e110",
                subject: "New friend request",
                body: "Come see our new products",
                isRead: false,
                sentAt: 1646332342055,
                from: "facebook@facebook.com",
                to: "shiran@codingacademy.com",
                labels: [],
                isSelected: false,
                isStarred: false,
                isImportant: false, 
                isDraft: false,
            },
            {
                id: "e111",
                subject: "This is a draft",
                body: "I am starting to write this email...",
                isRead: false,
                sentAt: 0,
                from: "shiranelad@codingacademy.com",
                to: "",
                labels: [],
                isSelected: false,
                isStarred: false,
                isImportant: false, 
                isDraft: true,
            },
        ]
    }
    utilService.saveToStorage(EMAILS_KEY, emails)

}

function query() {
    return storageService.query(EMAILS_KEY)
}

function getLoggedInUser() {
    return loggedinUser
}

function remove(emailId) {
    return storageService.remove(EMAILS_KEY, emailId)
}
function getEmailById(emailId) {
    return storageService.get(EMAILS_KEY, emailId)
}

function save(email) {
    return storageService.post(EMAILS_KEY, email)
}


function _setNextPrevEmailId(email) {
    return storageService.query(EMAILS_KEY).then(emails => {
        const emailIdx = emails.findIndex(currEmail => currEmail.id === email.id)
        email.nextEmailId = (emails[emailIdx + 1]) ? emails[emailIdx + 1].id : emails[0].id
        email.prevEmailId = (emails[emailIdx - 1]) ? emails[emailIdx - 1].id : emails[emails.length - 1].id
        return email
    })
}

function updateEmail(email) {
    return storageService.put(EMAILS_KEY, email)
}

function getEmptyEmail(){
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        from: '',
        to: '',
        isSelected: false,
        labels: [],
        isStarred: false,
        isImportant: false, 
        isDraft: false,
    }
}

function setFilter(filterByTerm, filterByObject){
    
}

function getFilter(emails, filterByObject, filterByTerm){
    
    if(filterByObject[filterByTerm]){
        return emails.filter(email => email.isStarred === filterByObject[filterByTerm])
      }
    //   if(filterByObject.isImportant){
    //     return emails.filter(email => email.isImportant === filterByObject.isImportant)
    //   }
    //   if(filterByObject.isDraft){
    //     return emails.filter(email => email.isDraft === filterByObject.isDraft)
    //   }
    //   if(filterByObject.isDeleted){
    //     return emails.filter(email => email.isDeleted === filterByObject.isDeleted)
    //   }
    //   if(filterByObject.from){
    //     return emails.filter(email => email.from === filterByObject.from)
    //   }
    //   if(filterByObject.to){
    //     return emails.filter(email => email.to === filterByObject.to)
    //   }

}



export const emailService = {
    query,
    remove,
    getEmailById,
    save,
    updateEmail,
    getLoggedInUser,
    getEmptyEmail,
    getFilter,
}
