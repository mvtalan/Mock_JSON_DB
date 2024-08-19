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
        res.status(500).json("Internal server error.");

    }
}

//function for updating user
async function updateUser(req, res) {
    try {
        const data = await readData();
        const user = data.users.find(user => user.id === parseInt(req.params.id));

        if(user) {
            user.userName = req.body.new_username || user.userName;
            user.first_name = req.body.new_first_name || user.first_name;
            user.email = req.body.new_email || user.email;

            await writeData(data);

            // res.redirect('/');
            res.send("User updated succesfully.");

        } else {
            res.status(404).send("User not found.");
        }

    } catch (err) {
        res.status(500).json("Internal server error.");
    }
}

async function deleteUser(req, res) {
    try {
        const data = await readData();
        const userIndex = data.users.findIndex(user => user.id === parseInt(req.params.id));

        if(userIndex !== -1) {
            data.users.splice(userIndex, 1);
            await writeData(data);

            res.send("User deleted succesfully.");

        } else {
            res.status(404).send('User not found.')
        }

        res.redirect('/');
        // data.users.splice(user, 1);
        // await writeData(data);

        // res.send("User deleted succesfully.");

    } catch (err) {
        res.status(500).json("Internal server error.");
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser
}