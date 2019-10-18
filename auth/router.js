const { Router } = require('express')
const { toJWT, toData } = require('./jwt')

const router = new Router()

// define endpoints here
router.post('/login', (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).send({ message: 'Please give me some credentials, stranger' })
    }

    return res.send({
        jwt: toJWT({ userId: 1 })
    })
})

router.get('/secret-endpoint', (req, res) => {
    console.log('WHAT IS REQ.HEADERS.AUTHORIZATIOn', req.headers.authorization)
    // do we have req.headers.authorization && if so: split the header on a space
    const auth = req.headers.authorization && req.headers.authorization.split(' ')
    console.log('SPLIT:', auth)

    // is auth something && is the first element a string "Bearer" && do we have a token
    if (auth && auth[0] === 'Bearer' && auth[1]) {
      // verify the token and get me the information inside (toData(auth[1]))
      const data = toData(auth[1])
      res.send({
        message: 'Thanks for visiting the secret endpoint.',
        data
      })
    }
    else {
      res.status(401).send({
        message: 'Please supply some valid credentials'
      })
    }
})



module.exports = router