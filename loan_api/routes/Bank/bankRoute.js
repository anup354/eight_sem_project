const { Router } = require('express')
const router = Router();
const bankController = require("../../controller/Bank/bankController");
const { authMiddleware } = require("../../middleware/auth");
const { upload } = require("../../middleware/fileupload")


router.post('/api/bank', bankController.addBank)
router.get('/api/bank', bankController.getBank)
router.get('/api/bankbyid/:bank_id', bankController.getByIdBank)
router.put('/api/bank/:bank_id', upload.single('image'), bankController.updateBank)
router.delete('/api/bank/:bank_id', bankController.deleteBank)

module.exports = router;
