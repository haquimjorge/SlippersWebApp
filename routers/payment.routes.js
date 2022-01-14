import { Router } from "express";


const router = Router();

router.get("/create-order", (req, res) => {
    res.send("payment");
});

router.get('/execute-order', (req, res) => {
    res.send('payment Successful');
})
router.get('/execute-order', (req, res) => {
    res.send('Cancel Order');
})

export default router;