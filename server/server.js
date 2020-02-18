const
    express = require('express'),
    bp = require('body-parser'),
    app = express(),
    todolistSchema = require('./model/todolist');

app.use(express.json())  //заставляем использовать json
app.use(bp.urlencoded({extended: false})) //парси тело запроса
app.use((req, res, next) => {
    // добавления CROS на все запросы
    res.append('Access-Control-Allow-Origin', ['*']); //All site/address allow
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD'); // That's methods we allowed
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
app.use('/', express.static('../client/dist/')) // ренедрим клиентскую часть

app.get('/todolist', async (req,res)=>{
    //получаем список туду листа
    try{
        const list = await todolistSchema.find({}).exec()
        res.status(200).json(list)
    }catch (e) {
        res.status(500).json({message: `Error on server. Like: ${e.message}`})
    }
})
app.put('/todolist', async (req,res)=>{
    //добавляем таск в туду лист
    try{
        const todo = await new todolistSchema(req.body)
        todo.save()
        res.status(200).json(todo)
    }catch (e) {
        res.status(500).json({message: `Error on server. Like: ${e.message}`})
    }

})
app.delete('/todolist/:id', async (req,res)=>{
    //Удаление таска
    try{
        const id = req.params.id
        const del = await todolistSchema.deleteOne({_id:id}).exec()
        res.status(200).json(del)
    }catch(e){
        res.status(500).json({message: `Error on server. Like: ${e.message}`})
    }
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server start on ${process.env.SERVER_PORT} port`)
})