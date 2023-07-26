const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.static('build'))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/revamp.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})