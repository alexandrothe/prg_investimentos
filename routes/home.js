const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();



router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))



router.get('', (req, res) => {
    res.render('index.ejs')
})

router.post('/post', (req, res) => {
    console.log(req.body)
    res.redirect('/investimentos')
});


module.exports = router