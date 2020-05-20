import Mock from 'mockjs'

import { departmentList } from './totaldata'

// var departmentList = Array.from(departmentList)

export default [{
        url: "/department",
        type: "post",
        response: config => {
            const { number, name } = config.body;
            departmentList.unshift(
                Mock.mock({
                    id: '@string("number",8)',
                    number: number,
                    name: name
                })
            );

            return {
                code: 0,
                msg: "添加成功",
                data: null
            };
        }
    },
    {
        url: "/department",
        type: "delete",
        response: config => {
            const { id } = config.body;
            var i = departmentList.findIndex((info, index, arr) => {
                return Object.is(id, info.id);
            });
            departmentList.splice(i, 1);

            return {
                code: 0,
                msg: "删除成功",
                data: null
            };
        }
    },
    {
        url: "/department",
        type: "put",
        response: config => {
            const { id, number, name } = config.body;
            departmentList.forEach(info => {
                if (info.id === id) {
                    info.number = number;
                    info.name = name;
                }
            });

            return {
                code: 0,
                msg: "修改成功",
                data: null
            };
        }
    },
    {
        url: "/department/list",
        type: "get",
        response: config => {
            const items = departmentList;
            return {
                code: 0,
                msg: "查询成功",
                data: items
            };
        }
    },
    {
        url: "/department",
        type: "get",
        response: config => {
            const { name, page, size } = config.query;
            //1.根据name查询
            var ar = departmentList.filter(info => {
                if (name === "") return true;
                else return info.name === name;
            });
            //2.如果超过10条，分页
            var result = ar.slice((page - 1) * size, size * page);
            return {
                code: 0,
                msg: "查询成功",
                data: {
                    totalElements: ar.length,
                    content: result
                }
            };
        }
    }
]