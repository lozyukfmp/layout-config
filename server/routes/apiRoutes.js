const express = require('express');
const fragmentController = require('../controllers/fragmentController');
const pageController = require('../controllers/pagesController');
const tenantController = require('../controllers/tenantController');
const publicApiController = require('../controllers/publicApiController');
const router = express.Router();
const passport = require('passport');

// fragments
const fragmentsApiUrl = '/fragments/';
router.get(fragmentsApiUrl, passport.authenticate('jwt', {session: false}), fragmentController.getAll);
router.get(fragmentsApiUrl + ':fragmentId', passport.authenticate('jwt', {session: false}), fragmentController.get);
router.post(fragmentsApiUrl, passport.authenticate('jwt', {session: false}), fragmentController.add);
router.patch(fragmentsApiUrl + ':fragmentId', passport.authenticate('jwt', {session: false}), fragmentController.update);
router.delete(fragmentsApiUrl + ':fragmentId', passport.authenticate('jwt', {session: false}), fragmentController.remove);
// pages
const pageApiUrl = '/page/';
router.get(pageApiUrl, passport.authenticate('jwt', {session: false}), pageController.getAll);
router.get(pageApiUrl + ':layoutId', passport.authenticate('jwt', {session: false}), pageController.get);
router.post(pageApiUrl, passport.authenticate('jwt', {session: false}), pageController.add);
router.patch(pageApiUrl + ':layoutId', passport.authenticate('jwt', {session: false}), pageController.update);
router.delete(pageApiUrl + ':layoutId', passport.authenticate('jwt', {session: false}), pageController.remove);
// tenants
const tenantApiUrl = '/tenant/';
router.get(tenantApiUrl, passport.authenticate('jwt', {session: false}), tenantController.getAll);
router.get(tenantApiUrl + ':tenantId', passport.authenticate('jwt', {session: false}), tenantController.get);
router.post(tenantApiUrl, passport.authenticate('jwt', {session: false}), tenantController.add);
router.patch(tenantApiUrl + ':tenantId', passport.authenticate('jwt', {session: false}), tenantController.update);
router.delete(tenantApiUrl + ':tenantId', passport.authenticate('jwt', {session: false}), tenantController.remove);

//output api for tailor
router.get('/p/layouts/:tenant', publicApiController.getDataForTenant);

module.exports = router;