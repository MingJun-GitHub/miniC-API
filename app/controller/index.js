'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index() {
        await this.ctx.render('index.html', {
            title: '活动首页'
        })
    }
}

module.exports = IndexController;