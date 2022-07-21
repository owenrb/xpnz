import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Chip } from 'react-native-paper'
import { categoryMap } from '../config/categories.config'
import { currencyFormat } from '../utils/tools'
import { PESO_SYMBOL } from '../config/constants'

const OverviewScreen = () => {
  const dispatch = useDispatch()
  const journal = useSelector(state => state.journal)

  const [entries, setEntries] = useState([])
  const [max, setMax] = useState(0.0)
  const [total, setTotal] = useState(0.0)

  const printPerc = value => {
    const perc = (value / max) * 30 + 65

    // return perc + '%'
    return perc.toFixed(2) + '%'
  }

  const printPiePerc = value => {
    const perc = (value / total) * 100

    // return perc + '%'
    return perc.toFixed(1) + '%'
  }

  useEffect(() => {
    const map = new Object()
    let maxVal = 0.0
    let totalVal = 0.0

    journal.entries.forEach(item => {
      const { category, amount, income } = item
      const value = parseFloat(amount)

      if (income !== 'false') return

      totalVal += value
      if (maxVal < value) maxVal = value

      if (category in map) {
        map[category] += value
      } else {
        map[category] = value
      }
    })

    setMax(maxVal)
    setTotal(totalVal)

    const summary = Object.entries(map)
      .map(([k, v]) => ({
        category: [k],
        amount: v,
      }))
      .sort((a, b) => b.amount - a.amount)

    setEntries(summary)
  }, [journal])

  return (
    <SafeAreaView>
      <Text style={styles.summaryChip}>Monthly Expense Summary</Text>

      <FlatList
        data={entries}
        renderItem={({ item, index }) => {
          const { category, amount } = item
          const { icon, textStyle, style, label } = categoryMap[category]
          return (
            <Chip
              icon={icon}
              mode="outlined"
              style={{
                ...style,
                ...styles.summaryChip,
                width: printPerc(amount),
              }}
              textStyle={textStyle}>
              <Text style={textStyle}>
                {label}: {currencyFormat(amount, PESO_SYMBOL)} (
                {printPiePerc(amount)})
              </Text>
            </Chip>
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  summaryChip: { marginHorizontal: 3, marginVertical: 2 },
})

export default OverviewScreen
