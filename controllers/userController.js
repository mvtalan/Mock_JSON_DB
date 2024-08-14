const fs = require('fs').promises;
const filePath = './database.json';
const { readData, writeData } = require('../utils/file');

//route handler controller function
async function createUser(req, res) {
    try {
        // console.log(req.body);

        const data = await readData();
        const lastUser = data.users[data.users.length - 1 ];
        const nextId = lastUser ? lastUser.id + 1 : 1;

        const newUser = {
            id : nextId,
            userName : req.body.username,
            first_name : req.body.first_name,
            email : req.body.email
        }

        console.log(newUser);

        data.users.push(newUser);
        await writeData(data);

        res.send("User added successfully.");

    } catch(err) {
        res.send("Internal server error.");

    }
}

module.exports = {
    createUser
}