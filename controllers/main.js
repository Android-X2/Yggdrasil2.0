const Branch= require('../models/Branch')
const Leaves = require('../models/Leaves')
const User = require('../models/User');
const validUrl = require('valid-url')

module.exports = {
getIndex: (req, res) => {
    res.render("login.ejs");
  },
getDashboard: async (req,res) =>{
    try {
      const user=req.user
      const image = user.image
      console.log(user.image)
      const branch = await Branch.find({user:user._id}).lean()
      const leaves = await Leaves.find().sort({createdAt:'asc'}).lean();
      res.render('dashboard.ejs', {branches:branch, leaves:leaves, user:req.user, image:image })
    } catch (err) {
      console.log(err)
      res.render('error/500')
    }
    
  },
createBranchPage: async(req,res) => { //changes routes to getBranch
    const user= await req.user
    const branch = await Branch.find({user:user._id}).lean()
    const leaves = await Leaves.find().sort({createdAt:'asc'}).lean();
    res.render('createBranch.ejs',{branches:branch, leaves:leaves, user:req.user})
  },
allBranches: async(req,res)=>{
  const user= await req.user
  const branch = await Branch.find({user:user._id}).lean()
  const leaves = await Leaves.find().sort({createdAt:'asc'}).lean();
  res.render('allBranches.ejs',{branches:branch, leaves:leaves, user:req.user})
},
createLeavesPage: async(req,res)=>{
  const user= await req.user
  const branch = await Branch.findById(req.params.id)
  const leaves = await Leaves.find().sort({createdAt:'asc'}).lean()
  res.render('createLeaves.ejs',{branches:branch,leaves:leaves,user:user})
},
getAboutPage: async(req,res)=>{
  const user= await req.user
  res.render('about.ejs',{user:user})
}
}