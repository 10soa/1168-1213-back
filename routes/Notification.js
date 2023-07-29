const express = require( 'express');
const router = express.Router();

const notification = require('../Controlleur/NotificationControlleur');

router.get('/allNotification', notification.getAllNotifications);

module.exports = router;