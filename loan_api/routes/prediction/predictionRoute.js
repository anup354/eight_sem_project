const { Router } = require('express')
const router = Router();
const predictcontroller = require("../../controller/prediction/predictionController");
const { authMiddleware } = require("../../middleware/auth");

router.post('/api/predict',authMiddleware, predictcontroller.prediction)
router.get('/api/predictuser',authMiddleware, predictcontroller.getbyiduserid)
router.get('/api/predict', predictcontroller.getprediction)
router.get('/api/predict/:id', predictcontroller.getbyidprediction)
router.delete('/api/predict/:id', predictcontroller.deletePrediction)

module.exports = router;
