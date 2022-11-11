const fs = require('node:fs/promises');
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

const createAndSortStudents = async (pathMain, array, readFolder, writeFolder, gender) => {
    try {
        await fs.mkdir(path.join(__dirname, pathMain), {recursive: true});
        await fs.mkdir(path.join(__dirname, pathMain, readFolder));

        for (const student of array) {
            await fs.appendFile(path.join(__dirname, pathMain, readFolder, `${student.name}.json`), JSON.stringify(student));
        }

        const files = await fs.readdir(path.join(__dirname, pathMain, readFolder));

        for (const file of files) {
            const data = await fs.readFile(path.join(__dirname, pathMain, readFolder, file));
            const studentInfo = await JSON.parse(data);

            if (studentInfo.gender === gender) {
                await fs.rename(path.join(__dirname, pathMain, readFolder, file),path.join(__dirname, pathMain, writeFolder, file))
            }
        }
    } catch (err) {
        console.log(err);
    }
}

createAndSortStudents('students', boys, 'boys', 'girls', 'female');
createAndSortStudents('students', girls, 'girls', 'boys', 'male');