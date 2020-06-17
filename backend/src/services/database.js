const mysql = require('mysql');
const mysqlConfig = require('../config/mysql');
const connection = mysql.createConnection(mysqlConfig);

connection.connect();

module.exports = {
    create(cliente, motivo, valor, data, id_cliente){
        return new Promise((resolve, reject) =>{
            connection.query(`insert into dividas(id_dividas, cliente, motivo, valor, date, id_cliente) value (null, '${cliente}', '${motivo}', '${valor}', '${data}', '${id_cliente}')`, function(error, result, field){
                if(error) reject(error);
                resolve(result);
            })
        })
    },
    findById(id_cliente){
        return new Promise((resolve, reject) => {
            connection.query(`select * from dividas where id_cliente='${id_cliente}'`, function(error, result, field){
                if(error) reject(error);
                resolve(result);
            })
        })
    },
    deleteById(id_dividas){
        return new Promise((resolve, reject) =>{
            connection.query(`delete from dividas where id_dividas='${id_dividas}'`, function(error, result, fied){
                if(error) reject(error);
                resolve(result);
            })
        })
    },
    update(cliente, motivo, valor, date, id_dividas){
        return new Promise((resolve, reject) => {
            connection.query(`update dividas set cliente='${cliente}', motivo='${motivo}', valor='${valor}', date='${date}' where id_dividas='${id_dividas}'`, function(error, result, field){
                if(error) reject(error);
                resolve(result);
            })
        })
    },
    findDivida(id_dividas){
        return new Promise((resolve, reject) => {
            connection.query(`select * from dividas where id_dividas='${id_dividas}'`, function(error, result, field){
                if(error) reject(error);
                resolve(result);
            })
        })
    }
}