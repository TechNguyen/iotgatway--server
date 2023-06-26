const Iot = require('../models/iot')
class IOT {
    async createIot(req,res) {
        try {
            const newiot = await Iot.create({})
        } catch(error) {
            res.status(403).json(error)
        }
    }

}


module.exports = new IOT()