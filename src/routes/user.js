const express = require('express')
const router = express.Router()
const UserController = require('../app/controllers/UserController')
//render login
router.get('/login', UserController.index)

//render register
router.get('/register', UserController.renderRegister)
// post register
router.post('/register', UserController.register)

//post login
router.post('/', UserController.login, (req, res) => {
    res.redirect('/')
})

// render form change passwword
router.get('/changepass', UserController.renderchangepass)
// change password
router.post('/changepass', UserController.changepass)

// render form forgetpass
router.get('/forgot', UserController.showforgot)


// check email 
router.post('/forgot', UserController.forgot)

// form resetpass
router.get('/reset',UserController.showReset)

// post reset pass
 
router.post('/reset',UserController.resetPass)

//log out
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/login')
})
module.exports = router