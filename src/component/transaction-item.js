import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native'
import { categoryMap } from '../config/categories.config'
import { Chip } from 'react-native-paper'
import { DATE_FORMAT, DATE_DIVIDER } from '../config/constants'
import moment from 'moment'
import { currencyFormat } from '../utils/tools'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Avatar } from 'react-native-paper'
import { color } from '@rneui/base'

const SCREEN_WIDTH = Dimensions.get('window').width

export default TransactionItem = ({
  item,
  index,
  handleEdit,
  handleDelete,
}) => {
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
  //console.log({ item })

  const leftSwipe = (progress, dragX) => {
    return (
      <TouchableOpacity onPress={handleEdit} activeOpacity={0.6}>
        <View style={styles.editBox}>
          <Avatar.Icon size={32} color="white" icon="pencil-outline" />
        </View>
      </TouchableOpacity>
    )
  }

  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })
    return (
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Avatar.Icon size={32} color="white" icon="trash-can-outline" />
        </View>
      </TouchableOpacity>
    )
  }

  // <Text>{moment().format('DD (ddd)')}</Text>
  return (
    <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
      <View style={styles.contentContainer}>
        <Chip
          icon={icon}
          style={{ ...style, width: '40%' }}
          textStyle={textStyle}>
          <Text style={textStyle}>{label}</Text>
        </Chip>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.amountColumn}>
          <View style={styles.currencyContainer}>
            <Text style={styles.amount}>{currencyFormat(amount)}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
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
  editBox: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    borderRadius: 5,
    paddingLeft: 2,
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    borderRadius: 5,
    paddingLeft: 2,
  },
  descriptionContainer: {
    width: '35%',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  description: {
    fontStyle: 'italic',
    color: 'darkgray',
  },
})
