import Mock from 'mockjs'
import {
    courseSelectList,
    studentList,
    courseStartList,
} from './totaldata'

export default [{
        url: "/course/select",
        type: "post",
        response: config => {
            const {
                studentId,
                courseStartId,
                yearSemester,
                score
            } = config.body;
            if (studentId !== "") {
                var Student = studentList.find(info => {
                    return info.id === studentId
                })
            } else {
                var Student = studentList;
                Student.name = "";
                Student.id = "";
            }
            if (courseStartId !== "") {
                var CourseStart = courseStartList.find(info => {
                    return info.id === courseStartId
                })
            } else {
                var CourseStart = courseStartList;
                CourseStart.courseId = "";
                CourseStart.courseName = "";
                CourseStart.teacherName = "";
            }

            courseSelectList.unshift(
                Mock.mock({
                    id: '@string("number",8)',
                    yearSemester: yearSemester,
                    studentId: Student.id,
                    studentName: Student.name,
                    courseId: CourseStart.courseId,
                    courseName: CourseStart.courseName,
                    teacherName: CourseStart.teacherName,
                    score: score
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
        url: "/course/select",
        type: "delete",
        response: config => {
            const {
                id
            } = config.body;
            var i = courseSelectList.findIndex((info, index, arr) => {
                return Object.is(id, info.id);
            });
            courseSelectList.splice(i, 1);

            return {
                code: 0,
                msg: "删除成功",
                data: null
            };
        }
    },
    {
        url: "/course/select",
        type: "put",
        response: config => {
            const {
                studentId,
                courseStartId,
                yearSemester,
                score,
                id
            } = config.body;
            if (studentId !== "") {
                var Student = studentList.find(info => {
                    return info.id === studentId
                })
            } else {
                var Student = studentList;
                Student.name = "";
                Student.id = "";
            }
            if (courseStartId !== "") {
                var CourseStart = courseStartList.find(info => {
                    return info.id === courseStartId
                })
            } else {
                var CourseStart = courseStartList;
                CourseStart.courseId = "";
                CourseStart.courseName = "";
                CourseStart.teacherName = "";
            }

            courseSelectList.forEach(info => {
                if (info.id === id) {
                    info.yearSemester = yearSemester,
                        info.studentId = Student.id,
                        info.studentName = Student.name,
                        info.courseId = CourseStart.courseId,
                        info.courseName = CourseStart.courseName,
                        info.teacherName = CourseStart.teacherName,
                        info.score = score
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
        url: "/course/select/list",
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
        url: "/course/select",
        type: "get",
        response: config => {
            const {
                page,
                size,
                departmentId
            } = config.query;
            //1.根据name查询
            var ar = courseSelectList.filter(info => {
                if (departmentId === "") return true;
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