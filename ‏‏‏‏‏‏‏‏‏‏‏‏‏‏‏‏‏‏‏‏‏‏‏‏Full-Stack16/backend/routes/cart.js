const router = require('express').Router();


router.post("/updateCartInDB", async (req, res) => {
    console.log('Axios POST body: ', req.body);  
  
    res.json(req.body);
    console.log("A update cart request was received");
  })


module.exports = router;