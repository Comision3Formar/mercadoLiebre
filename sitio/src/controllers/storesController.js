const db = require('../database/models')

const bcrypt =require('bcrypt');

module.exports = {
    register:function(req,res){
      req.session.destroy();
      res.render('storeRegister',{
        title:"Registro de Tienda",
        css:"register.css"
      })
    },
    processRegister: (req,res) => {
      db.Users.create({
        nombre:req.body.nombre.trim(),
        apellido:req.body.apellido.trim(),
        email:req.body.email.trim(),
        password:bcrypt.hashSync(req.body.pass.trim(),10),
        avatar:(req.files[0])?req.files[0].filename:"store.png",
        rol:"store"
    })
    .then(user => {
        console.log(user)
        db.Stores.create({
          nombre:req.body.nameStore.trim(),
          logo:(req.files[0])?req.files[0].filename:"store.png",
          id_usuario:user.id
        })
        .then(result => {
            console.log(result)
            return res.redirect('/users/login')
        })
        .catch(errores => {
          res.send(errores)
        })
    })
    .catch(errores => {
      res.send(errores)
    })
     
  },
  list:function(req,res){
    db.Stores.findAll({
      include:[{association: "responsable"}]
    }
    )
    .then(tiendas => {
      res.send(tiendas)
    })
    .catch(err => {
      res.send(err)
    })
  }
}
