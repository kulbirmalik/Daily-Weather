const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../publi')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Daily Weather',
        name: 'Kulbir Malik'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About The Application',
        name: 'Kulbir Malik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'For any help and queries ',
        title: 'Need Some Help',
        name: 'Kulbir Malik'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'Please provide a address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please provide with a search option'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Kulbir Malik',
        errorMessage:'Help article not found'
    })

})

app.get('*',(req,res)=>{
        res.render('404',{
            title:'404',
            name:'Kulbir Malik',
            errorMessage:'Page not found'
        })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})