import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Modal, Portal, Text, Chip, Button } from 'react-native-paper'
import {
  categoryMap,
  categoryArray as dataSource,
} from '../config/categories.config'
import { Formik } from 'formik'
import moment from 'moment'
import * as Yup from 'yup'
import { Switch } from '@rneui/themed'
import DatePicker from 'react-native-date-picker'
import { Calculator } from 'react-native-calculator'
import { Input } from '@rneui/base'

const EditItemModal = ({ visible, hideModal, selectedItem }) => {
  console.log({ selectedItem })
  const { category } = selectedItem
  const tag = categoryMap[category || 'misc']

  const [open, setOpen] = useState(false)

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <Formik
          initialValues={{
            income: selectedItem.income,
            date: selectedItem.date,
            description: selectedItem.description,
            category: selectedItem.category,
            amount: selectedItem.amount,
            repeat: '0',
          }}
          validationSchema={Yup.object({
            income: Yup.boolean(),
            date: Yup.string().required('Date is required'),
            description: Yup.string(),
            category: Yup.string().required('Category is required'),
            amount: Yup.number().required().moreThan(0, 'Please entery amount'),
            repeat: Yup.number().required(),
          })}
          onSubmit={(values, formikBag) => {
            handleSubmit(values)

            const { resetForm } = formikBag
            resetForm()
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            values,
            touched,
            errors,
          }) => (
            <>
              <Chip
                mode="outlined"
                icon={tag.icon}
                style={tag.style}
                textStyle={tag.textStyle}>
                {tag.label}
              </Chip>
              <View style={styles.row}>
                <Text style={styles.text}>
                  {values.income === 'true' ? 'Income' : 'Expense'}
                </Text>
                <Switch
                  onValueChange={value =>
                    handleChange('income')(value ? 'true' : 'false')
                  }
                  value={values.income === 'true'}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Date</Text>
                <Button style={styles.text} onPress={() => setOpen(true)}>
                  {moment(values.date, 'YYYY-MM-DD').toDate().toDateString()}
                </Button>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={moment(values.date, 'YYYY-MM-DD').toDate()}
                  onConfirm={date => {
                    setOpen(false)
                    handleChange('date')(moment(date).format('YYYY-MM-DD'))
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Description</Text>
                <Input
                  placeholder="Description"
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Amount</Text>
                <Input
                  placeholder="0.00"
                  rightIcon={{
                    type: 'antdesign',
                    name: 'calculator',
                  }}
                  onChangeText={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  value={values.amount}
                  errorMessage={errors.amount}
                />
              </View>
            </>
          )}
        </Formik>
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
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    //alignContent: 'space-between',
  },
  chip: {
    margin: 5,
  },
  text: {
    paddingTop: 5,
    paddingHorizontal: 8,
  },
})

export default EditItemModal
