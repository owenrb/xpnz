import React, { useState } from 'react'
import { StyleSheet, Text, FlatList, View } from 'react-native'
import { currencyFormat } from '../utils/tools'
import {
  PESO_SYMBOL,
  DATE_FORMAT,
  DATE_FORMAT_SHORT,
} from '../config/constants'
import { RectButton } from 'react-native-gesture-handler'
import { Avatar, ProgressBar } from 'react-native-paper'
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native'
import moment from 'moment'

const printProgress = (value, max) => {
  const perc = value / max
  const norm = (perc > 1 ? 1.0 : perc).toFixed(2)

  return parseFloat(norm)
}

const printPiePerc = (value, total) => {
  const perc = (value / total) * 100

  // return perc + '%'
  return perc.toFixed(1) + '%'
}

export default SummaryItem = ({
  icon,
  iconColor,
  progressColor,
  label,
  amount,
  total,
  max,
  details,
}) => {
  return (
    <Collapse>
      <CollapseHeader style={styles.rectButton}>
        <Avatar.Icon
          size={32}
          style={styles.avatar}
          color={iconColor}
          icon={icon}
        />
        <Text style={styles.fromText}>{label}</Text>
        <Text style={styles.amountText}>
          {currencyFormat(amount, PESO_SYMBOL)} ({printPiePerc(amount, total)})
        </Text>
        <ProgressBar
          progress={printProgress(amount, max)}
          color={progressColor}
        />
      </CollapseHeader>
      <CollapseBody>
        <FlatList
          data={details}
          renderItem={({ item, index }) => {
            console.log({ item })
            return (
              <RectButton style={styles.rectDetail}>
                <Text style={styles.fromText}>
                  {moment(item.date, DATE_FORMAT).format(DATE_FORMAT_SHORT)}{' '}
                  {item.description}
                </Text>
                <Text style={styles.amountText}>
                  {currencyFormat(item.value, PESO_SYMBOL)}
                </Text>
              </RectButton>
            )
          }}
        />
        <View style={{ height: 7 }} />
      </CollapseBody>
    </Collapse>
  )
}

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  rectDetail: {
    flex: 1,
    height: 30,
    paddingVertical: 3,
    paddingHorizontal: 7,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  avatar: {
    position: 'absolute',
    left: 5,
    top: 3,
  },
  fromText: {
    //marginTop: -50,
    marginLeft: 25,
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
