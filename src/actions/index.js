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

export const logoutUser = () => (dispatch) => {
    dispatch({
        type: 'LOGOUT_USER_SUCCESS',
    })
}

export const errorCodeReset = () => (dispatch) => {
    console.log("reset");
    dispatch({
        type: 'ERRORCODE_RESET_SUCCESS',
    })
}

export const addUserStats = () => (dispatch, getState) => {
    dispatch({ type: 'ADD_USER_STATS_REQUEST' });
    console.log("dodawanie");
    return axios
        .post('https://mrbackend.herokuapp.com/api/userstats', {
            userID: getState().createdUserId,
            points: 0,
            dayQuestion: false,
            level: "żółtodziób",
            avatarType: "boy1"
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
    console.log(userStats);
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

export const removeNotifications = () => ({
    type: 'REMOVE_NOTIFICATIONS',
    payload: {}
})
export const addNotification = (type, value) => ({
    type: 'ADD_NOTIFICATION',
    payload: { type, value }
})
export const addPoints = (points) => ({
    type: 'ADD_POINTS',
    payload: { points }
})
export const setDayquestAnswered = () => ({
    type: 'SET_DAYQUEST_ANSWERED',
    payload: {}
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

export const getQuestions = (testID) => (dispatch) => {
    dispatch({ type: 'QUESTIONS_REQUEST' });
    return axios
        .get('https://mrbackend.herokuapp.com/api/question', {
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