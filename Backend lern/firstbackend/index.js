import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! and abhishek here');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});
app.post('/submit', (req, res) => {
  res.send('Form Submitted');
});
app.put('/update', (req, res) => {
  res.send('Update Successful');
});
app.delete('/delete', (req, res) => {
  res.send('Delete Successful');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});