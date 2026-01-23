import express from 'express';
const app = express();
const PORT = 3000;

// app.get('/',(req,res) => {
//     res.send('Hello World! say hii to Abhi');
// });

app.get('/jokes',(req,res) => {
  const jukes=[{
    id:1,
    joke:"Why don't scientists trust atoms? Because they make up everything!"
  },{
    id:2,
    joke:"Why did the math book look sad? Because it had too many problems."
  },{
    id:3,
    joke:"Why did the scarecrow win an award? Because he was outstanding in his field!"
  }];
  res.send(jukes);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});