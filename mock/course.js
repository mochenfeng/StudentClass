import Mock from 'mockjs'

import { courseList } from './totaldata'
import { departmentList } from './totaldata'
import { majorList } from './totaldata'
// var courseList = Array.from(courseList)

export default [{
        url: "/course",
        type: "post",
        response: config => {
            const { hour, credit, departmentId, majorId, description, number, name } = config.body;
            if (departmentId !== "") {
                var Depart = departmentList.find(info => {
                    return info.id === departmentId
                })
            } else {
                var Depart = departmentList;
                Depart.id = ""
            }
            if (majorId !== "") {
                var Major = majorList.find(info => {
                    return info.id === majorId
                })
            } else {
                var Major = majorList;
                Major.id = ""
            }
            courseList.unshift(
                Mock.mock({
                    id: '@string("number",8)',
                    number: number,
                    name: name,
                    description: description,
                    hour: hour,
                    credit: credit,
                    departmentId: Depart.id,
                    departmentName: Depart.name,
                    majorId: Major.id,
                    majorName: Major.name
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
        url: "/course",
        type: "delete",
        response: config => {
            const { id } = config.body;
            var i = courseList.findIndex((info, index, arr) => {
                return Object.is(id, info.id);
            });
            courseList.splice(i, 1);

            return {
                code: 0,
                msg: "删除成功",
                data: null
            };
        }
    },
    {
        url: "/course",
        type: "put",
        response: config => {
            const { hour, credit, departmentId, majorId, description, number, name, id } = config.body;
            if (departmentId !== "") {
                var Depart = departmentList.find(info => {
                    return info.id === departmentId
                })
            }
            if (majorId !== "") {
                var Major = majorList.find(info => {
                    return info.id === majorId
                })
            }
            courseList.forEach(info => {
                if (info.id === id) {
                    info.number = number;
                    info.name = name;
                    info.hour = hour;
                    info.credit = credit;
                    info.description = description;
                    info.departmentId = Depart.id;
                    info.departmentName = Depart.name;
                    info.majorId = Major.id;
                    info.majorName = Major.name;
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
        url: "/course/list",
        type: "get",
        response: config => {
            const items = courseList;
            return {
                code: 0,
                msg: "查询成功",
                data: items
            };
        }
    },
    {
        url: "/course",
        type: "get",
        response: config => {
            const { majorId, departmentId, name, number, page, size } = config.query;
            //1.根据name查询
            var ar = courseList.filter(info => {
                if (departmentId === "" && majorId === "" && number === "" && name === "") return true;
                if (departmentId === "" && majorId === "" && number === "" && name !== "") return (info.name === name)
                if (departmentId === "" && majorId === "" && number !== "" && name === "") return (info.number === number)
                if (departmentId === "" && majorId === "" && number !== "" && name !== "") return (info.name === name && info.number === number)
                if (departmentId === "" && majorId !== "" && number === "" && name === "") return (info.majorId === majorId)
                if (departmentId === "" && majorId !== "" && number === "" && name !== "") return (info.majorId === majorId && info.name === name)
                if (departmentId === "" && majorId !== "" && number !== "" && name === "") return (info.majorId === majorId && info.number === number)
                if (departmentId === "" && majorId !== "" && number !== "" && name !== "") return (info.majorId === majorId && info.number === number && info.name === name)
                if (departmentId !== "" && majorId === "" && number === "" && name === "") return (info.departmentId === departmentId);
                if (departmentId !== "" && majorId === "" && number === "" && name !== "") return (info.departmentId === departmentId && info.name === name)
                if (departmentId !== "" && majorId === "" && number !== "" && name === "") return (info.departmentId === departmentId && info.number === number)
                if (departmentId !== "" && majorId === "" && number !== "" && name !== "") return (info.departmentId === departmentId && info.name === name && info.number === number)
                if (departmentId !== "" && majorId !== "" && number === "" && name === "") return (info.departmentId === departmentId && info.majorId === majorId)
                if (departmentId !== "" && majorId !== "" && number === "" && name !== "") return (info.departmentId === departmentId && info.majorId === majorId && info.name === name)
                if (departmentId !== "" && majorId !== "" && number !== "" && name === "") return (info.departmentId === departmentId && info.majorId === majorId && info.number === number)
                if (departmentId !== "" && majorId !== "" && number !== "" && name !== "") return (info.departmentId === departmentId && info.majorId === majorId && info.number === number && info.name === name)
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
    },
]