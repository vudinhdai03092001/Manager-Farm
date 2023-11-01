const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkSchema = new Schema(
    {      
        title: { type: String },
        start: { type: String },
        end: { type: String },
        //   createdAt:{typeof:Date,default:Date.now},
        //   updateAt:{typeof:Date,default:Date.now}
    },
);

module.exports = mongoose.model('works', WorkSchema);