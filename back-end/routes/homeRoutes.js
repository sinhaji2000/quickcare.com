const express = require('express');

const router = express.Router();

router.get('/', (req, res) => { 
    res.send({
        message: 'Welcome to the home page',
        status: 200
    })
}
);

module.exports = router;