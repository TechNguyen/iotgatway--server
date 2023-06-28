const loginRouter = require('./login')
const devicesRouter = require('./device')
const firmwaresRouter = require('./firmware')
const applicasRouter = require('./application')
function Route(app) {
    app.use('/api', loginRouter)
    app.use('/api/devices', devicesRouter)
    app.use('/api/firmwares', firmwaresRouter)
    app.use('/api/applications', applicasRouter)
}
module.exports = Route