'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index() {
        await this.ctx.render('index.html', {
            title: '活动首页'
        })
    }
    /*
    async detals() {
        await this.ctx.render('details', {
            title: '详情页'
        })
    }
    */
}

module.exports = IndexController;