import express from 'express';
const app = express();
const PORT = 3000;


let Names=['Alice', 'Bob', 'Charlie', 'Diana'];
app.get('/api/Name', (req, res) => {
    res.json(Names);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});