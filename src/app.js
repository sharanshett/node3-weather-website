const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather Page',
    name: 'sharan'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'sharan'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
     return res.send({
       error: 'You must provide address'
     })
  }
  geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        })
    })
  })
  // console.log(req.query.address)
  // res.send({
  //   address: [],
  //   location: req.query.address
  // })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'this one is new help ppppp',
    title: 'Help Page',
    name: 'sharan'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMassage: 'Help article not found',
    title: '404',
    name: 'Sharan'
  })
})

// to match random route
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'sharan',
    errorMassage: 'Page not found'
  })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})
