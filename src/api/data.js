import request from "@/utils/request";

//===========================================系部管理===========================
export function departmentadd(data) {
    return request({
        url: "/departmentAdd",
        method: "post",
        data
    });
}

export function departmentdel(data) {
    return request({
        url: "/departmentDel",
        method: "delete",
        data
    });
}

export function departmentupdate(data) {
    return request({
        url: "/departmentUpdate",
        method: "put",
        data
    });
}

export function departmentlist() {
    return request({
        url: "/departmentList",
        method: "get"
    });
}

export function departmentpagelist(data) {
    return request({
        url: "/departmentPageList",
        method: "get",
        params: data
    });
}

//===========================================专业管理===========================
export function majoradd(data) {
    return request({
        url: "/majorAdd",
        method: "post",
        data
    });
}

export function majordel(data) {
    return request({
        url: "/majorDel",
        method: "delete",
        data
    });
}

export function majorupdate(data) {
    return request({
        url: "/majorUpdate",
        method: "put",
        data
    });
}

export function majorlist() {
    return request({
        url: "/majorList",
        method: "get"
    });
}

export function majorpagelist(data) {
    return request({
        url: "/majorPageList",
        method: "get",
        params: data
    });
}
//===========================================班级管理===========================
export function gradeadd(data) {
    return request({
        url: "/gradeAdd",
        method: "post",
        data
    });
}

export function gradedel(data) {
    return request({
        url: "/gradeDel",
        method: "delete",
        data
    });
}

export function gradeupdate(data) {
    return request({
        url: "/gradeUpdate",
        method: "put",
        data
    });
}

export function gradelist() {
    return request({
        url: "/gradeList",
        method: "get"
    });
}

export function gradepagelist(data) {
    return request({
        url: "/gradePageList",
        method: "get",
        params: data
    });
}
//===========================================学生管理===========================
export function studentadd(data) {
    return request({
        url: "/studentAdd",
        method: "post",
        data
    });
}

export function studentdel(data) {
    return request({
        url: "/studentDel",
        method: "delete",
        data
    });
}

export function studentupdate(data) {
    return request({
        url: "/studentUpdate",
        method: "put",
        data
    });
}

export function studentlist() {
    return request({
        url: "/studentList",
        method: "get"
    });
}

export function studentpagelist(data) {
    return request({
        url: "/studentPageList",
        method: "get",
        params: data
    });
}
//===========================================教师管理===========================
export function teacheradd(data) {
    return request({
        url: "/teacherAdd",
        method: "post",
        data
    });
}

export function teacherdel(data) {
    return request({
        url: "/teacherDel",
        method: "delete",
        data
    });
}

export function teacherupdate(data) {
    return request({
        url: "/teacherUpdate",
        method: "put",
        data
    });
}

export function teacherlist() {
    return request({
        url: "/teacherList",
        method: "get"
    });
}

export function teacherpagelist(data) {
    return request({
        url: "/teacherPageList",
        method: "get",
        params: data
    });
}


// export function getDetail(data) {
//     return request({
//         url: "/teacher",
//         method: "get",
//         params: data
//     });
// }
//===========================================课程管理===========================
export function courseadd(data) {
    return request({
        url: "/courseAdd",
        method: "post",
        data
    });
}

export function coursedel(data) {
    return request({
        url: "/courseDel",
        method: "delete",
        data
    });
}

export function courseupdate(data) {
    return request({
        url: "/courseUpdate",
        method: "put",
        data
    });
}

export function courselist() {
    return request({
        url: "/courseList",
        method: "get"
    });
}

export function coursepagelist(data) {
    return request({
        url: "/coursePageList",
        method: "get",
        params: data
    });
}
//===========================================开课管理===========================
export function courseStartadd(data) {
    return request({
        url: "/courseStartAdd",
        method: "post",
        data
    });
}

export function courseStartdel(data) {
    return request({
        url: "/courseStartDel",
        method: "delete",
        data
    });
}

export function courseStartupdate(data) {
    return request({
        url: "/courseStartUpdate",
        method: "put",
        data
    });
}

export function courseStartlist() {
    return request({
        url: "/courseStartList",
        method: "get"
    });
}

export function courseStartpagelist(data) {
    return request({
        url: "/courseStartPageList",
        method: "get",
        params: data
    });
}
//===========================================选课管理===========================
export function courseSelectadd(data) {
    return request({
        url: "/courseSelectAdd",
        method: "post",
        data
    });
}

export function courseSelectdel(data) {
    return request({
        url: "/courseSelectDel",
        method: "delete",
        data
    });
}

export function courseSelectupdate(data) {
    return request({
        url: "/courseSelectUpdate",
        method: "put",
        data
    });
}

export function courseSelectlist() {
    return request({
        url: "/courseSelectList",
        method: "get"
    });
}

export function courseSelectpagelist(data) {
    return request({
        url: "/courseSelectPageList",
        method: "get",
        params: data
    });
}
//===========================================开课管理(学生)===========================
export function courseStartaddForStudent(data) {
    return request({
        url: "/startforstudent",
        method: "post",
        data
    });
}

export function courseStartdelForStudent(data) {
    return request({
        url: "/startforstudent",
        method: "delete",
        data
    });
}

export function courseStartupdateForStudent(data) {
    return request({
        url: "/startforstudent",
        method: "put",
        data
    });
}

export function courseStartlistForStudent() {
    return request({
        url: "/startforstudent/list",
        method: "get"
    });
}

export function courseStartpagelistForStudent(data) {
    return request({
        url: "/startforstudent",
        method: "get",
        params: data
    });
}
//===========================================开课管理(教务处)===========================
export function courseStartpagelistForOffice(data) {
    return request({
        url: "/course/startforoffice",
        method: "get",
        params: data
    });
}