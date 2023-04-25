const express = require('express');
const investmentos = require('./routes/home');
const path = require('path')

const app = express();


app.use(express.static(path.join(__dirname,'public')))
app.use('/investimentos', investmentos)

app.set('view engine','ejs');


app.listen(4613, () => {
    console.log(`server running at http://127.0.0.1:4613 `);
});
