'use strict';

async function formconnection() {
  try {
    var express = require('express');
    var mysql = require('mysql');
    const Sequelize = require('sequelize');
    var app = express();
    app.use(express.json());
    const PORT = process.env.PORT || 3000;
    const connection = new Sequelize('mydb1', 'root', '', {
      host: '127.0.0.1',
      port:  '3307',
      dialect: 'mysql',
    });
    connection
      .authenticate()
      .then(() => {
      console.log('Connection is successfull');
      })
      .catch(err => {
        console.error('connection failed', err);
        constatus=0;
    });
    return connection; 
  }
  catch(error) {
      return error;
  }
}

async function readall(connection) {
    const Sequelize = require('sequelize');
    const user = connection.define('user', {
        id: {
                 type: Sequelize.INTEGER,
                 autoIncrement: true,
                 primaryKey: true,
             },
     
             name: {
                 type: Sequelize.STRING
             }
     }, {
       freezeTableName: true,
     });

      const users = await user.findAll();
      console.log("All users:", JSON.stringify(users, null, 2))
        let response = {
            statusCode: 200,
            body: JSON.stringify(users)
            }
            return response;
  }

  module.exports.all = async (event) => {
    const Sequelize = require('sequelize');
    let connection = await formconnection();
    let response = await readall(connection);
    return response; 
  }
