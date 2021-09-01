require('dotenv').config()
const app = require('express')()
const server = require('http').createServer(app)
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const expression = require('./expression')

const PORT = process.env.PORT


app.post('/expression', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Method', '*')
    res.setHeader('Content-Type', 'application/json')
    const data = req.body

    if (!data ||
        !data.term_count ||
        !data.min ||
        !data.max ||
        !data.formula ||
        !data.isBigger) {
        res.send({
            'status': false,
            'error': 'no-such-data'
        })
        res.end()
        return;
    }

    const Expression = expression(data.formula, data.term_count, data.min, data.max, data.isBigger)

    res.send({
        'status': true,
        'expression': Expression
    })
})

app.get('/expression', (req, res) => {
    res.end('Hello world!')
})

server.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
})