//Config inicial
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// const Person = require('./models/Person');


//forma de ler json/middlewares

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rotas da API
const personRoutes = require('./routes/personRoutes');
app.use('/people', personRoutes); //Quando a rota /people fopr acessada o express vai usar os métodos definitos em personRoutes


//Rota inicial
app.get('/', (req, res)=>{
    return res.json({
        message: "Chamaaaa!"
    })
})

//Entregar uma porta 
const DB_USER= process.env.DB_USER;
const DB_PASSWORD= encodeURIComponent(process.env.DB_PASSWORD);
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.se6wf.mongodb.net/showcasedb?retryWrites=true&w=majority`)
.then(()=>{
    console.log("Conectamos ao mongo");
    app.listen(3000);
})
.catch((err)=>console.log(err))

//ag7wyvCcidSLXq1Q
//mongodb+srv://vagnerecomp:<password>@apicluster.se6wf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority