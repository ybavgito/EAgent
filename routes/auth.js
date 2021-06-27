const express = require('express')
const passport = require('passport')
const router = express.Router()

//Login     Auth with google
//route:GET /aut/google
router.get('/google',passport.authenticate('google' , {scope: ['profile','email'] }))


//Dashboard     Google auth callback
//route:GET /auth/google/callback
router.get('/google/callback',passport.authenticate('google',{ failureRedirect:'/'}),(req,res)=>{
    res.redirect('/dashboard')
})


//Logout 
///auth/logout
router.get('/logout' , (req,res)=>{
    req.logout()
    res.redirect('/')
})
module.exports = router