require('dotenv').config();
const express = require('express');
const champion = require('./src/controllers/champion');
const app = express();
const PORT = process.env.PORT;
app.use('/champion', champion);
app.listen(PORT, () =>
	console.log(`Server running at: http://localhost:${PORT}/`)
);
