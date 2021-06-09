const express = require('express')
const path = require('path')
const fs = require('fs')
const uid = require('uid')
const app = express()

let notes = require('./db/db.json')
// const { dirname } = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// get for notes data
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// get for notes html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

// *** potentially make this save to db.json yeah.
// app.post for adding onto notes,
app.post('/api/notes', (req, res) => {
  const note = {
    id: uid.uid(),
    ...req.body
  }
  notes.push(note)

  // write file to add to db.json
  fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), err => {
    if (err) {
      console.log(err)
    }
    console.log('file written')
  })

  res.json(notes)
})

// delete with ID?
app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(note =>
    note.id !== req.params.id
  )

  // write file to db.json
  fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), err => {
    if (err) {
      console.log(err)
    }
    console.log('file written')
  })

  res.json(notes)
})

// listen on port 3k or default heroku port
app.listen(process.env.PORT || 3000, _ => {
  console.log('server running')
})
