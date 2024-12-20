const router = require('express').Router();
const userRoutes = require('./userRoutes');
const renderRoutes = require('./renderRoutes');

// Mount user API routes
router.use('/', userRoutes);

// Mount render/view routes 
router.use('/', renderRoutes);

module.exports = router;