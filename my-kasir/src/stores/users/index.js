const initialState = {
    loading: false,
    account: null
};

const users = ((state = initialState, action) => {
    let { type, data } = action;
    console.log(type,data);
    switch (type) {
        case "SET_LOADING":
            return { ...state, loading: data};
        case "SET_LOGIN":
            return { ...state, account: data };
        default: 
            return state;
    }
})

export default users;