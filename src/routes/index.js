
const HomeRouter = require('./home')
const LichRouter = require('./lich')
const MapRouter = require('./map')
const UserRouter = require('./user')
function route(app) {
    app.use('/lich', LichRouter)
    app.use('/user', UserRouter)
    app.use('/map', MapRouter)
    app.use('/', HomeRouter)

}

module.exports = route;