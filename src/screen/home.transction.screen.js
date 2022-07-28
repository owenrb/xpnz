import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { TransactionRow, TransactionItem } from '../component/transaction-item'
import {
  DATE_FORMAT,
  DATE_FORMAT_SHORT,
  DATE_DIVIDER,
  PESO_SYMBOL,
} from '../config/constants'
import { currencyFormat } from '../utils/tools'
import { deleteEntry } from '../store/actions'

const Headline = ({ income, expense }) => {
  const savings = income - expense
  const expenseStyle = savings < 0.0 ? { color: 'red' } : {}
  const savingsAbs =
    savings < 0.0
      ? '(' + currencyFormat(savings * -1, PESO_SYMBOL) + ')'
      : currencyFormat(savings, PESO_SYMBOL)

  return (
    <View style={styles.headline}>
      <View style={{ ...styles.headlineColumn, backgroundColor: 'aquamarine' }}>
        <Text style={{ color: 'darkgreen' }}>Income</Text>
        <Text style={styles.amount}>{currencyFormat(income, PESO_SYMBOL)}</Text>
      </View>
      <View style={{ ...styles.headlineColumn, backgroundColor: 'lightpink' }}>
        <Text style={{ color: 'purple' }}>Expense</Text>
        <Text style={styles.amount}>
          {currencyFormat(expense, PESO_SYMBOL)}
        </Text>
      </View>
      <View style={styles.headlineColumn}>
        <Text style={{ color: 'blue' }}>Savings</Text>
        <Text style={{ ...styles.amount, ...expenseStyle }}>{savingsAbs}</Text>
      </View>
    </View>
  )
}

const TransactionScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const journal = useSelector(state => state.journal)

  const [entries, setEntries] = useState([])
  const [income, setIncome] = useState(0.0)
  const [expense, setExpense] = useState(0.0)

  useEffect(() => {
    let inc = 0.0
    let exp = 0.0

    const arr = []
      .concat(journal.entries)
      // sort by date
      .sort((a, b) => {
        d1 = moment(a.date, DATE_FORMAT)
        d2 = moment(b.date, DATE_FORMAT)
        return d1.isAfter(d2)
      })
      // process data
      .flatMap((item, idx, list) => {
        const { amount, income } = item
        const a = parseFloat(amount)

        // compute summary
        if (income === 'false') exp += a
        else inc += a

        const d1 = (
          idx === 0 ? moment() : moment(list[idx - 1].date, DATE_FORMAT)
        ).format(DATE_FORMAT_SHORT)
        const d2 = moment(item.date, DATE_FORMAT).format(DATE_FORMAT_SHORT)

        return d1 === d2
          ? [item]
          : [
              // add date separator
              {
                category: DATE_DIVIDER,
                date: d2,
              },
              item,
            ]
      })

    setIncome(inc)
    setExpense(exp)

    setEntries(arr)
  }, [journal])

  const editItem = item => {
    navigation.navigate('Input', item)
  }

  const deleteItem = async item => {
    const { id, date } = item

    dispatch(await deleteEntry(id, moment(date, DATE_FORMAT).toDate()))
  }

  return (
    <SafeAreaView>
      <Headline expense={expense} income={income} />
      <FlatList
        data={entries}
        renderItem={({ item, index }) => {
          const { category } = item

          if (category === DATE_DIVIDER)
            return <TransactionItem item={item} index={index} />
          return (
            <TransactionRow
              handleEdit={() => editItem(item)}
              handleDelete={() => deleteItem(item)}>
              <TransactionItem item={item} index={index} />
            </TransactionRow>
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headline: {
    flexDirection: 'row',
    marginTop: 3,
    marginLeft: 2,
  },
  headlineColumn: {
    width: '32%',
    backgroundColor: 'skyblue',
    borderRadius: 5,
    padding: 2,
    margin: 2,
  },
})

export default TransactionScreen
