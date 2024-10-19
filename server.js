const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files from "public" directory
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
    apiKey: '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'
}));

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
