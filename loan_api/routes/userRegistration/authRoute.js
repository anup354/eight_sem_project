const { Router } = require('express')
const router = Router();
const authcontroller = require("../../controller/userRegistration/authController");
const { authMiddleware } = require("../../middleware/auth");

router.post('/api/register', authcontroller.register)
router.post('/api/login', authcontroller.login)
module.exports = router;
