const express = require('express');

const fs = require('fs');

const {v4: uuidv4} = require('uuid')

const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

const notes = require('./db/db.json')



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// function createNewNote(text, array) {
//   array.push(text);
// //   fs.writeFileSync(
//     path.join(__dirname, '../db/db.json'),
//     JSON.stringify({
//         notes: array
//       }, null, 2)
// )
//   return text;
// }



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/notes.html'));
});



//Instructions: We want to create a new note to edit the JSON. 
//We need to retrieve whats there already. readFile
//We want to update that data. 
//We saved or recreate the file writeFile
app.get('/api/notes', function(req, res) {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {    
    if (err) throw err;
    res.send(data);
  })
});

app.post('/api/notes', (req, res) => {
  console.log("Its working")
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    dbData = JSON.parse(data)
    const newNote = req.body
    newNote.id = uuidv4()
    dbData.push(newNote)  

  stringData = JSON.stringify(dbData);

  fs.writeFile('./db/db.json', stringData, (err, data) => {
    if (err) throw err;
    res.json(data)
  });
});
});



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  })