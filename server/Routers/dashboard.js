const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.corporativo;
  res.render('corporativo_home', { user });
});

module.exports = router;
