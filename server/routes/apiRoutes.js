const express = require('express');
const fragmentController = require('../controllers/fragmentController');
const pageController = require('../controllers/pageController');
const tenantController = require('../controllers/tenantController');
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
// children
const layoutApiUrl = '/page/';
router.get(layoutApiUrl, passport.authenticate('jwt', {session: false}), pageController.getAll);
router.get(layoutApiUrl + ':pageId', passport.authenticate('jwt', {session: false}), pageController.get);
router.post(layoutApiUrl, passport.authenticate('jwt', {session: false}), pageController.add);
router.patch(layoutApiUrl + ':pageId', passport.authenticate('jwt', {session: false}), pageController.update);
router.delete(layoutApiUrl + ':pageId', passport.authenticate('jwt', {session: false}), pageController.remove);
// tenants
const tenantApiUrl = '/tenant/';
router.get(tenantApiUrl, passport.authenticate('jwt', {session: false}), tenantController.getAll);
router.get(tenantApiUrl + ':tenantId', passport.authenticate('jwt', {session: false}), tenantController.get);
router.post(tenantApiUrl, passport.authenticate('jwt', {session: false}), tenantController.add);
router.patch(tenantApiUrl + ':tenantId', passport.authenticate('jwt', {session: false}), tenantController.update);
router.delete(tenantApiUrl + ':tenantId', passport.authenticate('jwt', {session: false}), tenantController.remove);

// children
const preferencesApiUrl = '/preferences/';
router.get(preferencesApiUrl, passport.authenticate('jwt', {session: false}), preferencesController.getAll);
router.get(preferencesApiUrl + ':preferredId', passport.authenticate('jwt', {session: false}), preferencesController.get);
router.post(preferencesApiUrl, passport.authenticate('jwt', {session: false}), preferencesController.add);
router.patch(preferencesApiUrl + ':preferredId', passport.authenticate('jwt', {session: false}), preferencesController.update);
router.delete(preferencesApiUrl + ':preferredId', passport.authenticate('jwt', {session: false}), preferencesController.remove);

//output api for tailor
router.get('/p/layouts/:tenant', publicApiController.getDataForTenant);

module.exports = router;