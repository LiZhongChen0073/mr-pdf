import express from 'express';

var rootRouter = express.Router();

/* GET home page. */
rootRouter.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
export default rootRouter

// module.exports = router;
