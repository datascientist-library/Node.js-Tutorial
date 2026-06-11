// npm init -y
// npm install swagger-ui-express swagger-jsdoc

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0'
        }
    },
    apis: ['./server.js']
};

const swaggerSpec = swaggerJsDoc(options);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Success
 */
app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'John' }
    ]);
});

app.use('/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Visit
// http://localhost:3000/api-docs

// Response:

// [
//   { "id": 1, "name": "John" }
// ]