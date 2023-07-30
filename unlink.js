const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

module.exports = {
    fileUnlinkPromise(file){
        return new Promise((resolve,reject) =>{

            fs.unlink(file,(err)=>{
                
                if(err)
                    reject(err);
                else 
                resolve(true);
            })
        
        })
        }
}
