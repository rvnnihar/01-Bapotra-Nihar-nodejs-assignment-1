const mysql = require("mysql");

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'emoloyee_db'
});
  
connection.connect((err)=> {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);


});

function getData(){
    return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `tbl_employee`', function (error, results, fields) {
                if(error){
                    reject(error)
                }
                else{
                    resolve(results)
                }
        })
    })

}

connection.query("INSERT INTO `tbl_employee`(`emp_name`, `emp_email`) VALUES ('nihar','nihar@gmail.com')",(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("data inserted : id="+data.insertId)
    }
    getData().then((data)=>{
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    });
})
