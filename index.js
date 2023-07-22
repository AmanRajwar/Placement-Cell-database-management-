 /*imports*/
const express =require('express');
const db =require('./config/mongoose')
const port =1000;

const app = express();



app.set('view engine','ejs');
app.set('views','./views')



app.use('/',require('./routes'))
app.listen(port,function(err){
    if(err){
        console.log("server is not working --->",err)
    }

    console.log('server is up and running on port = ',port);
})




