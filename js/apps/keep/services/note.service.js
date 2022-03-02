import {utilService} from '../../../services/util.service.js'
import {storageService} from '../../../services/async-storage-service.js'

const STORAGE_KEY = 'notesDB';
_createNotes();

export const noteService = {
    query,
    remove,
    save,
    get,
};

function query() {
    return storageService.query(STORAGE_KEY);
}

function remove(noteId) {
    return storageService.remove(STORAGE_KEY, noteId);
}

function get(noteId) {
    return storageService.get(STORAGE_KEY, noteId)
    .then(note => {
        return _setNextPrevCarId(note)
    })
}

function save(note) {
    if (note.id) return storageService.put(STORAGE_KEY, note);
    else return storageService.post(STORAGE_KEY, note);
}

function _setNextPrevCarId(note) {
    return storageService.query(STORAGE_KEY).then(notes => {
        const carIdx = notes.findIndex(currNote => currNote.id === note.id)
        note.nextCarId = (notes[carIdx+1])? notes[carIdx+1].id : notes[0].id
        note.prevCarId = (notes[carIdx-1])? notes[carIdx-1].id : notes[notes.length-1].id
        return note
    })
}

function _createNotes() {
    let notes = utilService.loadFromStorage(STORAGE_KEY);
    if (!notes || !notes.length) {
        notes = [];
        notes.push(createTxtNote('Getting my shit togheter', utilService.makeLorem(5), utilService.getRandomColor()));
        notes.push(createTxtNote('Just some Notes', utilService.makeLorem(5), utilService.getRandomColor()));
        notes.push(createImgNote('Me and Raja', 'https://upload.wikimedia.org/wikipedia/commons/6/66/Velociraptor_%28IMG_Worlds_of_Adventure%29_1.jpg', utilService.getRandomColor()))
        notes.push(createTxtNote('Getting my shit togheter', utilService.makeLorem(5), utilService.getRandomColor()))
        notes.push(createImgNote('Me and Raja', 'https://upload.wikimedia.org/wikipedia/commons/6/66/Velociraptor_%28IMG_Worlds_of_Adventure%29_1.jpg', utilService.getRandomColor()))
        notes.push(createTodoNote('Todos for this week', 'I have to take Raja to a walk', 'white'))
        notes.push(createImgNote('Me and Raja', 'https://upload.wikimedia.org/wikipedia/commons/6/66/Velociraptor_%28IMG_Worlds_of_Adventure%29_1.jpg', utilService.getRandomColor()))
        notes.push(createTodoNote('Todos for this week', 'I have to take Raja to a walk', 'white'))
        utilService.saveToStorage(STORAGE_KEY, notes);
    }
    return notes;
}

function createTxtNote(title, txt, style) {
    return {
        id: utilService.makeId(),
        type:'note-txt',
        info: {
            title,
            txt,
        },
        style: {
            backgroundColor: style
        }
    }
}

function createImgNote(title, url, style) {
    return {
        id: utilService.makeId(),
        type: 'note-img',
        info: {
            title,
            url
        },
        style: {
            backgroundColor: style
        },
    }
}

function createTodoNote(title, txt, style) {
    return {
        id: utilService.makeId(),
        type: 'note-todos',
        info: {
            title,
            todos: [
                {txt, doneAt: null}
            ]
        },
        style: {
            backgroundColor: style
        },
    }
}