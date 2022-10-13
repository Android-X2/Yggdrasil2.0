const express = require('express')
const router = express.Router()
const passport = require('passport')

const leavesController = require('../controllers/leaves')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post('/addLeaves/:id', ensureAuth, leavesController.addLeaves)
router.delete('/deleteLeaves/:id',ensureAuth, leavesController.deleteleaves)
module.exports = router