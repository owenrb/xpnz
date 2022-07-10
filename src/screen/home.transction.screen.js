import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { categoryMap } from '../config/categories.config'
import { Chip } from 'react-native-paper'

const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_FORMAT_SHORT = 'DD (ddd)'
const DATE_DIVIDER = '-date-divider-'
const PESO_SYMBOL = '\u20B1'

function currencyFormat(numStr, symbol) {
  const num = parseFloat(numStr)
  sym = symbol || ''
  return sym + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

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

const TransactionScreen = txnScreen => {
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

  const renderItem = ({ item, index }) => {
    const { amount, category, date, description, income } = item

    if (category === DATE_DIVIDER) {
      return (
        <View style={styles.dateDivider}>
          <Text>{date}</Text>
        </View>
      )
    }

    const parsed = moment(date, DATE_FORMAT)
    const { icon, textStyle, style, label } = categoryMap[category]
    console.log({ item })

    // <Text>{moment().format('DD (ddd)')}</Text>
    return (
      <View style={styles.contentContainer}>
        <Chip
          icon={icon}
          style={{ ...style, width: '40%' }}
          textStyle={textStyle}>
          <Text style={textStyle}>{label}</Text>
        </Chip>
        <View style={{ width: '35%' }}>
          <Text>{description}</Text>
        </View>
        <View style={styles.amountColumn}>
          <View style={styles.currencyContainer}>
            <Text style={styles.amount}>{currencyFormat(amount)}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View>
      <Headline expense={expense} income={income} />
      <FlatList data={entries} renderItem={renderItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  headline: {
    flexDirection: 'row',
  },
  headlineColumn: {
    width: '32%',
    backgroundColor: 'skyblue',
    borderRadius: 5,
    padding: 2,
    margin: 2,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 5,
    marginTop: 1,
    marginBottom: 1,
  },
  amountColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  currencyContainer: {
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  amount: {
    fontSize: 18,
  },
  dateDivider: {
    backgroundColor: 'lightgray',
    padding: 3,
    marginTop: 3,
    marginBottom: 1,
  },
})

export default TransactionScreen
