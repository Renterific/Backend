const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:123@cluster0.d6onv.mongodb.net/tasks?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false }).
then(()=>{
    console.log('success connection')
}).catch((error)=>{
    console.log('error connection')
})
mongoose.set('useFindAndModify', false);
module.exports = mongoose