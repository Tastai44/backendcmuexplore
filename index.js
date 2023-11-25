const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const querystring = require("querystring");

app.use(cors());

app.use(express.json());

app.post('/getToken/:code', async (req, res) => {
    try {
        const codeFromURL = req.params.code;
        const requestData = {
            code: codeFromURL,
            redirect_uri: 'https://www.cmuexplore.com/callback',
            client_id: 'k2SKRhQpzCFf3km9URaCHwbz1Y3fkMdpT5ZFwbhS',
            client_secret: 'ncWsn6T7kX9SFt601sV3rHdZzty8xRQSHurEKWm4',
            grant_type: 'authorization_code',
        };

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const response = await axios.post(
            'https://oauth.cmu.ac.th/v1/GetToken.aspx',
            querystring.stringify(requestData),
            { headers }
        );

        console.log('Response:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(8080, () => {
    console.log("Server started at port 8080");
});
