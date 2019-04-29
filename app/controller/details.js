'use strict';

const Controller = require('egg').Controller;
class DetailsController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    ctx.validate({
      id: {
        type: 'string',
        required: true
      }
    }, ctx.query)
    const {
      id
    } = ctx.query;
    const data = await this.service.details.getDetailsById(id)
    ctx.status = 200;
    this.ctx.body = {
      code: data ? 10000 : 10001,
      data,
      msg: data ? 'success' : 'error'
    }
  }
  async search() {
    const {
      ctx
    } = this;
    try {
      ctx.validate({
        name: {
          type: 'string',
          require: true
        },
        page: {
          type: 'string',
          require: true
        },
        page_size: {
          type: 'string',
          require: true
        }
      }, ctx.query);
    } catch (e) {
      ctx.status = 200
      ctx.body = {
        code: 10000,
        msg: e.errors
      }
      return
    }
    const {
      name,
      page,
      page_size
    } = ctx.query;
    console.log('name', name, page, page_size)
    const data = await this.service.details.getDetailsByName(name, page, page_size)
    ctx.status = 200
    this.ctx.body = {
      code: 10000,
      data,
      msg: ''
    }
  }
}

module.exports = DetailsController;