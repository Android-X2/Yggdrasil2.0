const Branch= require('../models/Branch')
const Leaves = require('../models/Leaves')
const User = require('../models/User');
const validUrl = require('valid-url');

module.exports = {
getProfile: async(req,res)=>{
  const branch = await Branch.find({user:req.params.id}).lean();
  const leaves = await Leaves.find().sort({createdAt:'asc'}).lean();
  const user = await User.findById(req.params.id).lean()
  console.log(req.params.id)
  try {
    res.render('./profile/profile',{branches:branch, leaves:leaves,user:user})
  } catch (err) {
    console.log(err)
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
  }
},
getBranch:async(req,res) => {
    console.log(req.params.id)
    const branch = await Branch.findById(req.params.id)
    const leaves = await Leaves.find({branch:req.params.id}).sort({createdAt:'asc'}).lean();
    const user = await User.findById(branch.user.toString()).lean()
    console.log(user)
  try {
    res.render('./profile/branch',{branches:branch, leaves:leaves,user:user})
  } catch (err) {
    console.log(err)
    
  }
}
}