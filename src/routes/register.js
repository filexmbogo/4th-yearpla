const { Router } =require ("express")
const router= Router()
const express=require('express')



router.use(express.urlencoded({ extended: true }));
router.get('/register',(req,res)=>{
res.render('register',{})
})

router.post('/register',(req,res)=>{
    res.redirect('/')
    console.log(req.body);
    
    })

module.exports=router