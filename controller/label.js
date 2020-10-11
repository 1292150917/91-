
let express = require('express');
let router = express.Router();
let serviceLabel = require('../service/label')
serviceLabel = new serviceLabel()

/**
 * @api {post} /label/add label新增
 * @apiDescription ""
*/
router.post('/add', async function (req, res, next) {
    let data = await serviceLabel.add(req,res)
    res.send(data)
});

/**
 * @api {post} /label/query label查询
 * @apiDescription ""
*/
router.post('/query', async function (req, res, next) {
    let data = await serviceLabel.query(req,res)
    res.send(data)
});

/**
 * @api {post} /label/queryList label所有数据
 * @apiDescription ""
*/
router.post('/queryList', async function (req, res, next) {
    let data = await serviceLabel.queryList(req,res)
    res.send(data)
});

/**
 * @api {post} /label/update label更新
 * @apiDescription ""
*/
router.post('/update', async function (req, res, next) {
    let data = await serviceLabel.update(req,res)
    res.send(data)
});

/**
 * @api {post} /label/delete label删除数据-慎用delete语法
 * @apiDescription ""
*/
router.post('/delete', async function (req, res, next) {
    let data = await serviceLabel.delete(req,res)
    res.send(data)
});
module.exports = router
    