const initialState = {
    loading: false,
    isAuthenticated:false,
    account: null
};

const users = ((state = initialState, action) => {
    let { type, data } = action;
    // console.log(type,data);
    switch (type) {
        case "SET_LOADING":
            return { ...state, loading: data};
        case "SET_AUTH":
            return { ...state, isAuthenticated: data.isAuthenticated, account: data.account};
        default: 
            return state;
    }
})

export default users;