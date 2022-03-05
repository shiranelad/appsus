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
  if (!notes || !notes.length) {
    notes = [
      {
        "type": "note-txt",
        "info": {
            "title": "Welcome to Note keeper",
            "txt": "Remind yourself your tasks, Write down your ideas, Upload your favourite imgs \\ videos !"
        },
        "style": {
            "backgroundColor": "",
            "color": "black",
            "backgroundImage": "url(https://www.gstatic.com/keep/backgrounds/video_light_0609_rtl.svg)"
        },
        "id": "hvnmToJx",
        "isPinned": true
      },
      {
        "type": "note-txt",
        "info": {
            "title": "Note that you can",
            "txt": "Pin your important notes, mark them, edit, add and remove them. We also offer a mailing system so you can send your notes easily !"
        },
        "style": {
            "backgroundColor": "",
            "color": "black",
            "backgroundImage": "url(https://www.gstatic.com/keep/backgrounds/food_light_0609_rtl.svg)"
        },
        "id": "yaqLXuXe"
      },
      {
        "type": "note-video",
        "info": {
            "title": "Video note",
            "url": "https://www.youtube.com/embed/j3kyaUU7D5I"
        },
        "style": {
            "backgroundColor": "#e8eaed",
            "color": "black",
            "backgroundImage": ""
        },
        "id": "dMzOaXJ3"
      },
      {
        "type": "note-todos",
        "info": {
            "title": "Here you can see the list note",
            "todos": [
                {
                    "txt": "1st thing to do",
                    "doneAt": null
                },
                {
                    "txt": " Done",
                    "doneAt": 1646408338563
                },
                {
                    "txt": " 3rd thing to do",
                    "doneAt": null
                }
            ]
        },
        "style": {
            "backgroundColor": "#cbf0f8",
            "color": "black",
            "backgroundImage": ""
        },
        "id": "NhckZdxI",
        "isPinned": false
      },
      {
        "type": "note-img",
        "info": {
            "title": "Image note",
            "url": "https://i.pinimg.com/originals/b8/56/2c/b8562ce4c2003c20054ba294b6524c3c.jpg"
        },
        "style": {
            "backgroundColor": "",
            "color": "black",
            "backgroundImage": "url(https://www.gstatic.com/keep/backgrounds/celebration_light_0714_rtl.svg)"
        },
        "id": "gYV4051b",
        "isMarked": false
      },
      {
        "type": "note-txt",
        "info": {
            "title": "So please",
            "txt": "Enjoy this app, share it to your friends and support us ! Thanks a lot :)"
        },
        "style": {
            "backgroundColor": "#fbbc04",
            "color": "black",
            "backgroundImage": ""
        },
        "id": "s3l1dHwC",
        "isMarked": true
    }
    ]
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