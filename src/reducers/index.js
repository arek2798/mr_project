const initialState = {
    // user: {
    //     id: 'h12g4h21k341234',
    //     name: 'Piotrek',
    // },
    // userStats: {
    //     userId: 'h12g4h21k341234',
    //     points: 34,
    //     dayQuestion: false,
    //     level: 'żółtodziób'
    // },
    userID: '',
    isLoading: false,
    userStats: '',
    tests: [],
    currentTest: '',
    questions: [],
    notifications: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ('ADD_USER_SUCCESS'):
            localStorage.setItem('createdUserId', action.payload.data.id);
            return {
                ...state,
                errorCode: action.payload.data.errorCode,
                createdUserId: action.payload.data.id
            }
        case ('LOGIN_USER_SUCCESS'):
            localStorage.setItem('userID', action.payload.data._id);
            return {
                ...state,
                userID: action.payload.data._id,
                user: action.payload.data,
                errorCode: action.payload.data.errorCode,
            }
        case ('LOGOUT_USER_SUCCESS'):
            localStorage.removeItem('userID');
            return {
                ...state,
                userID: '',
                isLoading: false,
                user: '',
                errorCode: 0,
                userStats: '',
                notifications: []
            }
        case ('ERRORCODE_RESET_SUCCESS'):
            return {
                ...state,
                errorCode: 0,
                createdUserId: ""
            }
        case ('USER_STATS_REQUEST'):
            return {
                ...state,
                isLoading: true
            }
        case ('USER_STATS_SUCCESS'):
            return {
                ...state,
                userStats: action.payload.data[0],
                isLoading: false
            }
        case ('REMOVE_NOTIFICATIONS'):
            return {
                ...state,
                notifications: []
            }
        case ('ADD_NOTIFICATION'):
            let notiContent;
            switch (action.payload.type) {
                case ('points'): notiContent = `Otrzymałeś ${action.payload.value} pkt`;
                    break;
                case ('level'): notiContent = `Osiągnąłeś kolejny level`;
                    break;
                default: notiContent = "Powiadomienie";
            }
            const newNotifcation = {
                type: action.payload.type,
                value: '+' + action.payload.value,
                content: notiContent
            }
            return {
                ...state,
                notifications: [...state.notifications, newNotifcation]
            }
        case ('ADD_POINTS'):
            return {
                ...state,
                userStats: {
                    ...state.userStats,
                    points: state.userStats.points + action.payload.points
                }
            }
        case ('SET_DAYQUEST_ANSWERED'):
            return {
                ...state,
                userStats: {
                    ...state.userStats,
                    dayQuestion: true
                }
            }
        case ('QUESTIONS_REQUEST'):
            return {
                ...state,
                isLoading: true,
            }
        case ('QUESTIONS_SUCCESS'):
            return {
                ...state,
                questions: action.payload.data,
                isLoading: false
            }
        case ('ALL_TESTS_REQUEST'):
            return {
                ...state,
                isLoading: true,
            }
        case ('ALL_TESTS_SUCCESS'):
            return {
                ...state,
                tests: action.payload.data,
                isLoading: false
            }
        case ('TEST_SUCCESS'):
            return {
                ...state,
                currentTest: action.payload.data[0]
            }
        default:
            return state;
    }
}

export default rootReducer;