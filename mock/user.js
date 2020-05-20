const tokens = {
    admin: {
        token: 'admin-token'
    },
    student: {
        token: 'student-token'
    },
    teacher: {
        token: 'teacher-token'
    },
    office: {
        token: 'office-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'student-token': {
        roles: ['student'],
        introduction: 'I am an student',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Student'
    },
    'teacher-token': {
        roles: ['teacher'],
        introduction: 'I am an teacher',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Teacher'
    },
    'office-token': {
        roles: ['office'],
        introduction: 'I am an office',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Office'
    }
}

export default [
    // user login
    {
        url: '/user/login',
        type: 'post',
        response: config => {
            const { username } = config.body
            const token = tokens[username]

            // mock error
            if (!token) {
                return {
                    code: 60204,
                    msg: 'Account and password are incorrect.'
                }
            }

            return {
                code: 0,
                data: token
            }
        }
    },

    // get user info
    {
        url: '/user/info\.*',
        type: 'get',
        response: config => {
            const { token } = config.query
            const info = users[token]

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    msg: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 0,
                data: info
            }
        }
    },

    // user logout
    {
        url: '/user/logout',
        type: 'post',
        response: _ => {
            return {
                code: 0,
                data: 'success'
            }
        }
    }
]