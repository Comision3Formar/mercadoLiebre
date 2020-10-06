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

    return Store;

}