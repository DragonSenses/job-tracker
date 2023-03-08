import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello');
})

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));