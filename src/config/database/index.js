const mongoose = require('mongoose')
async function connect() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://localhost:27017/Iot__server', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }catch(error) {
        alert(error);
        process.exit(1);
    }
}


module.exports = {connect}