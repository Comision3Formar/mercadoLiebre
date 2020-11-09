module.exports = (sequelize,dataTypes) => {
    let alias = "Stores";

    let cols = {
        id : {
            type : dataTypes.INTEGER(11),
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        nombre : {
            type : dataTypes.STRING(45),
            allowNull : false
        },
        logo : {
            type : dataTypes.STRING(45),
            allowNull : false
        },
        id_usuario : {
            type : dataTypes.INTEGER(11)
        }
    }

    let config = {
        tableName : "stores",
        timestamps : true,
        underscored : true
    }

    const Store = sequelize.define(alias,cols,config);

    Store.associate = function(models){

        Store.belongsTo(models.Users,{ //una tienda le pertenece a un responsable (1:1)
            as : 'responsable',
            foreignKey : 'id_usuario'
        })

        Store.hasMany(models.Products,{ //una tienda tiene muchos productos (1:N)
            as : 'productos',
            foreignKey : 'id_tienda'
        })
    }

    return Store;

}