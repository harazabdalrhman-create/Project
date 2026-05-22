const router = require('express').Router()
const adminController = require('../controller/admin')



router.get("/admin",adminController.getadminDash );



module.exports = router;