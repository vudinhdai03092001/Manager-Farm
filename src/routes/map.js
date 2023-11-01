const express = require('express')
const router = express.Router()
const MapController = require('../app/controllers/MapController')
router.use('/', MapController.index)

module.exports = router