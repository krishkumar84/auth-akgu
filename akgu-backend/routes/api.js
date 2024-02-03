const router = require('express').Router()
const adminController = require('../controllers/admin')
const authorization = require('../middlewares/authorization')

router.get('/faculty',  adminController.getFaculty)

router.post('/faculty', adminController.postFaculty)

router.patch('/faculty', adminController.updateFaculty)

router.delete('/faculty/:id', adminController.deleteFaculty)

router.get('/society',  adminController.getSociety)

router.post('/society', adminController.postSociety)

router.patch('/society', adminController.updateSociety)

router.delete('/society/:id', adminController.deleteSociety)

router.get('/achievement',  adminController.getAchievement)

router.post('/achievement', adminController.postAchievement)

router.patch('/achievement', adminController.updateAchievement)

router.delete('/achievement/:id', adminController.deleteAchievement)

router.post('/upload', adminController.upload)

module.exports = router