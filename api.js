require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const API_ENDPOINT = 'https://api.mistral.ai/v1/chat/completions';
const API_KEY = process.env.MISTRAL_API_KEY;

app.post('/query', async (req, res) => {
    const question = req.body.question;
    try {
        const response = await axios.post(API_ENDPOINT, {
            model: "mistral-tiny",
            messages: [{ role: "user", content: question }],
            temperature: 0.7,
            top_p: 1,
            max_tokens: 1000
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const result = response.data.choices[0].message.content.trim();
        res.json({ answer: result });
    } catch (error) {
        console.error('Error calling Mistral API:', error);
        console.error(error);
        res.status(500).json({ error: 'An error occurred while querying Mistral AI.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});