import express from 'express';

const router = express.Router();

router.get('/profiles', (req, res) => {
  res.status(200).json({
    data: {
        name: "John Doe",
       age: 20
      }
      
  });
});

export default router;
