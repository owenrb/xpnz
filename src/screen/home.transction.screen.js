import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { categoryMap } from '../config/categories.config'
import { Chip } from 'react-native-paper'

const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_FORMAT_SHORT = 'DD (ddd)'
const DATE_DIVIDER = '-date-divider-'

function currencyFormat(numStr) {
  const num = parseFloat(numStr)
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const TransactionScreen = txnScreen => {
  const dispatch = useDispatch()
  const journal = useSelector(state => state.journal)

  const [entries, setEntries] = useState([])

  useEffect(() => {
    const arr = []
      .concat(journal.entries)
      // sort by date
      .sort((a, b) => {
        d1 = moment(a.date, DATE_FORMAT)
        d2 = moment(b.date, DATE_FORMAT)
        return d1.isAfter(d2)
      })
      // add date separator
      .flatMap((item, idx, list) => {
        d1 = (
          idx === 0 ? moment() : moment(list[idx - 1].date, DATE_FORMAT)
        ).format(DATE_FORMAT_SHORT)
        d2 = moment(item.date, DATE_FORMAT).format(DATE_FORMAT_SHORT)

        console.log({ idx, d1, d2 })

        return d1 === d2
          ? [item]
          : [
              {
                category: DATE_DIVIDER,
                date: d2,
              },
              item,
            ]
      })

    setEntries(arr)
  }, [journal])

  const renderItem = ({ item, index }) => {
    const { amount, category, date, description, income } = item

    if (category === DATE_DIVIDER) {
      return (
        <View>
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
      <Text>Here's your transaction</Text>
      <FlatList data={entries} renderItem={renderItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: 'skyblue',
    width: '100%',
  },
  contentContainerColumn1: {
    flex: 1,
    width: '50%',
  },
  contentContainerColumn2: {
    flex: 2,
    backgroundColor: 'pink',
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
})

export default TransactionScreen
