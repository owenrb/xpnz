const INITIAL_STATE = {
    user: null,
    date: new Date(),
    income: false,
    label: null,
    description: null
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state
    }
}