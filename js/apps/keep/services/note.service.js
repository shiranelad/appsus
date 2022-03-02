import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage-service.js";

const NOTES_KEY = "notesDB";
_createNotes();

export const noteService = {
  query,
  remove,
  save,
  get,
  createTxtNote,
  createImgNote,
  createTodoNote,
  createVideoNote
};

function query() {
  return storageService.query(NOTES_KEY);
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId);
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId).then((note) => {
    return _setNextPrevCarId(note);
  });
}

function save(note) {
  if (note.id) return storageService.put(NOTES_KEY, note);
  else return storageService.post(NOTES_KEY, note);
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY);
  console.log('notes',notes);
  if (!notes || !notes.length) {
    notes = [];
    notes.push(
      createTxtNote(
        "Getting my shit togheter",
        utilService.makeLorem(5),
        utilService.getRandomColor()
      )
    );
    notes.push(
      createTxtNote(
        "Just some Notes",
        utilService.makeLorem(5),
        utilService.getRandomColor()
      )
    );
    notes.push(
      createImgNote(
        "Me and Raja",
        "https://upload.wikimedia.org/wikipedia/commons/6/66/Velociraptor_%28IMG_Worlds_of_Adventure%29_1.jpg",
        utilService.getRandomColor()
      )
    );
    notes.push(
      createTxtNote(
        "Getting my shit togheter",
        utilService.makeLorem(5),
        utilService.getRandomColor()
      )
    );
    notes.push(
      createImgNote(
        "Me and Raja",
        "https://upload.wikimedia.org/wikipedia/commons/6/66/Velociraptor_%28IMG_Worlds_of_Adventure%29_1.jpg",
        utilService.getRandomColor()
      )
    );
    notes.push(
      createTodoNote(
        "Todos for this week",
        "I have to take Raja to a walk",
        "white"
      )
    );
    notes.push(
      createImgNote(
        "Me and Raja",
        "https://upload.wikimedia.org/wikipedia/commons/6/66/Velociraptor_%28IMG_Worlds_of_Adventure%29_1.jpg",
        utilService.getRandomColor()
      )
    );
    notes.push(
      createTodoNote(
        "Todos for this week",
        "I have to take Raja to a walk",
        "white"
      )
    );
    storageService.postMany(NOTES_KEY, notes);
  }
  return notes;
}

function createTxtNote(title, txt, style = "#102E4A") {
  const note = {
    type: "note-txt",
    info: {
      title,
      txt,
    },
    style: {
      backgroundColor: style,
    },
  };
  storageService.post(NOTES_KEY, note);
  return note
}

function createImgNote(title, url, style = "#102E4A") {
  const note = {
    type: "note-img",
    info: {
      title,
      url,
    },
    style: {
      backgroundColor: style,
    },
  };
  storageService.post(NOTES_KEY, note);
  return note
}

function createTodoNote(title, txt, style = "#102E4A") {
  let todos = txt.split(",");
  let list = todos.map((todo) => {
    return {
        txt:todo,
        doneAt: null
    };
  })
  console.log('list',list);
  const note = {
    type: "note-todos",
    info: {
      title,
      todos: list,
    },
    style: {
      backgroundColor: style,
    },
  };
  storageService.post(NOTES_KEY, note);
  return note
}

function createVideoNote(title, url, style="#102E4A") {
  let getVideoId = url.split('=')
  let newUrl = `https://www.youtube.com/embed/${getVideoId[1]}`
    const note = {
        type: "note-video",
        info: {
          title,
          url: newUrl,
        },
        style: {
          backgroundColor: style,
        },
      };
      storageService.post(NOTES_KEY, note);
      return note
}