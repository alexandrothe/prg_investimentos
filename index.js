const express = require('express');
const investmentos = require('./routes/home');
const path = require('path')

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/app', investmentos);

app.set('view engine','ejs');


app.listen(3000, () => {
    console.log(`server running at http://127.0.0.1:3000 `);
});
