import axios from 'axios';

export const addNewUser = (newUser) => (dispatch) => {
    dispatch({ type: 'ADD_USER_REQUEST' });

    return axios
        .post('https://mrbackend.herokuapp.com/api/user', {
            ...newUser
        })
        .then(({ data }) => {
            dispatch({
                type: 'ADD_USER_SUCCESS',
                payload: {
                    data
                },
            })
            return data
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'ADD_USER_FAILURE' })
        })
}

export const loginUser = (user) => (dispatch) => {
    dispatch({ type: 'LOGIN_USER_REQUEST' });
    return axios
        .post('https://mrbackend.herokuapp.com/api/user/signin', {
            email: user.email,
            password: user.password
        })
        .then(({ data }) => {
            dispatch({
                type: 'LOGIN_USER_SUCCESS',
                payload: {
                    data
                },
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'LOGIN_USER_FAILURE' })
        })
}

export const updateUser = (newData) => (dispatch) => {
    dispatch({ type: 'UPDATE_USER_REQUEST' });
    return axios
        .put(`https://mrbackend.herokuapp.com/api/user/${newData.user._id}`, {
            ...newData
        })
        .then(({ data }) => {
            dispatch({
                type: 'UPDATE_USER_SUCCESS',
                payload: {
                    data
                },
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'UPDATE_USER_FAILURE' })
        })
}

export const deleteUser = (id) => (dispatch) => {
    dispatch({ type: 'DELETE_USER_REQUEST' });
    return axios
        .delete(`https://mrbackend.herokuapp.com/api/user/${id}`)
        .then(({ data }) => {
            dispatch({
                type: 'DELETE_USER_SUCCESS',
                payload: {
                    data
                },
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'DELETE_USER_FAILURE' })
        })
}

export const logoutUser = () => (dispatch) => {
    dispatch({
        type: 'LOGOUT_USER_SUCCESS',
    })
}

export const errorCodeReset = () => (dispatch) => {
    dispatch({
        type: 'ERRORCODE_RESET_SUCCESS',
    })
}

export const addUserStats = () => (dispatch, getState) => {
    dispatch({ type: 'ADD_USER_STATS_REQUEST' });
    return axios
        .post('https://mrbackend.herokuapp.com/api/userstats', {
            userID: getState().createdUserId,
            points: 0,
            lastDayQuestion: '2021-01-01T00:00:00.000+00:00',
            level: "żółtodziób",
            avatarType: "boy1",
            badges: [],
            lessonsStats: [],
            testsStats: [],
            loginStats: [],
            testsInRow: 0,
            dayQuestion: {}
        })
        .then(({ data }) => {
            dispatch({
                type: 'ADD_USER_STATS_SUCCESS',
                payload: {
                    data
                },
            })
            return data
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'ADD_USER_STATS_FAILURE' })
        })
}

export const getUserStats = () => (dispatch, getState) => {
    dispatch({ type: 'USER_STATS_REQUEST' });
    return axios
        .get('https://mrbackend.herokuapp.com/api/userstats', {
            params: {
                userID: getState().userID,
            },
        })
        .then(({ data }) => {
            dispatch({
                type: 'USER_STATS_SUCCESS',
                payload: {
                    data
                },
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'USER_STATS_FAILURE' })
        })
}
export const updateUserStats = (userStats) => (dispatch) => {
    dispatch({ type: 'UPDATE_USER_STATS_REQUEST' });
    return axios
        .put(`https://mrbackend.herokuapp.com/api/userstats/${userStats._id}`, {
            ...userStats
        })
        .then(({ data }) => {
            dispatch({
                type: 'UPDATE_USER_STATS_SUCCESS',
                payload: {
                    data
                },
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'UPDATE_USER_STATS_FAILURE' })
        })
}
export const deleteUserStats = (userStats) => (dispatch) => {
    dispatch({ type: 'DELETE_USER_STATS_REQUEST' });
    return axios
        .delete(`https://mrbackend.herokuapp.com/api/userstats/${userStats._id}`, {
            ...userStats
        })
        .then(({ data }) => {
            dispatch({
                type: 'DELETE_USER_STATS_SUCCESS',
                payload: {
                    data
                },
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'DELETE_USER_STATS_FAILURE' })
        })
}

export const removeNotifications = () => ({
    type: 'REMOVE_NOTIFICATIONS',
    payload: {}
})
export const addNotification = (type, value) => ({
    type: 'ADD_NOTIFICATION',
    payload: { type, value }
})

export const setNewLevelCardVisible = (value) => ({
    type: 'SET_NEWLEVEL_CARD',
    payload: { value }
})

export const getAllTests = () => (dispatch) => {
    dispatch({ type: 'ALL_TESTS_REQUEST' });
    return axios
        .get('https://mrbackend.herokuapp.com/api/tests')
        .then(({ data }) => {
            dispatch({
                type: 'ALL_TESTS_SUCCESS',
                payload: {
                    data
                },
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'ALL_TESTS_FAILURE' })
        })
}

export const getTest = (slug) => (dispatch) => {
    dispatch({ type: 'TEST_REQUEST' });
    return axios
        .get('https://mrbackend.herokuapp.com/api/test', {
            params: {
                slug
            },
        })
        .then(({ data }) => {
            dispatch({
                type: 'TEST_SUCCESS',
                payload: {
                    data
                },
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'TEST_FAILURE' })
        })
}

export const getQuestions = (testID) => async (dispatch) => {
    dispatch({ type: 'QUESTIONS_REQUEST' });
    return axios
        .get('https://mrbackend.herokuapp.com/api/questions', {
            params: {
                testID
            },
        })
        .then(({ data }) => {
            dispatch({
                type: 'QUESTIONS_SUCCESS',
                payload: {
                    data
                },
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'QUESTIONS_FAILURE' })
        })
}

export const getDayQuestions = (testID) => async (dispatch) => {
    dispatch({ type: 'DAY_QUESTIONS_REQUEST' });
    return axios
        .get('https://mrbackend.herokuapp.com/api/questions', {
            params: {
                testID
            },
        })
        .then(({ data }) => {
            dispatch({
                type: 'DAY_QUESTIONS_SUCCESS',
                payload: {
                    data
                },
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'DAY_QUESTIONS_FAILURE' })
        })
}

export const getQuestion = (id) => async (dispatch) => {
    dispatch({ type: 'QUESTION_REQUEST' });
    return axios
        .get('https://mrbackend.herokuapp.com/api/question', {
            params: {
                id
            },
        })
        .then(({ data }) => {
            dispatch({
                type: 'QUESTION_SUCCESS',
                payload: {
                    data
                },
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'QUESTION_FAILURE' })
        })
}

export const getAllLessons = () => (dispatch) => {
    dispatch({ type: 'ALL_LESSONS_REQUEST' });
    return axios
        .get('https://mrbackend.herokuapp.com/api/lessons')
        .then(({ data }) => {
            dispatch({
                type: 'ALL_LESSONS_SUCCESS',
                payload: {
                    data
                },
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'ALL_LESSONS_FAILURE' })
        })
}

export const getLesson = (slug) => (dispatch) => {
    dispatch({ type: 'LESSON_REQUEST' });
    return axios
        .get('https://mrbackend.herokuapp.com/api/lesson', {
            params: {
                slug
            },
        })
        .then(({ data }) => {
            dispatch({
                type: 'LESSON_SUCCESS',
                payload: {
                    data
                },
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: 'LESSON_FAILURE' })
        })
}