const loginRouter = require('./login')
function Route(app) {
    app.use('/', loginRouter)
}
module.exports = Route