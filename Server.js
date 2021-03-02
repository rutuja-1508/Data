const express = require("express");
const mongoose = require("mongoose");
const winston = require("winston")

const app = express()

const bodyParser=require("body-parser")


app.use(bodyParser.urlencoded({extended: false}));

const movie_doc= require('./Data/data.json')
const server = require('./Data/server.json')
const db = require("./Data/db.json");
const { response } = require("express");


var logger = winston.createLogger({
  level:'debug',
  format:winston.format.json(),
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
logger.add(new winston.transports.Console({
  format: winston.format.simple(),
}));
}

try{
  mongoose.connect("mongodb://localhost//5000");
  logger.debug("Database Connection Successful")
} catch (err){
  logger.debug("Connection Failed")
  logger.error(err)
}
const  movieSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      
    },
    img:{
      type: String,
    
    
    },
    summary:{
      type: String, 
    
    },
    id:{
      type :Number,
    }
  
  },
  { timestamps: true }
);
var Movie = mongoose.model("Movie",movieSchema,"moviestore");


app.get('/display',(req,res)=>{
  try{
      Movie.find({},(err,movie_doc)=>{
          if(err){
              res.send(err)
          }
          else{
              if(movie_doc.length == 0){
                  res.json({message:"No Movies found"})
                  logger.debug("No Movies Found")
              }
              else{
                  res.json("Value found")
              }  
              
          }
      })
  } catch(err){
      res.json("value can not add")
      logger.debug(err)
  }
  
})
app.post('/insert',function(req,res){
    
  logger.log('incoming',req.query)

  if(res.json.Movie==null)
  {
      return res.status(400).send({message:"All fields are require"})
  }

})

app.post('/insert_one',(req,res)=>{
  try{
      response={
          "name":req.body.name,
          "img":req.body.img,
          "summary":req.body.summary,
          "id" : req.body.id
      }
      Movie.collection.insertOne(response,(err,movie_doc)=>{
          if(err){
              res.json("value can not add")
              logger.debug(err)
          }
          else{
              res.json("value added sucessfully")
              logger.debug("Value added")
          }
      })
  }
  catch{
    res.json("value can not add")
      logger.debug(err)
  }
})
app.put('/update', function (req, res) {
  var id = mongoose.Types.ObjectId();
  res.send(id)
    if(id){
    res.json("value update sucessfully")
    logger.debug("value delete")
  }
  else{
    res.json("value update sucessfullyd")
    logger.log("value update")
}
  })
  
app.delete('/delete', function (req, res) {
  var id = mongoose.Types.ObjectId();
  res.send(id)
    if(id){
    res.json("value delete sucessfully")
    logger.debug("value delete")
  }
  else{
    res.json("value added sucessfullyd")
    logger.log("value added")
}
  })
  


app.listen(5000,()=>{
  console.debug("Server running")
})

