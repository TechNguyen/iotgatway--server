const loginRouter = require('./login')
const devicesRouter = require('./device')
const firmwaresRouter = require('./firmware')
const applicasRouter = require('./application')
const check = require('./checkversion')
function Route(app) {
    app.use('/v1/api/device', check) 
    app.use('/api', loginRouter)
    app.use('/api/devices', devicesRouter)
    app.use('/api/firmwares', firmwaresRouter)
    app.use('/api/applications', applicasRouter)
}
module.exports = Route