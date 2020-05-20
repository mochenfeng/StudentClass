import Mock from 'mockjs'

import { majorList } from './totaldata'
import { departmentList } from './totaldata'
// var majorList = Array.from(majorList)

export default [{
        url: "/major",
        type: "post",
        response: config => {
            const { departmentId, number, name } = config.body;
            if (departmentId !== "") {
                var Depart = departmentList.find(info => {
                    return info.id === departmentId
                })
            } else {
                var Depart = departmentList;
                Depart.id = "";
                Depart.name = "";
            }
            majorList.unshift(
                Mock.mock({
                    id: '@string("number",8)',
                    number: number,
                    name: name,
                    departmentId: Depart.id,
                    departmentName: Depart.name
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
        url: "/major",
        type: "delete",
        response: config => {
            const { id } = config.body;
            var i = majorList.findIndex((info, index, arr) => {
                return Object.is(id, info.id);
            });
            majorList.splice(i, 1);

            return {
                code: 0,
                msg: "删除成功",
                data: null
            };
        }
    },
    {
        url: "/major",
        type: "put",
        response: config => {
            const { departmentId, id, number, name } = config.body;
            if (departmentId !== "") {
                var Depart = departmentList.find(info => {
                    return info.id === departmentId
                })
            } else {
                var Depart = departmentList;
                Depart.id = "";
                Depart.name = "";
            }
            majorList.forEach(info => {
                if (info.id === id) {
                    info.number = number;
                    info.name = name;
                    info.departmentId = Depart.id;
                    info.departmentName = Depart.name;
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
        url: "/major/list",
        type: "get",
        response: config => {
            const items = majorList;
            return {
                code: 0,
                msg: "查询成功",
                data: items
            };
        }
    },
    {
        url: "/major",
        type: "get",
        response: config => {
            const { departmentId, name, page, size } = config.query;
            //1.根据name查询
            // var ar = majorList.filter(info => {
            //     if (name === "") return true;
            //     else return info.name === name;
            // });
            var ar = majorList.filter(info => {
                    if (name === '' && departmentId === '') { return true }
                    if (name === '' && departmentId !== '') { return info.departmentId === departmentId }
                    if (name !== '' && departmentId === '') { return info.name === name }
                    if (name !== '' && departmentId !== '') { return info.name === name && info.departmentId === departmentId }
                })
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
    },
]