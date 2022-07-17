import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import { categoryMap } from '../config/categories.config'
import { Chip } from 'react-native-paper'
import { DATE_FORMAT, DATE_DIVIDER } from '../config/constants'
import moment from 'moment'
import { currencyFormat } from '../utils/tools'

export default TransactionItem = ({ item, index }) => {
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

const styles = StyleSheet.create({
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
