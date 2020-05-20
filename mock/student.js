import Mock from 'mockjs'

import { studentList } from './totaldata'
import { gradeList } from './totaldata'
import { majorList } from './totaldata'
import { departmentList } from './totaldata'
// var studentList = Array.from(studentList)

export default [{
        url: "/student",
        type: "post",
        response: config => {
            const { studentPassword, enterSchoolDate, birthDate, gender, gradeId, majorId, departmentId, number, name } = config.body;
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
            if (gradeId !== "") {
                var Grade = gradeList.find(info => {
                    return info.id === gradeId
                })
            } else {
                var Grade = gradeList;
                Grade.id = "";
                Grade.name = "";
            }

            studentList.unshift(
                Mock.mock({
                    id: '@string("number",8)',
                    number: number,
                    name: name,
                    departmentId: Depart.id,
                    departmentName: Depart.name,
                    majorId: Major.id,
                    majorName: Major.name,
                    gradeId: Grade.id,
                    gradeName: Grade.name,
                    gender: gender,
                    birthDate: birthDate,
                    enterSchoolDate: enterSchoolDate,
                    studentPassword: studentPassword
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
        url: "/student",
        type: "delete",
        response: config => {
            const { id } = config.body;
            var i = studentList.findIndex((info, index, arr) => {
                return Object.is(id, info.id);
            });
            studentList.splice(i, 1);

            return {
                code: 0,
                msg: "删除成功",
                data: null
            };
        }
    },
    {
        url: "/student",
        type: "put",
        response: config => {
            const { studentPassword, enterSchoolDate, birthDate, gender, gradeId, majorId, departmentId, id, number, name } = config.body;
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
            if (gradeId !== "") {
                var Grade = gradeList.find(info => {
                    return info.id === gradeId
                })
            } else {
                var Grade = gradeList;
                Grade.id = "";
                Grade.name = "";
            }
            studentList.forEach(info => {
                if (info.id === id) {
                    info.number = number;
                    info.name = name;
                    info.departmentId = Depart.id;
                    info.departmentName = Depart.name;
                    info.majorId = Major.id;
                    info.majorName = Major.name;
                    info.gradeId = Grade.id;
                    info.gradeName = Grade.name;
                    info.studentPassword = studentPassword;
                    info.enterSchoolDate = enterSchoolDate;
                    info.birthDate = birthDate;
                    info.gender = gender;
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
        url: "/student/list",
        type: "get",
        response: config => {
            const items = studentList;
            return {
                code: 0,
                msg: "查询成功",
                data: items
            };
        }
    },
    {
        url: "/student",
        type: "get",
        response: config => {
            const { gradeId, majorId, departmentId, enterSchoolDateEnd, enterSchoolDateStart, name, number, page, size } = config.query;
            //1.根据name查询
            // var ar = studentList.filter(info => {
            //     if (name === "") return true;
            //     else return info.name === name;
            // });
            var ar = studentList.filter(info => {
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId === "" && majorId === "" && number === "" && name === "") return true;
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId === "" && majorId === "" && number === "" && name !== "") return (info.name === name)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId === "" && majorId === "" && number !== "" && name === "") return (info.number === number)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId === "" && majorId === "" && number !== "" && name !== "") return (info.name === name && info.number === number)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId === "" && majorId !== "" && number === "" && name === "") return (info.majorId === majorId)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId === "" && majorId !== "" && number === "" && name !== "") return (info.majorId === majorId && info.name === name)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId === "" && majorId !== "" && number !== "" && name === "") return (info.majorId === majorId && info.number === number)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId === "" && majorId !== "" && number !== "" && name !== "") return (info.majorId === majorId && info.number === number && info.name === name)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId !== "" && majorId === "" && number === "" && name === "") return (info.departmentId === departmentId);
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId !== "" && majorId === "" && number === "" && name !== "") return (info.departmentId === departmentId && info.name === name)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId !== "" && majorId === "" && number !== "" && name === "") return (info.departmentId === departmentId && info.number === number)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId !== "" && majorId === "" && number !== "" && name !== "") return (info.departmentId === departmentId && info.name === name && info.number === number)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId !== "" && majorId !== "" && number === "" && name === "") return (info.departmentId === departmentId && info.majorId === majorId)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId !== "" && majorId !== "" && number === "" && name !== "") return (info.departmentId === departmentId && info.majorId === majorId && info.name === name)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId !== "" && majorId !== "" && number !== "" && name === "") return (info.departmentId === departmentId && info.majorId === majorId && info.number === number)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId === "" && departmentId !== "" && majorId !== "" && number !== "" && name !== "") return (info.departmentId === departmentId && info.majorId === majorId && info.number === number && info.name === name)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId === "" && majorId === "" && number === "" && name === "") return (info.gradeId === gradeId);
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId === "" && majorId === "" && number === "" && name !== "") return (info.gradeId === gradeId && info.name === name)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId === "" && majorId === "" && number !== "" && name === "") return (info.gradeId === gradeId && info.number === number)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId === "" && majorId === "" && number !== "" && name !== "") return (info.gradeId === gradeId && info.name === name && info.number === number)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId === "" && majorId !== "" && number === "" && name === "") return (info.gradeId === gradeId && info.majorId === majorId)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId === "" && majorId !== "" && number === "" && name !== "") return (info.gradeId === gradeId && info.majorId === majorId && info.name === name)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId === "" && majorId !== "" && number !== "" && name === "") return (info.gradeId === gradeId && info.majorId === majorId && info.number === number)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId === "" && majorId !== "" && number !== "" && name !== "") return (info.gradeId === gradeId && info.majorId === majorId && info.number === number && info.name === name)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId !== "" && majorId === "" && number === "" && name === "") return (info.gradeId === gradeId && info.departmentId === departmentId);
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId !== "" && majorId === "" && number === "" && name !== "") return (info.gradeId === gradeId && info.departmentId === departmentId && info.name === name)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId !== "" && majorId === "" && number !== "" && name === "") return (info.gradeId === gradeId && info.departmentId === departmentId && info.number === number)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId !== "" && majorId === "" && number !== "" && name !== "") return (info.gradeId === gradeId && info.departmentId === departmentId && info.name === name && info.number === number)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId !== "" && majorId !== "" && number === "" && name === "") return (info.gradeId === gradeId && info.departmentId === departmentId && info.majorId === majorId)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId !== "" && majorId !== "" && number === "" && name !== "") return (info.gradeId === gradeId && info.departmentId === departmentId && info.majorId === majorId && info.name === name)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId !== "" && majorId !== "" && number !== "" && name === "") return (info.gradeId === gradeId && info.departmentId === departmentId && info.majorId === majorId && info.number === number)
                    if (enterSchoolDateEnd === "" && enterSchoolDateStart === "" && gradeId !== "" && departmentId !== "" && majorId !== "" && number !== "" && name !== "") return (info.gradeId === gradeId && info.departmentId === departmentId && info.majorId === majorId && info.number === number && info.name === name)
                        //=========================================
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId === "" && majorId === "" && number === "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd);
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId === "" && majorId === "" && number === "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.name === name)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId === "" && majorId === "" && number !== "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.number === number)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId === "" && majorId === "" && number !== "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.name === name && info.number === number)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId === "" && majorId !== "" && number === "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.majorId === majorId)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId === "" && majorId !== "" && number === "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.majorId === majorId && info.name === name)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId === "" && majorId !== "" && number !== "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.majorId === majorId && info.number === number)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId === "" && majorId !== "" && number !== "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.majorId === majorId && info.number === number && info.name === name)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId !== "" && majorId === "" && number === "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.departmentId === departmentId);
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId !== "" && majorId === "" && number === "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.departmentId === departmentId && info.name === name)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId !== "" && majorId === "" && number !== "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.departmentId === departmentId && info.number === number)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId !== "" && majorId === "" && number !== "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.departmentId === departmentId && info.name === name && info.number === number)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId !== "" && majorId !== "" && number === "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.departmentId === departmentId && info.majorId === majorId)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId !== "" && majorId !== "" && number === "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.departmentId === departmentId && info.majorId === majorId && info.name === name)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId !== "" && majorId !== "" && number !== "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.departmentId === departmentId && info.majorId === majorId && info.number === number)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId === "" && departmentId !== "" && majorId !== "" && number !== "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.departmentId === departmentId && info.majorId === majorId && info.number === number && info.name === name)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId === "" && majorId === "" && number === "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId);
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId === "" && majorId === "" && number === "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.name === name)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId === "" && majorId === "" && number !== "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.number === number)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId === "" && majorId === "" && number !== "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.name === name && info.number === number)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId === "" && majorId !== "" && number === "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.majorId === majorId)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId === "" && majorId !== "" && number === "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.majorId === majorId && info.name === name)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId === "" && majorId !== "" && number !== "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.majorId === majorId && info.number === number)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId === "" && majorId !== "" && number !== "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.majorId === majorId && info.number === number && info.name === name)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId !== "" && majorId === "" && number === "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.departmentId === departmentId);
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId !== "" && majorId === "" && number === "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.departmentId === departmentId && info.name === name)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId !== "" && majorId === "" && number !== "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.departmentId === departmentId && info.number === number)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId !== "" && majorId === "" && number !== "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.departmentId === departmentId && info.name === name && info.number === number)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId !== "" && majorId !== "" && number === "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.departmentId === departmentId && info.majorId === majorId)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId !== "" && majorId !== "" && number === "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.departmentId === departmentId && info.majorId === majorId && info.name === name)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId !== "" && majorId !== "" && number !== "" && name === "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.departmentId === departmentId && info.majorId === majorId && info.number === number)
                    if (enterSchoolDateEnd !== "" && enterSchoolDateStart !== "" && gradeId !== "" && departmentId !== "" && majorId !== "" && number !== "" && name !== "") return (info.enterSchoolDate >= enterSchoolDateStart && info.enterSchoolDate <= enterSchoolDateEnd && info.gradeId === gradeId && info.departmentId === departmentId && info.majorId === majorId && info.number === number && info.name === name)
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