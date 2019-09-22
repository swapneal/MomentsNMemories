const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({
  msg: "User in mnm works!"
}));

module.exports = router;