const { toData } = require('./jwt')

const authMiddleWare = (req, res, next) => {
    const auth = req.headers.authorization && req.headers.authorization.split(' ')
    console.log('SPLIT:', auth)

    // is auth something && is the first element a string "Bearer" && do we have a token
    if (auth && auth[0] === 'Bearer' && auth[1]) {
      // verify the token and get me the information inside (toData(auth[1]))
      const data = toData(auth[1])
    //   res.send({
    //     message: 'Thanks for visiting the secret endpoint.',
    //     data
    //   })
      next()
    }
    else {
      res.status(401).send({
        message: 'Please supply some valid credentials'
      })
    }
}

module.exports = authMiddleWare