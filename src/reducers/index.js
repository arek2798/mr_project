const initialState = {
    userID: '',
    isLoading: false,
    newLevelCardVisible: false,
    userStats: '',
    tests: [],
    currentTest: '',
    questions: [],
    lessons: [],
    currentLesson: '',
    notifications: [],
    dayQuestion: ''
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ('ADD_USER_REQUEST'):
            return {
                ...state,
                isLoading: true
            }
        case ('ADD_USER_SUCCESS'):
            localStorage.setItem('createdUserId', action.payload.data.id);
            return {
                ...state,
                errorCode: action.payload.data.errorCode,
                createdUserId: action.payload.data.id,
                isLoading: false
            }
        case ('LOGIN_USER_REQUEST'):
            return {
                ...state,
                isLoading: true
            }
        case ('LOGIN_USER_SUCCESS'):
            localStorage.setItem('userID', action.payload.data._id);
            return {
                ...state,
                userID: action.payload.data._id,
                user: action.payload.data,
                errorCode: action.payload.data.errorCode,
                isLoading: false
            }
        case ('DELETE_USER_SUCCESS'):
            localStorage.removeItem('userID');
            return {
                ...state,
                userID: '',
                isLoading: false,
                newLevelCardVisible: false,
                userStats: '',
                tests: [],
                currentTest: '',
                questions: [],
                lessons: [],
                currentLesson: '',
                notifications: [],
                dayQuestion: '',
                errorCode: 204
            }
        case ('LOGOUT_USER_SUCCESS'):
            localStorage.removeItem('userID');
            return {
                ...state,
                userID: '',
                isLoading: false,
                newLevelCardVisible: false,
                userStats: '',
                tests: [],
                currentTest: '',
                questions: [],
                lessons: [],
                currentLesson: '',
                notifications: [],
                dayQuestion: ''
            }
        case ('UPDATE_USER_SUCCESS'):
            return {
                ...state,
                errorCode: action.payload.data.errorCode
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
        case ('DELETE_USER_STATS_REQUEST'):
            return {
                ...state
            }
        case ('REMOVE_NOTIFICATIONS'):
            return {
                ...state,
                notifications: []
            }
        case ('SET_NEWLEVEL_CARD'):
            console.log(action.payload.value);
            return {
                ...state,
                newLevelCardVisible: action.payload.value
            }
        case ('ADD_NOTIFICATION'):
            let notiContent;
            let notiValue = action.payload.value;
            switch (action.payload.type) {
                case ('points'):
                    notiContent = `Otrzymałeś ${action.payload.value} pkt`;
                    notiValue = '+' + action.payload.value;
                    break;
                case ('level'): notiContent = `Osiągnąłeś kolejny level`;
                    break;
                case ('badge'): notiContent = `Otrzymałeś nową odznakę`;
                    break;
                default: notiContent = "Powiadomienie";
            }
            const newNotifcation = {
                type: action.payload.type,
                value: notiValue,
                content: notiContent
            }
            return {
                ...state,
                notifications: [...state.notifications, newNotifcation]
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
        case ('DAY_QUESTIONS_REQUEST'):
            return {
                ...state,
                isLoading: true,
            }
        case ('DAY_QUESTIONS_SUCCESS'):
            return {
                ...state,
                dayQuestions: action.payload.data,
                isLoading: false
            }
        case ('QUESTION_REQUEST'):
            return {
                ...state,
                isLoading: true,
            }
        case ('QUESTION_SUCCESS'):
            return {
                ...state,
                dayQuestion: action.payload.data[0],
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
        case ('ALL_LESSONS_REQUEST'):
            return {
                ...state,
                isLoading: true,
            }
        case ('ALL_LESSONS_SUCCESS'):
            return {
                ...state,
                lessons: action.payload.data,
                isLoading: false
            }
        case ('LESSON_SUCCESS'):
            return {
                ...state,
                currentLesson: action.payload.data[0]
            }
        default:
            return state;
    }
}

export default rootReducer;