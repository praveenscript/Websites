const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 5500;
const cors = require('cors');



// app.use(cors(
//     {
//         origin: ["http://127.0.0.1:5500", "http://localhost:5500"]
//     }
// ));

app.use(cors()); // Allow all origins


app.use(bodyparser.json());

app.post('/save-user', (req, res) => {
    const {username, password}  = req.body;
    console.log("hello")
    // simulate saving to json

    const UserData = {
        username: username,
        password: password
    };

    fs.readFile('users.json', "utf8", (err, data) => {
        console.log("we are inside the file data")
        const users = JSON.parse(data);
        existing_users = users.some(user => user.username == UserData.username);


        if (err && err.code === 'ENOENT') { 
            return fs.writeFile('users.json', JSON.stringify([UserData], null, 2), err => {
                if (err) throw err;
                res.json({ message: 'User saved successfully!' });
            });
        } else if (err) { 
            throw err;
        } else if (existing_users) {
            console.log('user name already exists')
            res.json({ message: 'user already exist'})
        } else {
            console.log("saving data")
            // creating a condition to see if user is already available or not
            // const users = JSON.parse(data);
            // try{
            //     existing_users = users.some(user => user.username == UserData.username);
            //     console.log(existing_users)
            //     console.log(UserData.username)
            // }
            // catch(error){
            //     console.log(error)

            // }
            // existing_users = users.some(user => user.username == UserData.username);
            // console.log(existing_users)
            users.push(UserData);
            fs.writeFile('users.json', JSON.stringify(users, null, 2), err => {
                if (err) throw err;
                res.json({ message: 'User saved successfully!' });
                console.log("message saved successfully");
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


