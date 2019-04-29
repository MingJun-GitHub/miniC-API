'use strict';
const Service = require('egg').Service;

class DetailsService extends Service {
    constructor(ctx) {
        super(ctx)
        this.category = ''
    }
    async getDetailsById(id) {
        if (!id) {
            return null
        }
        await this.getCategory();
        var res = await this.app.mysql.get('details', {
            id
        })
        if (res) {
            res = await this.dealData(res)
        }
        return res
    }
    async getDetailsByName(name, page, page_size) {
        if (!name) {
            return null
        }
        page = Number(page || 1) - 1;
        page_size = Number(page_size || 30);
        const sql = `SELECT * FROM  details WHERE name LIKE '%${name}%' ORDER BY 'id' LIMIT ${page},${page_size}`;
        const totalsql = `SELECT COUNT(1) FROM  details WHERE name LIKE '%${name}%'`;
        await this.getCategory();
        const res = await this.app.mysql.query(sql);
        const total = await this.app.mysql.query(totalsql);
        res.map(async item => {
            item = await this.dealData(item)
        });
        return {
            page,
            page_size,
            list: res,
            total: total[0]['COUNT(1)'] // 返回总数
        }
    }
    async dealImgUrl(url) {
        if (!url) {
            return url
        } else {
            if (!/^http|https/.test(url)) {
                url = this.config.imgBase.baseUrl + url;
            }
            return url
        }
    }
    async dealData(res) {
        res.icon = await this.dealImgUrl(res.icon);
        res.qrcode = await this.dealImgUrl(res.qrcode);
        res.mp_qrcode = await this.dealImgUrl(res.mp_qrcode);
        res.screenshot = res.screenshot.split(',');
        res.tag = res.tag.split(',')
        res.tag.map(async (item, index) => {
            res.tag[index] = await this.findCategory(item)
        })
        res.screenshot.map(async (item, index) => {
            res.screenshot[index] = await this.dealImgUrl(item);
        })
        return res;
    }
    async getCategory() {
        if (!this.category) {
            const res = await this.app.mysql.select('category', {
                columns: ['tag_id', 'name'],
                orders: [
                    ['tag_id', 'desc']
                ],
                limit: 30,
                offset: 0
            })
            this.category = res
        }
    }
    findCategory(id) {
        var result = ''
        for (let i = 0; i < this.category.length; i++) {
            if (this.category[i].tag_id == id) {
                result = this.category[i]
                break
            }
        }
        return result
    }
}

module.exports = DetailsService;