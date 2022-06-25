
const addIncome = (income) =>({
    type: 'ADD_INCOME',
    payload: income
})

const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    payload: expense
})

export {addIncome, addExpense }