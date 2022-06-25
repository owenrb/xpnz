import React, { useEffect, useState } from 'react'
import { Button, Text, View, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const TransactionScreen = txnScreen => {
  const dispatch = useDispatch()
  const journal = useSelector(state => state.journal)

  const [entries, setEntries] = useState([])

  useEffect(() => {
    setEntries(journal.entries)
  }, [journal])

  const renderItem = ({ item }) => {
    return <Text>{item.amount}</Text>
  }

  return (
    <View>
      <Text>Here's your transaction</Text>
      <FlatList data={entries} renderItem={renderItem} />
    </View>
  )
}

export default TransactionScreen
