const Branch= require('../models/Branch')
const Leaves = require('../models/Leaves')
const User = require('../models/User')
const validUrl = require('valid-url')

module.exports = {
    addBranch: async (req,res) =>{
        try {
            if(req.body.title.length<30){
            await Branch.create({
                title:req.body.title,
                user:req.user.id,
            })
        }
            res.redirect(req.get('referer'))
        } catch (err) {
            console.log(err)
        }
    },
    deleteBranch: async (req,res)=>{
        try{
          let branch = await Branch.findById({_id:req.params.id})
          let leaves = await Leaves.find({group:req.params.id})
          await Branch.remove({_id:req.params.id})
          await Leaves.remove({branch:req.params.id})
          res.redirect(req.get('referer'))
        }catch(err){
            console.log(err)
            // res.render('error/500')
        }
      },

}