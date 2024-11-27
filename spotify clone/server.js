const client_id = 'bd3f42fc46184dd4860e6ae28ff76274'
const express = require('express');
const axios = require('axios');
const port = 5500;
const cors = require('cors');
const querystring = require('querystring');
require('dotenv').config();

const app = express();


redirect_uri = 'http://127.0.0.1:5500/spotify%20clone/index.html';

app.use(cors());

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  // Usage
  const randomString = generateRandomString(16);
  console.log(randomString); // Example output: 'A1bC2dE3fG4hI5jK'
  


app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?'+
        querystring.stringify(
            {
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }
        )
    )

})

app.get("/callback", (req, res) => {
    const code = req.query.code || null;

    if (!code) {
        res.send('no authorization code provided');
        return
    }
    try{
        const tokenResponse = await.axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirect_uri,
            client_id: client_id,
            client_secret: process.env.client_sec

        }), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = tokenResponse.data.access_token;

        res.send(`Access Token: ${accessToken}`);
    
    } catch (error) {
        res.send('error exchanging authorization code')
    };
    
});



app.listen(port, () => { console.log(`Server is running on http://localhost:${port}`); });