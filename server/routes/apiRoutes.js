const express = require('express');
const fragmentController = require('../controllers/fragmentController');
const layoutController = require('../controllers/layoutController');
const preferencesController = require('../controllers/preferencesController');
const publicApiController = require('../controllers/publicApiController');
const router = express.Router();
const passport = require('passport');

// fragments
const fragmentApiUrl = '/fragment/';
router.get(fragmentApiUrl, passport.authenticate('jwt', {session: false}), fragmentController.getAll);
router.get(fragmentApiUrl + ':fragmentId', passport.authenticate('jwt', {session: false}), fragmentController.get);
router.post(fragmentApiUrl, passport.authenticate('jwt', {session: false}), fragmentController.add);
router.patch(fragmentApiUrl + ':fragmentId', passport.authenticate('jwt', {session: false}), fragmentController.update);
router.delete(fragmentApiUrl + ':fragmentId', passport.authenticate('jwt', {session: false}), fragmentController.remove);
// layouts
const layoutApiUrl = '/layout/';
router.get(layoutApiUrl, passport.authenticate('jwt', {session: false}), layoutController.getAll);
router.get(layoutApiUrl + ':layoutId', passport.authenticate('jwt', {session: false}), layoutController.get);
router.post(layoutApiUrl, passport.authenticate('jwt', {session: false}), layoutController.add);
router.patch(layoutApiUrl + ':layoutId', passport.authenticate('jwt', {session: false}), layoutController.update);
router.delete(layoutApiUrl + ':layoutId', passport.authenticate('jwt', {session: false}), layoutController.remove);

// pages
const preferencesApiUrl = '/preferences/';
router.get(preferencesApiUrl, passport.authenticate('jwt', {session: false}), preferencesController.getAll);
router.get(preferencesApiUrl + ':fragmentId', passport.authenticate('jwt', {session: false}), preferencesController.get);
router.post(preferencesApiUrl, passport.authenticate('jwt', {session: false}), preferencesController.add);
router.patch(preferencesApiUrl + ':fragmentId', passport.authenticate('jwt', {session: false}), preferencesController.update);
router.delete(preferencesApiUrl + ':fragmentId', passport.authenticate('jwt', {session: false}), preferencesController.remove);

//output api for tailor
router.get('/p/layouts', publicApiController.getDataForTenant());

module.exports = router;