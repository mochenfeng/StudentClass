import Mock from "mockjs";

var departmentList = [];
var majorList = [];
var gradeList = [];
var studentList = [];
var teacherList = [];
var courseList = [];
var courseStartList = [];
var courseSelectList = [];
//===================系部的数据生成=====================
for (var i = 0; i < 30; i++) {
    departmentList.push(
        Mock.mock({
            id: '@string("number",8)',
            number: '@string("number",5)',
            "name|1": ["信息系", "财会系", "工商系", "人文系", "时尚设计系", "建工系", "机械系"]
        })
    );
}
//===================专业的数据生成=======================
for (var i = 0; i < 30; i++) {
    var depart = departmentList[Math.random() * departmentList.length | 0]
    majorList.push(
        Mock.mock({
            id: '@string("number",8)',
            number: '@string("number",5)',
            "name|1": ["软件技术", "电子商务", "大数据"],
            departmentName: depart.name,
            departmentId: depart.id
        })
    );
}
//===================教师的数据生成======================
for (var i = 0; i < 30; i++) {
    var depart = departmentList[Math.random() * departmentList.length | 0]
    var major = majorList[Math.random() * majorList.length | 0]
    teacherList.push(
        Mock.mock({
            id: '@string("number", 8)',
            number: '@string("number",5)',
            name: "@cname",
            "title|1": ["正高级教师", "高级教师", "一级教师", "二级教师", "三级教师"],
            departmentId: depart.id,
            departmentName: depart.name,
            majorId: major.id,
            majorName: major.name,
            teacherPassword: "123456"
        })
    )
}
//===================班级的数据生成======================
for (var i = 0; i < 30; i++) {
    var depart = departmentList[Math.random() * departmentList.length | 0]
    var major = majorList[Math.random() * majorList.length | 0]
    var teacher = teacherList[Math.random() * majorList.length | 0]
    gradeList.push(
        Mock.mock({
            id: '@string("number",8)',
            number: '@string("number",5)',
            "name|1": [majorList[i].name + "1701", majorList[i].name + "1702", majorList[i].name + "1703"],
            departmentName: depart.name,
            departmentId: depart.id,
            majorName: major.name,
            majorId: major.id,
            teacherId: teacher.id,
            teacherName: teacher.name,
        })
    );
}
//===================学生的数据生成======================
for (var i = 0; i < 30; i++) {
    var depart = departmentList[Math.random() * departmentList.length | 0]
    var major = majorList[Math.random() * majorList.length | 0]
    var grade = gradeList[Math.random() * gradeList.length | 0]
    studentList.push(
        Mock.mock({
            id: '@string("number",8)',
            number: '@string("number",5)',
            name: "@cname",
            "gender|1": ["男", "女", "未知"],
            birthDate: '@date("1999-1-1")',
            enterSchoolDate: '@date()',
            departmentName: depart.name,
            departmentId: depart.id,
            majorName: major.name,
            majorId: major.id,
            gradeName: grade.name,
            gradeId: grade.id,
            studentPassword: '123456'
        })
    );
}

//===================课程的数据生成======================
for (var i = 0; i < 30; i++) {
    var depart = departmentList[Math.random() * departmentList.length | 0]
    var major = majorList[Math.random() * majorList.length | 0]
    courseList.push(
        Mock.mock({
            id: '@string("number",8)',
            number: '@string("number",5)',
            "name|1": ["软件质量", "Web前端开发进阶", "Web前端开发项目实践", "编程语言高级特性", "UI设计与实现", "移动应用开发项目实践", "HTML5开发", "体育与健康", "形势与政策教育", "关系数据库应用", "程序员能力修炼", "Web后端开发入门", "Web前端开发入门", "生活方式与健康", "大学生创业基础", "舌尖上的植物学", "移动应用开发入门", "软件测试"],
            description: "这个人很懒，什么都没留下",
            "hour|1": [34, 60, 72, 20, 40, 24, 28, 30, 18],
            "credit|1": [2.0, 3.0, 4.0, 1.0, 2.0, 1.5, 1.5, 1.5, 0.5, 0.5],
            departmentName: depart.name,
            departmentId: depart.id,
            majorName: major.name,
            majorId: major.id
        })
    )
}
//===================开课的数据生成=====================
for (var i = 0; i < 30; i++) {
    var depart = departmentList[Math.random() * departmentList.length | 0]
    var major = majorList[Math.random() * majorList.length | 0]
    var teacher = teacherList[Math.random() * teacherList.length | 0]
    var course = courseList[Math.random() * courseList.length | 0]
    courseStartList.push(
        Mock.mock({
            id: '@string("number",8)',
            yearSemester: '201820191',
            courseId: course.id,
            courseName: course.name,
            teacherId: teacher.id,
            teacherName: teacher.name,
            departmentName: depart.name,
            departmentId: depart.id,
            majorName: major.name,
            majorId: major.id,
            "upperLimit|1": ["40", "70", "100", "50", "60"],
            lowerLimit: "30",
            "courseState|1": ["开课", "未开课"]
        })
    )
}
//===================选课的数据生成=====================
for (var i = 0; i < 30; i++) {
    var student = studentList[Math.random() * studentList.length | 0]
    var course = courseList[Math.random() * courseList.length | 0]
    var teacher = teacherList[Math.random() * teacherList.length | 0]
    courseSelectList.push(
        Mock.mock({
            id: '@string("number",8)',
            yearSemester: '201820191',
            studentId: student.id,
            studentName: student.name,
            courseId: course.id,
            courseName: course.name,
            teacherId: teacher.id,
            teacherName: teacher.name,
            "score|1-100": 100,
            courseStartId: ""
        })
    )
}


export { departmentList, majorList, gradeList, studentList, teacherList, courseList, courseStartList, courseSelectList }