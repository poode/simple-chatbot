const express = require('express');

const { validateLangHeader } = require('./middelware/validationMiddleware');
const languageSchema = require('./langSechema');
const qaCategories = require('./questionBase/qa_categories.json');
const qaPairs = require('./questionBase/qa_pairs.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Chatbot Server is running.' });
});


app.get('/categories', validateLangHeader(languageSchema), (req, res) => {
    const lang = req.header('accept-language');
    res.json({ categories: qaCategories[lang] });
});

app.get('/questions/category/:category', validateLangHeader(languageSchema), (req, res) => {
    const lang = req.header('accept-language');
    const category = req.params.category;
    res.json({ questions: qaPairs[lang][category] });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}


module.exports = app;
