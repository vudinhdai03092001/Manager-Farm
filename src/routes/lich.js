const express = require('express')
const router = express.Router()
const LichController = require('../app/controllers/LichController')

router.get('/', LichController.index)
router.get('/store', LichController.store)
router.get('/:id/edit',LichController.edit)
  
router.get('/listCalendars',LichController.list)
//update
router.put('/:id',LichController.update)

//delete
router.delete('/:id',LichController.delete)

// search
router.get('/search',LichController.search)

router.post('/', LichController.addWork)
module.exports = router