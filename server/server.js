const
    express = require('express'),
    bp = require('body-parser'),
    app = express(),
    todolistSchema = require('./model/todolist');

app.use(express.json())
app.use(bp.urlencoded({extended: false}))
app.use('/', express.static('../client/dist/'))
app.get('/todolist', async (req,res)=>{
    try{
        const list = await todolistSchema.find({}).exec()
        res.status(200).json(list)
    }catch (e) {
        res.status(500).json({message: `Error on server. Like: ${e.message}`})
    }
})
app.post('/todolist', async (req,res)=>{
    const todo = new todolistSchema({})
    console.log('req.body',req.body)
    res.status(200).json(list)
})
app.listen(process.env.SERVER_PORT, () => {
    console.log(`server start on ${process.env.SERVER_PORT} port`)
})