import express from 'express';
import log from './middleware/log.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', log, (req, res) => {
  try {
    res.status(200).send('GET request to the homepage');
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.post('/add', log, (req, res) => {
  try {
    const data = req.body;
    res.status(201).send({ message: 'POST request to /add', data });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.put('/update/:id', log, (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    res.status(200).send({ message: `PUT request to update ID: ${id}`, data });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.delete('/delete/:id', log, (req, res) => {
  try {
    const { id } = req.params;
    res.status(204).send({ message: `DELETE request for ID: ${id}` });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}/`);
});
