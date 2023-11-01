const express = require('express')
const router = express.Router()
const UserController = require('../app/controllers/UserController')
//render login
router.get('/login', UserController.index)

//render register
router.get('/register', UserController.renderRegister)

router.post('/register',UserController.register)

router.post('/', UserController.login, (req, res) => {
    res.redirect('/')
})
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/login')
})
module.exports = router