const fs = require('node:fs');
const path = require('node:path');


const girls = [
    {name: 'Olena', age: 39, gender: 'female'},
    {name: 'Anna', age: 34, gender: 'female'},
    {name: 'Ludmila', age: 60, gender: 'female'},
    {name: 'Sergiy', age: 38, gender: 'male'},
    {name: 'Oleksandr', age: 60, gender: 'male'},
];
const boys = [
    {name: 'Petro', age: 64, gender: 'male'},
    {name: 'Slavik', age: 41, gender: 'male'},
    {name: 'Evgeniy', age: 9, gender: 'male'},
    {name: 'Darina', age: 10, gender: 'female'},
    {name: 'Nadiya', age: 61, gender: 'female'},
];


function createDirectoryStudents() {
    return new Promise((resolve, reject) => {
         fs.mkdir(path.join(__dirname, 'students'), (err) => {
            if (err) {
                console.log(err);
            } else {
                resolve ('#1. create directory students')
            }
        });
    })
}

function createFolderBoys() {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(__dirname, 'students', 'boys'), (err) => {
            if (err) {
                console.log(err);
                reject('errors boys')
            } else {
                boys.forEach(boy => {
                    fs.appendFile(path.join(__dirname, 'students', 'boys', `${boy.name}.json`),
                        `${JSON.stringify(boy)}`, (err) => {
                            if (err) {
                                console.log(err);
                                throw err;
                            } else {
                               resolve('#2. create folders boys');
                            }
                        });
                        
                });
            }
        })
    });
}

function createFolderGirls() {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(__dirname, 'students', 'girls'), (err) => {
            if (err) {
                console.log(err);
                reject('errors girls')
            }else {
                girls.forEach(girl => {
                    fs.appendFile(path.join(__dirname, 'students', 'girls', `${girl.name}.json`),
                        `${JSON.stringify(girl)}`, (err) => {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                            resolve('#3. create folders girls');
                        });
                });
            }
        })
    })
}


const sortStudent = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(path.join(__dirname, 'students', 'boys'), {withFileTypes: true}, (err, files) => {
            if (err) {
                console.log(err);
                throw err;
            }else {
                for (let file of files){
                    if(file.isFile){
                        fs.readFile(path.join(__dirname, 'students', 'boys', `${file.name}`), (err, data) =>{
                            const gender = JSON.parse(data.toString()).gender
                            if(gender === 'female'){
                                fs.rename(path.join(__dirname, 'students', 'boys', `${file.name}`), path.join(__dirname, 'students', 'girls', `${file.name}`), (err, data)=>{
                                    if (err) {
                                        console.log(err);
                                        throw err;
                                    }else {
                                        resolve('#4 . girls to girls')
                                    }
                                })
                            }
                        })
                    }
                }
            }
            
        })

        fs.readdir(path.join(__dirname, 'students', 'girls'), {withFileTypes: true}, (err, files) => {
            if (err) {
                console.log(err);
                throw err;
            }else {
                for (let file of files){
                    if(file.isFile){
                        fs.readFile(path.join(__dirname, 'students', 'girls', `${file.name}`), (err, data) =>{
                            const gender = JSON.parse(data.toString()).gender
                            if(gender === 'male'){
                                fs.rename(path.join(__dirname, 'students', 'girls', `${file.name}`), path.join(__dirname, 'students', 'boys', `${file.name}`), (err, data)=>{
                                    if (err) {
                                        console.log(err);
                                        throw err;
                                    }else {
                                        resolve('#4 . boys to boys and girls to girs')
                                    }
                                })
                            }
                        })
                    }
                }
            }

        })
    })
}

async function start() {
   const students =  await createDirectoryStudents();
   const boys = await createFolderBoys();
   const girls = await createFolderGirls();
   const sort = await sortStudent();

    console.log(students);
    console.log(boys);
    console.log(girls);
    console.log(sort);
}

start()



