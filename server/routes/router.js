const express = require('express')
const route = express.Router()
const axios = require('axios')
const controller = require('../controller/controller');

route.get('/',(req,res) =>{
    axios.get('http://localhost:3000/api/task').then(response =>{
      //  console.log(response)
        res.render('index',{tasks:response.data})
    }).catch(err => console.log(err))
  //  res.render('index',{tasks: 'new tasks'})
})
route.get('/add',(req,res) =>{
    res.render('add_task')
})
route.get('/update',(req,res) =>{
    axios.get('http://localhost:3000/api/task',{params:{id:req.query.id}}).then(result =>{
        res.render('update_task',{tasks:result.data})
    }).catch(err=>{
        console.log(err)
    })

})

route.post('/api/task',controller.create)
route.get('/api/task',controller.find)
route.put('/api/task/:id',controller.update)
// route.patch('/api/task/:id',controller.update)
route.delete('/api/task/:id',controller.delete)




module.exports = route