const express = require('express')
const path = require('path')
const fs = require('fs')
const uid = require('uid')
const app = express()

let notes = require('./db/db.json')
const { dirname } = require('path')

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

// app.post for adding onto notes, check line 15 from server.js in 06-day-01
app.post('/api/notes', (req, res) => {
  const note = {
    id: uid.uid(),
    ...req.body
  }
  notes.push(note)
  res.json(notes)
})

// delete with ID?
app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(note => {
    note.id !== req.params.id
  })
})

// app.delete based on uid(?)

// listen on port 3k or defauly heroku port
app.listen(process.env.PORT || 3000, _ => {
  console.log('server running')
})
