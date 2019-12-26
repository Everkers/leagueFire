require('dotenv').config();
const express = require('express');
const champion = require('./src/controllers/champion');
const imageUpload = require('./src/controllers/imageUpload');
const imageDelete = require('./src/controllers/imageDelete');
const app = express();
const PORT = process.env.PORT;
app.use('/champion', champion);
app.use('/imageUpload', imageUpload);
app.use('/imageDelete', imageDelete);
app.listen(PORT, () =>
	console.log(`Server running at: http://localhost:${PORT}/`)
);
