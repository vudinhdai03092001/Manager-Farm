const mongoose = require('mongoose');
async function connect(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Farm-Manager',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("connect sussessfully")
    } catch (error) {
        console.log("connect  error")
    }
   
}
module.exports ={connect}