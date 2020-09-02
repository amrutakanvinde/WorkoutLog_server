require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-log', 'postgres', process.env.DB_PASS,{
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to eorkout log postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;