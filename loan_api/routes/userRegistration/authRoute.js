const { Router } = require('express')
const router = Router();
const authcontroller = require("../../controller/userRegistration/authController");
const { authMiddleware } = require("../../middleware/auth");

router.post('/api/register', authcontroller.register)
router.post('/api/login', authcontroller.login)
router.post('/api/feedback',authMiddleware, authcontroller.addmessage)
module.exports = router;
