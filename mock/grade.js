import Mock from 'mockjs'

import { gradeList } from './totaldata'
import { majorList } from './totaldata'
import { departmentList } from './totaldata'
import { teacherList } from './totaldata'
// var gradeList = Array.from(gradeList)

export default [{
        url: "/class",
        type: "post",
        response: config => {
            const { teacherId, majorId, departmentId, number, name } = config.body;
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
            if (teacherId !== "") {
                var Teacher = teacherList.find(info => {
                    return info.id === teacherId
                })
            } else {
                var Teacher = teacherList;
                Teacher.id = "";
                Teacher.name = "";
            }

            gradeList.unshift(
                Mock.mock({
                    id: '@string("number",8)',
                    number: number,
                    name: name,
                    departmentId: Depart.id,
                    majorId: Major.id,
                    teacherId: Teacher.id,
                    teacherName: Teacher.name,
                    departmentName: Depart.name,
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
        url: "/class",
        type: "delete",
        response: config => {
            const { id } = config.body;
            var i = gradeList.findIndex((info, index, arr) => {
                return Object.is(id, info.id);
            });
            gradeList.splice(i, 1);

            return {
                code: 0,
                msg: "删除成功",
                data: null
            };
        }
    },
    {
        url: "/class",
        type: "put",
        response: config => {
            const { teacherId, majorId, departmentId, id, number, name } = config.body;
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
            if (teacherId !== "") {
                var Teacher = teacherList.find(info => {
                    return info.id === teacherId
                })
            } else {
                var Teacher = teacherList;
                Teacher.id = "";
                Teacher.name = "";
            }
            gradeList.forEach(info => {
                if (info.id === id) {
                    info.id = id;
                    info.number = number;
                    info.name = name;
                    info.departmentId = Depart.id;
                    info.departmentName = Depart.name;
                    info.majorId = Major.id;
                    info.majorName = Major.name;
                    info.teacherId = Teacher.id;
                    info.teacherName = Teacher.name;
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
        url: "/class/list",
        type: "get",
        response: config => {
            const items = gradeList;
            return {
                code: 0,
                msg: "查询成功",
                data: items
            };
        }
    },
    {
        url: "/class",
        type: "get",
        response: config => {
            const { departmentId, majorId, name, page, size } = config.query;
            //1.根据name查询
            // var ar = gradeList.filter(info => {
            //     if (name === "") return true;
            //     else return info.name === name;
            // });
            var ar = gradeList.filter(info => {
                    if (name === '' && departmentId === '' && majorId === '') { return true }
                    if (name === '' && departmentId !== '' && majorId === '') { return info.departmentId === departmentId }
                    if (name !== '' && departmentId === '' && majorId === '') { return info.name === name }
                    if (name !== '' && departmentId !== '' && majorId === '') { return info.name === name && info.departmentId === departmentId }
                    if (name !== '' && departmentId === '' && majorId !== '') { return info.name === name && info.majorId === majorId }
                    if (name === '' && departmentId !== '' && majorId !== '') { return info.departmentId === departmentId && info.majorId === majorId }
                    if (name === '' && departmentId === '' && majorId !== '') { return info.majorId === majorId }
                    if (name !== '' && departmentId !== '' && majorId !== '') { return info.name === name && info.departmentId === departmentId && info.majorId === majorId }
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