'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/', controller.index.index);
  router.get('/details', controller.details.index)
  router.get('/search', controller.details.search)
};