const Branch= require('../models/Branch')
const Leaves = require('../models/Leaves')
const User = require('../models/User')
const validUrl = require('valid-url')

module.exports = {
    addLeaves: async (req,res) =>{
        try {
            if(validUrl.isUri(req.body.link)&& req.body.title.length<=23){
            await Leaves.create({
                title:req.body.title,
                link:req.body.link,
                branch:req.params.id
            })
        }
            
            res.redirect(req.get('referer'))
        } catch (err) {
            console.log(err)
            res.render('error/500')
        }
    },
    deleteleaves: async (req,res)=>{
        try{
          let leaves = await Leaves.find({_id:req.params.id})
          await Leaves.deleteOne({_id:req.params.id})
          res.redirect(req.get('referer'))
        }catch(err){
            console.log(err)
            res.render('error/500')
        }
      },


}