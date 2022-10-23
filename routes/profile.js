const express = require('express')
const router = express.Router()
const passport = require('passport')

const profileController = require("../controllers/profile")

router.get('/:id',profileController.getProfile)
router.get('/branches/:id', profileController.getAllBranches)
router.get('/branch/:id', profileController.getBranch)
router.get('/about',profileController.getAbout)
module.exports= router