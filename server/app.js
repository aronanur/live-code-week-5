const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const errorHandling = require('./helper/errorHandling')
const routes = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)
app.use(errorHandling)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

