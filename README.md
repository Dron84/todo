### Всем Привет
Change server/.env db path

По пути server/.env нужно ввести ваши данные подключения к БД

    MONGODB_PATH = 'mongodb://localhost:27017/todolist'
    SERVER_PORT = 3000
    
after start a mongo db

после нужно запустить mongoDb коммандой ниже
    
    mkdir db && mongod --dbpath ./db 

if you just clone the project run command bellow

если толко сделали копию себе то запустите команду ниже

    cd client && npm i && cd ../server && npm i && cd .. && npm run build --prefix client && npm run start --prefix server

если уже запкскали 
    
    npm run start --prefix server
