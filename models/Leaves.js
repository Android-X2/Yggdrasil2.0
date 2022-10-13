const mongoose = require('mongoose')

const LeavesSchema = new mongoose.Schema({
    title:{ 
        type:String,
        required:true,
        trime: true
    },
    link:{
        type:String,
        required:true,
        trime:true
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group',
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Leaves', LeavesSchema)