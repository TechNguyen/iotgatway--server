const express = require('express')
const route = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({  
      destination: (req, file, cb) => {
        cb(null, './public/Firmwares/');
      },
      filename : (req, file, cb) => {
        const cusTomFilename = req.body.name
        const id = req.body.ID
        const originalname = file.originalname
        const extension = originalname.split('.').pop();
        const newCustomerFile = `${id}-${cusTomFilename}.${extension}`
        cb(null, newCustomerFile);
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