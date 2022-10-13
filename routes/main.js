const express = require('express')
const router = express.Router()
const passport = require('passport')

const mainController = require("../controllers/main");
const branchController = require('../controllers/branch')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', mainController.getIndex)
router.get('/dashboard', ensureAuth, mainController.getDashboard)
router.get('/createBranch', ensureAuth, mainController.createBranchPage)
router.get('/allBranches', ensureAuth, mainController.allBranches)
router.get('/createLeaves/:id',ensureAuth, mainController.createLeavesPage)
router.get('/about', ensureAuth, mainController.getAboutPage)
module.exports= router