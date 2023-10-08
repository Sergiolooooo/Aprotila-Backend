const express=require('express');
const morgan = require('morgan');
require('dotenv').config();
const MongoDBConection=require('../database/mongo');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
class Server{
constructor(){
   this.app=express();
   this.port=process.env.PORT;
   this.usersPath='/api/users'
   this.LoginPath='/api/auth'
   this.entryalevinesPath='/api/entryalevines'
   this.mortalityPath='/api/mortality'
   this.ProviderPath='/api/provider'
   this.PilaPath='/api/Pila'
   this.TraceabilityPath='/api/Traceability'
   this.SamplingPath='/api/Sampling'
   this.SuppliesFishPath='/api/SuppliesFish'
   this.ProductsPath='/api/Products'
   this.SalesPath='/api/Sales'
   this.saleProductPath='/api/saleProduct'
   this.wasteSalePath='/api/wasteSale'
   //invocamos nuestros metodos
   this.middleWares();
   this.routes();
   this.MongoDBConect();
}


listen(){
    this.app.listen(this.port,()=>{
        console.log(`El servidor esta corriendo en el puerto ${this.port}`);
    });
}


routes(){
this.app.use(cors());
this.app.use(this.usersPath,require('../routes/users'));
this.app.use(this.LoginPath,require('../routes/auth'));
this.app.use(this.entryalevinesPath,require('../routes/entryalevines'));
this.app.use(this.ProviderPath,require('../routes/provider'));
this.app.use(this.mortalityPath,require('../routes/mortality'));
this.app.use(this.PilaPath,require('../routes/mantePila'));
this.app.use(this.SuppliesFishPath,require('../routes/suppliesFish'));
this.app.use(this.ProductsPath,require('../routes/products'));
this.app.use(this.TraceabilityPath,require('../routes/traceability'));
this.app.use(this.SamplingPath,require('../routes/sampling'));
this.app.use(this.SalesPath,require('../routes/sales'));
this.app.use(this.saleProductPath,require('../routes/saleProduct'));
this.app.use(this.wasteSalePath,require('../routes/wasteSale'));
console.log(listEndpoints(this.app,{ extended: true}));
}

middleWares(){
    this.app.use(express.json());
    this.app.use(express.static('public'))
    this.app.use(morgan('dev'));
}

MongoDBConect(){
    MongoDBConection();
}

}

module.exports=Server;