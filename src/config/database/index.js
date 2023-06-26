const mongoose = require('mongoose')
async function connect() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }catch(error) {
        alert(error);
        process.exit(1);
    }
}


module.exports = {connect}