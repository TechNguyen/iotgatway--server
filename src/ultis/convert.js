module.exports = {
    multitoObject: (toobj) => {
        return toobj.map(mongoose => mongoose.toObject());
    },
    mongoosetoObject: (mongoose) => {
        return mongoose ? mongoose.toObject() : mongoose 
    }
}