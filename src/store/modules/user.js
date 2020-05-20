import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { constantRoutes, resetRouter } from '@/router'
/* Layout */
import Layout from "@/layout";
import router from '../../router';

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    routes: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROUTES: (state, routes) => {
        state.routes = routes
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { name, avatar } = data

                const asyncRouters = [{
                    path: "/example",
                    component: Layout,
                    redirect: "/example/table",
                    name: "Example",
                    meta: {
                        title: "系部管理",
                        icon: "example",
                    },
                    children: [{
                        path: "depart",
                        name: "Depart",
                        component: () =>
                            import("@/views/department/index"),
                        meta: {
                            title: "系部管理",
                            icon: "department",
                        }
                    }]
                },
                {
                    path: "/major",
                    component: Layout,
                    redirect: "/major/table",
                    name: "Major",
                    meta: { title: "专业管理", icon: "example" },
                    children: [{
                        path: "majorm",
                        name: "Majorm",
                        component: () =>
                            import("@/views/major/index"),
                        meta: { title: "专业管理", icon: "major" }
                    }]
                },
                {
                    path: "/grade",
                    component: Layout,
                    redirect: "/grade/table",
                    name: "Grade",
                    meta: {
                        title: "班级管理",
                        icon: "example",
                    },
                    children: [{
                        path: "gradem",
                        name: "Gradem",
                        component: () =>
                            import("@/views/grade/index"),
                        meta: {
                            title: "班级管理",
                            icon: "grade",
                        }
                    }]
                },
                {
                    path: "/student",
                    component: Layout,
                    redirect: "/student/table",
                    name: "Student",
                    meta: { title: "学生管理", icon: "example" },
                    children: [{
                        path: "studentm",
                        name: "Studentm",
                        component: () =>
                            import("@/views/student/index"),
                        meta: { title: "学生管理", icon: "student" }
                    }]
                },
                {
                    path: "/teacher",
                    component: Layout,
                    redirect: "/teacher/table",
                    name: "Teacher",
                    meta: { title: "教师管理", icon: "example" },
                    children: [{
                        path: "teacherm",
                        name: "Teacherm",
                        component: () =>
                            import("@/views/teacher/index"),
                        meta: { title: "教师管理", icon: "teacher" }
                    }]
                },
                {
                    path: "/course",
                    component: Layout,
                    redirect: "/course/table",
                    name: "Course",
                    meta: { title: "课程管理", icon: "example" },
                    children: [{
                        path: "coursem",
                        name: "Coursem",
                        component: () =>
                            import("@/views/course/index"),
                        meta: { title: "课程管理", icon: "course" }
                    }
                    ]
                },
                {
                    path: "/courseStart",
                    component: Layout,
                    redirect: "/courseStart/table",
                    name: "CourseStart",
                    meta: {
                        title: "开课管理",
                        icon: "example",
                    },
                    children: [{
                        path: "courseStart",
                        name: "CourseStart",
                        component: () =>
                            import("@/views/courseStart/Teacher"),
                        meta: {
                            title: "Teacher",
                            icon: "department",
                        }
                    },
                    {
                        path: "courseStartForStudent",
                        name: "CourseStartForStudent",
                        component: () =>
                            import("@/views/courseStart/Student"),
                        meta: {
                            title: "Student",
                            icon: "department",
                        }
                    }
                    ,
                    {
                        path: "courseStartForOffice",
                        name: "CourseStartForOffice",
                        component: () =>
                            import("@/views/courseStart/Office"),
                        meta: {
                            title: "Office",
                            icon: "department",
                        }
                    }]
                },
                {
                    path: "/query",
                    component: Layout,
                    redirect: "/query/table",
                    name: "Query",
                    meta: { title: "查询组件", icon: "pagelist" },
                    children: [{
                        path: "departmentselect",
                        name: "Ddepartmentselect",
                        component: () =>
                            import("@/components/departmentselect/index"),
                        meta: { title: "系部查询组件", icon: "add-2" }
                    },
                    {
                        path: "majorselect",
                        name: "Majorselect",
                        component: () =>
                            import("@/components/majorselect/index"),
                        meta: { title: "专业查询组件", icon: "add-2" }
                    },

                    {
                        path: "teacherselect",
                        name: "Teacherselect",
                        component: () =>
                            import("@/components/teacherselect/index"),
                        meta: { title: "教师查询组件", icon: "add-2" }
                    },
                    {
                        path: "gradeselect",
                        name: "Gradeselect",
                        component: () =>
                            import("@/components/gradeselect/index"),
                        meta: { title: "班级查询组件", icon: "add-2" }
                    },
                    {
                        path: "courseselect",
                        name: "Courseselect",
                        component: () =>
                            import("@/components/courseselect/index"),
                        meta: { title: "课程查询组件", icon: "add-2" }
                    },
                    {
                        path: "courseStartselect",
                        name: "CourseStartselect",
                        component: () =>
                            import("@/components/courseStartselect/index"),
                        meta: { title: "开课查询组件", icon: "add-2" }
                    },
                    {
                        path: "courseState",
                        name: "courseState",
                        component: () =>
                            import("@/components/courseState/index"),
                        meta: { title: "开课查询组件", icon: "add-2" }
                    }
                    ]
                },

                // 404 page must be placed at the end !!!
                { path: "*", redirect: "/404", hidden: true }
                ];

                const routes = constantRoutes.concat(asyncRouters)
                // const routes = constantRoutes
                router.addRoutes(routes);
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)

                commit('SET_ROUTES', routes)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}