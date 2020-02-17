require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_PATH, {useUnifiedTopology: true, useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (err) => {
    console.warn(err)
})
db.once('open', () => {
    console.log('Connnected to DB')
})
const list = new mongoose.Schema({
    done: {type: Boolean, default: false},
    name: {type: String, required: true}
})
const todolist = new mongoose.Schema(
{
    name: {type: String, required: true},
    color: {type: String},
    list: [list],
    done: {type: Boolean, default: false}
})
module.exports = mongoose.model('todolist', todolist)

