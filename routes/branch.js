const express = require('express')
const router = express.Router()
const passport = require('passport')

const branchController = require('../controllers/branch')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post('/addBranch', ensureAuth, branchController.addBranch)
router.delete('/deleteBranch/:id', ensureAuth, branchController.deleteBranch)
module.exports = router