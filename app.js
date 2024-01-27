const express=require('express')
const app= express();
const router=require('./routes/route')
const db=require('./data/database')
const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(router)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.get('/',(req,res)=>{
    res.redirect('index')
})
db.connectToDatabase().then(function (){
    app.listen(3000,()=>{
        console.log('Server is Running')
    })
})
