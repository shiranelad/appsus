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
        utilService.makeLorem(10),
      )
    );
    notes.push(
      createTxtNote(
        "Just some Notes",
        utilService.makeLorem(5),
      )
    );
    notes.push(
      createImgNote(
        "Me and Raja",
        "https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.6435-9/75614078_10216099474943007_7401725090628370432_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=e3f864&_nc_ohc=6b1KlCW1PgMAX-OC476&_nc_ht=scontent.ftlv6-1.fna&oh=00_AT8lx0sGBXquj-ETULFCej9_Y6nOIVBMpeoDuR_dDAgMcw&oe=62486B6A",
      )
    );
    notes.push(
      createImgNote(
        "Sunset at Ko Tao",
        "https://scontent.ftlv6-1.fna.fbcdn.net/v/t39.30808-6/252394570_10221062439734025_3629711366191690434_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=Eg5vEUDmrRwAX8xKLwn&_nc_ht=scontent.ftlv6-1.fna&oh=00_AT9a_O4YwfnEPRwJmVuv9aK4bfNoIDyE9UFrKnBYcoNjWw&oe=62265EB6",
      )
    );
    notes.push(
      createVideoNote(
        "King Pac",
        "https://www.youtube.com/watch?v=KrhcVClS43o"
      )
    );
    notes.push(
      createTodoNote(
        "Todos for this week",
        "I have to take Raja to a walk every night,Gotta pay rent,Gotta train",
      )
    );
    storageService.postMany(NOTES_KEY, notes);
  }
  return notes;
}

function createTxtNote(title, txt, style = "#ffffff") {
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

function createImgNote(title, url, style = "#ffffff") {
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

function createTodoNote(title, txt, style = "#ffffff") {
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

function createVideoNote(title, url, style="#ffffff") {
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