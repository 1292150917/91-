
let express = require('express');
let router = express.Router();
let serviceGoods = require('../service/goods')
serviceGoods = new serviceGoods()

/**
 * @api {post} /goods/add goods新增
 * @apiDescription ""
*/
router.post('/add', async function (req, res, next) {
    let data = await serviceGoods.add(req,res)
    res.send(data)
});

/**
 * @api {post} /goods/query goods查询
 * @apiDescription ""
*/
router.post('/query', async function (req, res, next) {
    let data = await serviceGoods.query(req,res)
    res.send(data)
});

/**
 * @api {post} /goods/queryList goods所有数据
 * @apiDescription ""
*/
router.post('/queryList', async function (req, res, next) {
    let data = await serviceGoods.queryList(req,res)
    res.send(data)
});

/**
 * @api {post} /goods/update goods更新
 * @apiDescription ""
*/
router.post('/update', async function (req, res, next) {
    let data = await serviceGoods.update(req,res)
    res.send(data)
});

/**
 * @api {post} /goods/delete goods删除数据-慎用delete语法
 * @apiDescription ""
*/
router.post('/delete', async function (req, res, next) {
    let data = await serviceGoods.delete(req,res)
    res.send(data)
});
module.exports = router
    