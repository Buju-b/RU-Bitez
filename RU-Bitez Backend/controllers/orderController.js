app.post("/stk", (req,res) => {
    const phone = req.body.phone;
    const amount = req.body .amount;

    res.json({phone, amount});
} );