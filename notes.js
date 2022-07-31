const fs = require('fs');
const chalk = require('chalk');

const log = console.log;

const getNotes = () => {  //Refactorizado a arrow function ES6
    log(chalk.inverse('Your notes...'));

    const notes = listNotes();
    notes.forEach(note => log(chalk.green(note.title) + ': ' + note.body));
}

const addNote = (title, body) => { //Refactorizado a arrow function ES6
    const notes = listNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        log(chalk.green.inverse('New note added'));
        return true;
    } else {
        log(chalk.red.inverse('Note title taken'));
        return false;
    }

}

const saveNotes = (notes) => { //Refactorizado a arrow function ES6
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const deleteNote =  (title) => { //Refactorizado a arrow function ES6
    const notes = listNotes();
    const notesToKeep = notes.filter(note => note.title !== title);//Refactorizado a arrow function ES6

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        log(chalk.green.inverse('Note deleted'));
    } else {
        log(chalk.red.inverse('Note not found'));
    }
}

const listNotes = () => {
    try {
        const data = fs.readFileSync('notes.json');
        const dataJSON = data.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

const readNote = (title) => {  //Refactorizado a arrow function ES6
    const notes = listNotes();
    const note = notes.find((note) => note.title === title);

    if (note) {
        log(chalk.blue.inverse(note.title) + ': ' + note.body);
    } else {
        log(chalk.red.inverse('Note not found'));
    }
}

module.exports = {getNotes, readNote, addNote, deleteNote};