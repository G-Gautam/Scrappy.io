const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const gmapsController = require('../controllers/gmaps.controller');


// a simple test url to check that all of our files are communicating correctly.
module.exports = router;

// router.get('/allusers', user_controller.GetAll);
// router.get('/:password/:username', user_controller.Get);
router.get('/all', gmapsController.GetAll);
router.post('', gmapsController.Add);
// router.post('/create', product_controller.product_create);
// router.get('/:id', product_controller.product_details);
// router.put('/:id', product_controller.product_update);
// router.delete('/:id', product_controller.product_delete);