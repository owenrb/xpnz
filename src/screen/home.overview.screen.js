import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { categoryMap } from '../config/categories.config'
import SummaryItem from '../component/summary-item'

const OverviewScreen = () => {
  const dispatch = useDispatch()
  const journal = useSelector(state => state.journal)

  const [entries, setEntries] = useState([])
  const [max, setMax] = useState(0.0)
  const [total, setTotal] = useState(0.0)
  const [detailMap, setDetailMap] = useState({})

  useEffect(() => {
    const map = new Object()
    const mapDetail = new Object()

    let maxVal = 0.0
    let totalVal = 0.0

    journal.entries.forEach(item => {
      const { category, amount, income, date, description } = item
      const value = parseFloat(amount)

      if (income !== 'false') return

      totalVal += value
      if (maxVal < value) maxVal = value

      if (category in map) {
        map[category] += value
      } else {
        map[category] = value
      }

      if (category in mapDetail) {
        mapDetail[category].push({ date, description, value })
      } else {
        mapDetail[category] = [{ date, description, value }]
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
    setDetailMap(mapDetail)
  }, [journal])

  return (
    <SafeAreaView>
      <Text style={styles.summaryChip}> Monthly Expense Summary</Text>

      <FlatList
        data={entries}
        renderItem={({ item, index }) => {
          const { category, amount } = item
          const { icon, textStyle, style, label } = categoryMap[category]
          return (
            <SummaryItem
              icon={icon}
              iconColor={style.borderColor}
              progressColor={textStyle.color}
              label={label}
              amount={amount}
              total={total}
              max={max}
              details={detailMap[category]}
            />
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
