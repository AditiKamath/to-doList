var Task = require('../models/model')


// POST req
exports.create = (req, res, next) => {
        // validate request
        if(!req.body){
            res.status(400).send({ message : "Content can not be empty!"});
            return;
        }
        console.log(req.body)
        const task = new Task(req.body)
        task.save()
        .then(data => {
     //       res.send(data)
            res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// GET REQ (SINGLE AND QUERY TEST)
exports.find = (req, res, next) => {
    
    if(req.query.id){
        const id = req.query.id;

        Task.findOne({_id:id})
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else{
        Task.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retrieving user information" })
            })
    }
}
    

 // PUT
exports.update = (req, res, next) => {
    console.log('i am in put request')
    console.log(req.body)
    console.log('still in put request')
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
   const id = req.params.id;
   console.log(id)
    Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        Task.findOne({_id:id}).then(result=>{
            console.log('inside first then block ')
            console.log(result)
            res.send(result)
    
        }).catch(err =>{
            console.log(err)
        })
        
        console.log('inside second then block ')
    })
    .catch(err =>{
        res.status(500).send({ message : "Error Update user information"})
    })

}
//delete
exports.delete = (req, res, next) => {
    const id = req.params.id;

    Task.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Task was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete task with id=" + id
            });
        });

}