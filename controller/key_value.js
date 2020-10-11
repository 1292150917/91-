
let express = require('express');
let router = express.Router();
let serviceKey_value = require('../service/key_value')
serviceKey_value = new serviceKey_value()

/**
 * @api {post} /key_value/add key_value新增
 * @apiDescription ""
*/
router.post('/add', async function (req, res, next) {
    let data = await serviceKey_value.add(req,res)
    res.send(data)
});

/**
 * @api {post} /key_value/query key_value查询
 * @apiDescription ""
*/
router.post('/query', async function (req, res, next) {
    let data = await serviceKey_value.query(req,res)
    res.send(data)
});

/**
 * @api {post} /key_value/queryList key_value所有数据
 * @apiDescription ""
*/
router.post('/queryList', async function (req, res, next) {
    let data = await serviceKey_value.queryList(req,res)
    res.send(data)
});

/**
 * @api {post} /key_value/update key_value更新
 * @apiDescription ""
*/
router.post('/update', async function (req, res, next) {
    let data = await serviceKey_value.update(req,res)
    res.send(data)
});

/**
 * @api {post} /key_value/delete key_value删除数据-慎用delete语法
 * @apiDescription ""
*/
router.post('/delete', async function (req, res, next) {
    let data = await serviceKey_value.delete(req,res)
    res.send(data)
});
module.exports = router
    