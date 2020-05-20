import Mock from 'mockjs'

import { courseStartList, departmentList, majorList } from './totaldata'
import { courseList } from './totaldata'
import { teacherList } from './totaldata'
// var courseStartList = Array.from(courseStartList)

export default [{
        url: "/course/start",
        type: "post",
        response: config => {
            const { courseState, courseId, teacherId, yearSemester, upperLimit, lowerLimit } = config.body;
            if (courseId !== "") {
                var Course = courseList.find(info => {
                    return info.id === courseId
                })
            } else {
                var Course = courseList;
                Course.name = "";
                Course.departmentName = "";
                Course.majorName = "";
            }
            if (teacherId !== "") {
                var Teacher = teacherList.find(info => {
                    return info.id === teacherId
                })
            } else {
                var Teacher = teacherList;
                Teacher.name = ""
            }
            courseStartList.unshift(
                Mock.mock({
                    id: '@string("number",8)',
                    yearSemester: yearSemester,
                    upperLimit: upperLimit,
                    lowerLimit: lowerLimit,
                    courseName: Course.name,
                    departmentName: Course.departmentName,
                    majorName: Course.majorName,
                    teacherName: Teacher.name,
                    courseState: courseState
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
        url: "/course/start",
        type: "delete",
        response: config => {
            const { id } = config.body;
            var i = courseStartList.findIndex((info, index, arr) => {
                return Object.is(id, info.id);
            });
            courseStartList.splice(i, 1);

            return {
                code: 0,
                msg: "删除成功",
                data: null
            };
        }
    },
    {
        url: "/course/start",
        type: "put",
        response: config => {
            const { courseState, courseId, teacherId, yearSemester, upperLimit, lowerLimit, id } = config.body;
            if (courseId !== "") {
                var Course = courseList.find(info => {
                    return info.id === courseId
                })
            } else {
                var Course = courseList;
                Course.name = "";
                Course.departmentName = "";
                Course.majorName = "";
            }
            if (teacherId !== "") {
                var Teacher = teacherList.find(info => {
                    return info.id === teacherId
                })
            } else {
                var Teacher = teacherList;
                Teacher.name = ""
            }
            courseStartList.forEach(info => {
                if (info.id === id) {
                    info.yearSemester = yearSemester;
                    info.courseName = Course.name;
                    info.teacherName = Teacher.name;
                    info.departmentName = Course.departmentName;
                    info.majorName = Course.majorName;
                    info.upperLimit = upperLimit;
                    info.lowerLimit = lowerLimit;
                    info.courseState = courseState;
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
        url: "/course/start/list",
        type: "get",
        response: config => {
            const items = courseStartList;
            return {
                code: 0,
                msg: "查询成功",
                data: items
            };
        }
    },
    {
        url: "/course/start",
        type: "get",
        response: config => {
            const { teacherId, page, size } = config.query;
            //1.根据name查询
            var ar = courseStartList.filter(info => {
                if (teacherId !== "") return teacherId === info.teacherId;
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
    {
        url: "/course/startforoffice",
        type: "get",
        response: config => {
            const { page, size } = config.query;
            //1.根据name查询
            var ar = courseStartList.filter(info => {
               return true;
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