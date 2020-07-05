var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userenrolledforevent = new Schema(
    {
        userid:{
            type:String
          },
          username:{
              type:String
          },
          email:{
              type:String
          },
          phone:{
            type:String
        },
          eventid:{
              type:String
          },
          eventname :{
            type:String
        },
          fees:{
            type:String
        },
        about:{
            type:String
          },
          location:{
            type:String
          },
          date:{
            type:String
          },
          link:{
            type:String
          },  
          category:{
            type:String
        },
       
        lastdate:{
            type:String
        },
        imagelink:{
            type:String
          },  
        
    }
);

mongoose.model('Userenrolledforevent', userenrolledforevent);
