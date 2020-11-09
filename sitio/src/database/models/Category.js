module.exports = (sequelize,dataTypes) => {
    let alias = "Categories";

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
        imagen : {
            type : dataTypes.STRING(45),
            allowNull : false
        }
    }

    let config = {
        tableName: "categories",
        timestamps: false
    }

    const Category = sequelize.define(alias,cols,config);

    Category.associate = function(models){ 

        Category.hasMany(models.Products,{ //una categoria tiene muchos productos (1:M)
            as : "productos",
            foreignKey : "id_categoria"
        })
    }

    return Category

}