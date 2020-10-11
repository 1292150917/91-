
var model = require('../models/index')
class Service{
    constructor(){
    }
	 emptyData(msg){
		Object.keys(msg).map(s => {
			if (msg[s] === '' || msg[s] === undefined) {
				delete msg[s]
			}
		})
		return msg
	}
    verify(test, val) {
        for (var item in test) {
            if (!val[test[item].name]) {
                return test[item].name + "为空"
                break;
            }
        }
    }
    // 新增数据
    async add(req,res){
        var data = {}
        try {
                // 生成验证规则 name验证字段 test为正则 空验证匹配空数据
                var testList = []
                var verification = this.verify(testList,req.body)
                if(!verification){
                    var msg = { 
                        name:req.body.name,
                        mobile:req.body.mobile,
                        integral:req.body.integral,
                        gold:req.body.gold,
                        vip:req.body.vip,
                        fans:req.body.fans,
                        collect:req.body.collect,
                        focused:req.body.focused,
                        isdelete:req.body.isdelete,
                        createtime:req.body.createtime,
                        updatetime:req.body.updatetime,
                        remack:req.body.remack,
                        QQ:req.body.QQ,
                        download:req.body.download,
                        emit:req.body.emit,
                        registerCode:req.body.registerCode,
                        password:req.body.password 
                    }
                    
                    msg = this.emptyData(msg)
                    msg.del_flag="N"
                    await model.user_info.create(msg).then((s) => {
                        data = {
                            status: 200,
                            data: s[0]
                        }
                    })
                }else{
                    data = {
                        status: 201,
                        data: verification
                    }
                }
        } catch (error) {
			console.log(error)
            data = {
                status: 500,
                data: '未知错误'
            }
        }
        return data
    }
    // 查询表所有数据
    async queryList(req,res){
        var data = {}
        try {
            var {pageSize,page} = req.body
            var where = {}
            var item = ''
            where.del_flag="N"
            if(pageSize && page){
                item = await model.user_info.findAndCountAll({ where: where,limit:Number(pageSize), offset:(page - 1) * pageSize })
            }else{
                item = await model.user_info.findAll({ where: where })
            }
            data = {
                status: 200,
                data: item
            }
            
        } catch (error) {
            data = {
                status: 500,
                data: '未知错误'
            }
        }
        return {
            data
        }
    }
    async update(req,res){
        var data = {}
        try {
           var update = { 
                name:req.body.name,
                mobile:req.body.mobile,
                integral:req.body.integral,
                gold:req.body.gold,
                vip:req.body.vip,
                fans:req.body.fans,
                collect:req.body.collect,
                focused:req.body.focused,
                isdelete:req.body.isdelete,
                createtime:req.body.createtime,
                updatetime:req.body.updatetime,
                remack:req.body.remack,
                QQ:req.body.QQ,
                download:req.body.download,
                emit:req.body.emit,
                registerCode:req.body.registerCode,
                password:req.body.password 
            }
           update = this.emptyData(update)
                
           update.del_flag="N"
                var item = await model.user_info.update(update,{
                    where: {
                        
                              id:req.body.id
                            
                        
                    }
                })
                data = {
                    status: 200,
                    data: '修改成功'
                }
        } catch (error) {
			console.log(error)
            data = {
                status: 500,
                data: '未知错误'
            }
        }
        return data
    }
    async delete(req,res){
        var data = {}
        var deleteJson = { 
            id:req.body["id"] 
        }
        try {
            deleteJson.del_flag="N"
            deleteJson = this.emptyData(deleteJson)
            await model.user_info.update({
                del_flag:"Y"
            },{
                where:deleteJson
            }).then((s) => {
                data = {
                    status: 200,
                    data: '删除成功'
                }
            })
        } catch (error) {
			console.log(error)
            data = {
                status: 500,
                data: '未知错误'
            }
        }
        return data
    }
    async query(req,res){
        var data = {}
        try {
            var where = { 
                id:req.body.id,
                name:req.body.name,
                mobile:req.body.mobile,
                integral:req.body.integral,
                gold:req.body.gold,
                vip:req.body.vip,
                fans:req.body.fans,
                collect:req.body.collect,
                focused:req.body.focused,
                isdelete:req.body.isdelete,
                createtime:req.body.createtime,
                updatetime:req.body.updatetime,
                remack:req.body.remack,
                QQ:req.body.QQ,
                download:req.body.download,
                emit:req.body.emit,
                registerCode:req.body.registerCode,
                password:req.body.password 
            }
            // 删除无用的数据
            where = this.emptyData(where)
            var item;
            where.del_flag="N"
			var query_data = {
				where
                }
			if (req.body.page && req.body.pageSize) {
				query_data.limit = Number(req.body.pageSize);
				query_data.offset = (req.body.page - 1) * req.body.pageSize;
                item = await model.user_info.findAndCountAll(query_data)
				item.page = req.body.page
				item.pageSize = req.body.pageSize
			}else{
                item = await model.user_info.findAll(query_data)
            }
             
            data = {
                status: 200,
                data: item
            }
        } catch (error) {
			console.log(error)
            data = {
                status: 500,
                data: '未知错误'
            }
        }
        return  data
    }
}
module.exports = Service 
    