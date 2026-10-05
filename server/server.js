import express from 'express';
import cors from 'cors';

const app = express();

// mengkoneksikan frontend dengan backend
app.use(cors());

// menggunakan middleware untuk parsing JSON
app.use(express.json());


// test
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});