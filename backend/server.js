const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 5500;
const cors = require('cors');



app.use(cors(
    {
        origin: "http://127.0.0.1:5500"
    }
));

app.use(bodyparser.json());

app.post('/save-user', (req, res) => {
    const {username, password}  = req.body;
    console.log("hello")
    // simulate saving to json

    const UserData = {
        username: username,
        password: password
    };

    fs.readFile('users.json', (err, data) => {
        if (err && err.code === 'ENOENT') {
            return fs.writeFile('users.json', JSON.stringify([UserData], null, 2), err => {
                if (err) throw err;
                res.json({ message: 'User saved successfully!' });
            });
        } else if (err) {
            throw err;
        } else {
            const users = JSON.parse(data);
            users.push(UserData);
            fs.writeFile('users.json', JSON.stringify(users, null, 2), err => {
                if (err) throw err;
                res.json({ message: 'User saved successfully!' });
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


