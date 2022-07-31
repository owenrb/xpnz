import React, { Component } from 'react'
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
import { DATE_FORMAT, DATE_DIVIDER, PESO_SYMBOL } from '../config/constants'
import moment from 'moment'
import { currencyFormat } from '../utils/tools'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Avatar } from 'react-native-paper'
import { RectButton } from 'react-native-gesture-handler'

const SCREEN_WIDTH = Dimensions.get('window').width

export class TransactionRow extends Component {
  leftSwipe = (progress, dragX) => {
    return (
      <TouchableOpacity onPress={this.props.handleEdit} activeOpacity={0.6}>
        <View style={styles.editBox}>
          <Avatar.Icon size={32} color="white" icon="pencil-outline" />
        </View>
      </TouchableOpacity>
    )
  }

  rightSwipe = (progress, dragX) => {
    return (
      <TouchableOpacity onPress={this.props.handleDelete} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Avatar.Icon size={32} color="white" icon="trash-can-outline" />
        </View>
      </TouchableOpacity>
    )
  }

  updateRef = ref => {
    this._swipeableRow = ref
  }
  close = () => {
    setTimeout(() => {
      if (this && this._swipeableRow) this._swipeableRow.close()
    }, 2000)
  }

  render() {
    const { children } = this.props
    return (
      <Swipeable
        ref={this.updateRef}
        renderLeftActions={this.leftSwipe}
        renderRightActions={this.rightSwipe}
        onSwipeableWillOpen={this.close}>
        {children}
      </Swipeable>
    )
  }
}

export const TransactionItem = ({ item, index, handleEdit, handleDelete }) => {
  const { amount, category, date, description, income } = item

  if (category === DATE_DIVIDER) {
    return (
      <View style={styles.dateDivider}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    )
  }

  const { label } = categoryMap[category]

  return (
    <RectButton style={styles.rectButton}>
      <Text style={styles.fromText}>{label}</Text>
      <Text numberOfLines={1} style={styles.messageText}>
        {description}
      </Text>
      <Text style={styles.amountText}>
        {currencyFormat(amount, PESO_SYMBOL)}
      </Text>
    </RectButton>
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
    backgroundColor: 'white',
    paddingTop: 8,
    //marginTop: 3,
    marginBottom: 2,
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

  rectButton: {
    flex: 1,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    color: '#777',
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  amountText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
})
