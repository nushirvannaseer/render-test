const router = require('express').Router()
const Course = require('../models/course')

router.get('/', async(req, res)=>{
    try{
        const courses = await Course.find();
        return res.status(200).send(courses)
    }
    catch(e){
        return res.status(500).send('An error occurred')
    }

})

router.post('/', async(req, res)=>{
    const body = req.body
    try{
        const course = new Course(body)
        const dbCourse = await course.save()
        return res.status(201).send(dbCourse)
    }
    catch(e){
        return res.status(500).send("An error occurred")
    }

})


module.exports = router