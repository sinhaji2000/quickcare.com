const express = require('express');
const port = 3001 ;
const homeRotes = require('./routes/homeRoutes') ;

const app = express() ;

app.use(homeRotes)


app.listen(port , () =>{
    console.log(`Server is running on port ${port}`) ;
})