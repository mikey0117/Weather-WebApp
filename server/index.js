const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 4000

const app = express()

app.use(cors())

// Routes
app.use('/geo', require('./routes/geo.js'))
app.use('/georev', require('./routes/georev.js'))
app.use('/weather', require('./routes/weather.js'))
app.use('/airquality', require('./routes/airquality.js'))
app.use('/places', require('./routes/places.js'))
app.use('/events', require('./routes/events.js'))
app.use('/alerts', require('./routes/alerts.js'))
app.use('/parklist', require('./routes/parklist.js'))
app.use('/nps', require('./routes/nps.js'))
app.use('/google', require('./routes/google.js'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
