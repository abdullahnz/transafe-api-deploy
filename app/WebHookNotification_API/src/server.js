import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json())

app.post('/notification/handling', async (req, res) => {
   const result = await axios.post('http://localhost:1337/api/v1/transaction/paymentship/webhookHandling', req.body)

   return res.status(200).json(req.body)
});

app.listen(9933, () => {
   console.info(`Server running on port 9933`);
})

