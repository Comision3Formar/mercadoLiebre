module.exports = (sequelize,dataTypes) => {

    let alias = "Users";

    let cols = {
        id : {
            type : dataTypes.INTEGER(11),
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        nombre : {
            type : dataTypes.STRING(45),
            allowNull : false,
        },
        apellido : {
            type : dataTypes.STRING(45),
            allowNull : false,
        },
        email : {
            type : dataTypes.STRING(45),
            allowNull : false,
        },
        password : {
            type : dataTypes.STRING(100),
            allowNull : false,
        },
        avatar : {
            type : dataTypes.STRING(45),
            allowNull : false,
        },
        rol : {
            type : dataTypes.STRING(45),
            allowNull : false,
        },
        direccion : {
            type : dataTypes.STRING(100),
        },
        ciudad : {
            type : dataTypes.STRING(45),
        },
        provincia : {
            type : dataTypes.STRING(45),
        },
        fecha : {
            type : dataTypes.DATEONLY,
        }
    }

    let config = {
        tableName : "users",
        timestamps : true,
        underscored : true
    }

    const User = sequelize.define(alias,cols,config);

    User.associate = function(models){
        
        User.hasOne(models.Stores,{ //un usuario tiene una tienda (1:1)
            as:"tienda",
            foreignKey:"id_usuario"
        })

        User.belongsToMany(models.Products,{ //un usuario tiene muchos productos (N:M)
            as : 'productos',
            through : 'carts',
            foreignKey : 'id_usuario',
            otherKey : 'id_producto',
            timestamps : false
        })
    }

    return User;
}