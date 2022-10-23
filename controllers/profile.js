const Branch= require('../models/Branch')
const Leaves = require('../models/Leaves')
const User = require('../models/User');
const validUrl = require('valid-url');

module.exports = {
getProfile: async(req,res)=>{
  const branch = await Branch.find({user:req.params.id}).lean();
  const leaves = await Leaves.find().sort({createdAt:'asc'}).lean();
  const user = await User.findById(req.params.id).lean()
  try {
    res.render('./profile/profile',{branches:branch, leaves:leaves,user:user})
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
},
getAllBranches: async(req,res) => {
    const user = await User.findById(req.params.id).lean()
    const branch = await Branch.find({user:req.params.id}).lean();
    const leaves = await Leaves.find().sort({createdAt:'asc'}).lean();
  try {
    
    res.render('./profile/allBranches',{branches:branch, leaves:leaves, user:user})
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
},
getBranch:async(req,res) => {
    const branch = await Branch.findById(req.params.id)
    const leaves = await Leaves.find({branch:req.params.id}).sort({createdAt:'asc'}).lean();
    const user = await User.findById(branch.user.toString()).lean()
  try {
    res.render('./profile/branch',{branches:branch, leaves:leaves,user:user})
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
},
getAbout: (req,res)=>{
  res.render('./profile/aboutProfile')
}
}