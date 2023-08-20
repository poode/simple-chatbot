const request = require('supertest');
const app = require('../server');


describe('Chatbot Server Test', () => {
    test('GET / should respond with status 200 and a message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Chatbot Server is running.');
    });

    test('GET /categories should respond with status 200 and categories', async () => {
        const response = await request(app).get('/categories').set('Accept-Language', 'en');
        expect(response.statusCode).toBe(200);
        expect(response.body.categories).toEqual(["General", "Support", "Products"]);
    });

    test('GET /questions/:category should respond with status 200 and questions', async () => {
        const response = await request(app).get('/questions/category/General').set('Accept-Language', 'en');
        expect(response.statusCode).toBe(200);
        expect(response.body.questions).toEqual({
            "What's your name?": "I am a bot.",
            "How are you?": "I'm just a bot, but thanks for asking!"
        });
    });

    afterAll(done => {
        done();
    });
});
