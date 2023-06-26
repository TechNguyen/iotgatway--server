const loginRouter = require('./login')
function Route(app) {
    app.use('/api', loginRouter)
}
module.exports = Route