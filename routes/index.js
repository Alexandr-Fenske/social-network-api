const express = require('express')
const multer = require('multer')
const { UserController } = require('../controllers')

const router = express.Router()

// Показываем, где хранить файлы

const uploadDestination = 'uploads'

const storage = multer.diskStorage({
    destination: uploadDestination,
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploads = multer({storage: storage})

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/current', UserController.current)
router.get('/user/:id', UserController.getUserById)
router.put('/user/:id', UserController.updateUser)

module.exports = router