import React, { useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Modal, Portal, Chip, Text } from 'react-native-paper'
import {
  categoryMap,
  categoryArray as dataSource,
} from '../config/categories.config'

const CategoryModal = ({ visible, hideModal, setTag }) => {
  const onSelectCategory = categoryItem => {
    setTag(categoryItem.key)
    hideModal()
  }

  const renderItem = ({ item }) => {
    const style = item.style || {}
    const textStyle = item.textStyle || {}
    const chipStyle = { ...styles.chip, ...style }
    return (
      <Chip
        mode="outlined"
        icon={item.icon}
        style={chipStyle}
        textStyle={textStyle}
        onPress={() => onSelectCategory(item)}>
        {item.key}
      </Chip>
    )
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <FlatList
          data={dataSource}
          renderItem={renderItem}
          keyExtractor={item => item.icon}
        />
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    marginHorizontal: 25,
    marginVertical: 65,
    padding: 50,
    flex: 1,
  },
  chip: {
    margin: 5,
  },
})

export default CategoryModal
