import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Modal,
  Portal,
  Text,
  Button,
  Checkbox,
  DefaultTheme,
  Provider,
} from 'react-native-paper'
import { categoryMap, comboArray } from '../config/categories.config'
import { Formik } from 'formik'
import moment from 'moment'
import * as Yup from 'yup'
import { Switch } from '@rneui/themed'
import DatePicker from 'react-native-date-picker'
import { Input } from '@rneui/base'
import DropDownPicker from 'react-native-dropdown-picker'
import { useDispatch } from 'react-redux'
import { editEntry } from '../store/actions'

const EditItemModal = ({ visible, hideModal, selectedItem }) => {
  //console.log({ selectedItem })
  const dispatch = useDispatch()

  const { category } = selectedItem
  const tag = categoryMap[category || 'misc']

  const [open, setOpen] = useState(false)
  const [split, setSplit] = useState(false)

  const [open1, setOpen1] = useState(false)
  const [value1, setValue1] = useState('misc')
  const [open2, setOpen2] = useState(false)
  const [value2, setValue2] = useState('misc')

  useEffect(() => {
    setValue1(category || 'misc')
    setValue2(category || 'misc')
  }, [selectedItem.id || ''])

  const handleSubmit = async (id, values) => {
    console.log({ id, values })
    dispatch(await editEntry(id, values))
    hideModal()
  }

  return (
    <Portal>
      <Provider theme={DefaultTheme}>
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
              split: 'false',
              category2: '',
              description2: '',
              amount2: '0.00',
            }}
            validationSchema={Yup.object({
              income: Yup.boolean(),
              date: Yup.string().required('Date is required'),
              description: Yup.string(),
              category: Yup.string().required('Category is required'),
              amount: Yup.number()
                .required()
                .moreThan(0, 'Please entery amount'),
              split: Yup.boolean(),
              category2: Yup.string(),
              description2: Yup.string(),
              amount2: Yup.number(),
            })}
            onSubmit={(values, formikBag) => {
              handleSubmit(selectedItem.id, values)

              const { resetForm } = formikBag
              resetForm()
              setSplit(false)
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
                <DropDownPicker
                  items={comboArray}
                  open={open1}
                  value={value1}
                  setOpen={setOpen1}
                  setValue={setValue1}
                  onChangeValue={handleChange('category')}
                  style={styles.dropdown}
                />
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
                      color: split ? 'gray' : 'magenta',
                    }}
                    onChangeText={handleChange('amount')}
                    onBlur={handleBlur('amount')}
                    value={values.amount}
                    errorMessage={errors.amount}
                    disabled={split}
                  />
                </View>
                <Checkbox.Item
                  label="Split"
                  status={split ? 'checked' : 'unchecked'}
                  onPress={() => {
                    handleChange('split')(split ? 'false' : 'true')
                    setSplit(!split)
                  }}
                  mode="android"
                  color="magenta"
                />
                <DropDownPicker
                  items={comboArray}
                  open={open2}
                  value={value2}
                  setOpen={setOpen2}
                  setValue={setValue2}
                  disabled={!split}
                  style={{
                    ...styles.dropdown,
                    backgroundColor: split ? 'white' : 'pink',
                  }}
                  labelStyle={{ color: split ? 'black' : 'grey' }}
                  onChangeValue={handleChange('category2')}
                />
                <Input
                  placeholder="Description"
                  onChangeText={handleChange('description2')}
                  onBlur={handleBlur('description2')}
                  value={values.description2}
                  disabled={!split}
                />
                <Input
                  placeholder="Amount"
                  rightIcon={{
                    type: 'antdesign',
                    name: 'calculator',
                    color: split ? 'magenta' : 'gray',
                  }}
                  onChangeText={value => {
                    handleChange('amount2')(value)

                    try {
                      const v = parseFloat(value)
                      const s = selectedItem.amount - v
                      if (s > 0.0) {
                        handleChange('amount')(s + '')
                      }
                    } catch (err) {
                      handleChange('amount')(selectedItem.amount + '')
                      console.log({ err })
                    }
                  }}
                  onBlur={handleBlur('amount2')}
                  value={values.amount2}
                  errorMessage={errors.amount2}
                  disabled={!split}
                />
                <Button
                  mode="contained"
                  onPress={x => handleSubmit(x)}
                  disabled={
                    split &&
                    (parseFloat(values.amount2) == 0.0 ||
                      parseFloat(values.amount) + parseFloat(values.amount2) !=
                        selectedItem.amount)
                  }>
                  Update
                </Button>
              </>
            )}
          </Formik>
        </Modal>
      </Provider>
    </Portal>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'pink',
    marginHorizontal: 25,
    marginVertical: 55,
    padding: 20,
    flex: 1,
  },
  container: {
    flex: 1,
    //padding: 15,
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
  dropdown: { marginBottom: 10 },
})

export default EditItemModal
