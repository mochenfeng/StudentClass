import Mock from 'mockjs'

import { teacherList } from './totaldata'
import { majorList } from './totaldata'
import { departmentList } from './totaldata'
// var teacherList = Array.from(teacherList)

export default [{
        url: "/teacher",
        type: "post",
        response: config => {
            const { teacherPassword, title, majorId, departmentId, number, name } = config.body;
            if (departmentId !== "") {
                var Depart = departmentList.find(info => {
                    return info.id === departmentId
                })
            } else {
                var Depart = departmentList;
                Depart.id = "";
                Depart.name = "";
            }
            if (majorId !== "") {
                var Major = majorList.find(info => {
                    return info.id === majorId
                })
            } else {
                var Major = majorList;
                Major.id = "";
                Major.name = "";
            }
            teacherList.unshift(
                Mock.mock({
                    id: '@string("number",8)',
                    number: number,
                    name: name,
                    departmentId: Depart.id,
                    departmentName: Depart.name,
                    majorId: Major.id,
                    majorName: Major.name,
                    teacherPassword: teacherPassword,
                    title: title
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
        url: "/teacher",
        type: "delete",
        response: config => {
            const { id } = config.body;
            var i = teacherList.findIndex((info, index, arr) => {
                return Object.is(id, info.id);
            });
            teacherList.splice(i, 1);

            return {
                code: 0,
                msg: "删除成功",
                data: null
            };
        }
    },
    {
        url: "/teacher",
        type: "put",
        response: config => {
            const { teacherPassword, title, majorId, departmentId, id, number, name } = config.body;
            if (departmentId !== "") {
                var Depart = departmentList.find(info => {
                    return info.id === departmentId
                })
            } else {
                var Depart = departmentList;
                Depart.id = "";
                Depart.name = "";
            }
            if (majorId !== "") {
                var Major = majorList.find(info => {
                    return info.id === majorId
                })
            } else {
                var Major = majorList;
                Major.id = "";
                Major.name = "";
            }
            teacherList.forEach(info => {
                if (info.id === id) {
                    info.number = number;
                    info.name = name;
                    info.departmentId = Depart.id;
                    info.departmentName = Depart.name;
                    info.majorId = Major.id;
                    info.majorName = Major.name;
                    info.teacherPassword = teacherPassword;
                    info.title = title;
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
        url: "/teacher/list",
        type: "get",
        response: config => {
            const items = teacherList;
            return {
                code: 0,
                msg: "查询成功",
                data: items
            };
        }
    },
    {
        url: "/teacher",
        type: "get",
        response: config => {
            const { majorId, departmentId, number, name, page, size } = config.query;
            //1.根据name查询
            var ar = teacherList.filter(info => {
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