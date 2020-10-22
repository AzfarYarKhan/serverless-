'use strict';

async function formconnection() {
  try {
    var express = require('express');
    var mysql = require('mysql');
    const Sequelize = require('sequelize');
    var app = express();
    app.use(express.json());
    const PORT = process.env.PORT || 3000;
    const connection = new Sequelize('mydb1', 'root', 'karoly123@', {
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

async function create(connection,name) {
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

     

      const userr = await user.create({name: name});
      console.log("created successfully:", JSON.stringify(userr, null, 2))
      let response = {
            statusCode: 200,
            body: JSON.stringify(userr)
        };
             return response;
           
  }

  module.exports.add = async (event) => {
    const Sequelize = require('sequelize');
    let connection = await formconnection();
    let data = JSON.parse(event.body);
    let response = await create(connection,data.name);
    return response; 
  }
