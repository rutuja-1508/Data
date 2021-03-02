const  winston = require("winston");


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

module.exports = mongoose.model("movie", movieSchema);


