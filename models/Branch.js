const mongoose = require('mongoose')

const BranchSchema = new mongoose.Schema({
    title:{ 
        type:String,
        required:true,
        trime: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    notes:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model('Branch', BranchSchema)