const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files from "public" directory
app.use(bodyParser.json());



app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: userMessage,
            max_tokens: 150,
            temperature: 0.7
        });

        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: 'Sorry, there was an error processing your request.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
