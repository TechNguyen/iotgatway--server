const express = require('express')
const route = express.Router();
const multer = require('multer')

const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, './public/Firmwares/');
      },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' + file.originalname);
      }
})
const upload = multer({storage: storage})  
const FirmWares = require('../app/controller/firmware')

route.get('/', FirmWares.getAllFirmware)
route.post('/create', FirmWares.createOneFirmware)
route.post('/update', FirmWares.updateFirmware)
route.post('/delete', FirmWares.deleteOneFirmware)
route.post('/deletes', FirmWares.deleteManyFirmware)

route.post('/upload', upload.single('file'), FirmWares.uploadFile)


module.exports = route