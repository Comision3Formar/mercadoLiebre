module.exports = (sequelize,dataTypes) => {
    let alias = "Products";

    let cols = {
        id : {
            type : dataTypes.INTEGER(11),
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        nombre: {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        precio : {
            type : dataTypes.DECIMAL(5, 2).UNSIGNED,
            allowNull : false
        },
        descuento : {
            type: dataTypes.INTEGER(11),
            allowNull : false
        },
        descripcion : {
            type : dataTypes.STRING(300),
            allowNull : false
        },
        imagenes : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        id_categoria : {
            type : dataTypes.INTEGER(11)
        },
        id_tienda : {
            type : dataTypes.INTEGER(11)
        }
    }

    let config = {
        tableName : "products",
        timestamps : true,
        underscored : true
    }

    const Product = sequelize.define(alias,cols,config);

    return Product;
}