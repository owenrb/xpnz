import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from '@rneui/base'
import { Switch, Text } from '@rneui/themed'
import DatePicker from 'react-native-date-picker'
import { Calculator } from 'react-native-calculator'
import { Modal, Portal, Chip } from 'react-native-paper'
import CategoryModal from '../component/categoryModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { categoryMap } from '../config/categories.config'
import { addEntry } from '../store/actions'

const InputScreen = props => {
  console.log({ props })
  const { navigation } = props
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user')
      if (value !== null) {
        const user = JSON.parse(value)

        const arr = user.profile.tags
        console.log({ arr })
        setCategories(arr)
      }
    } catch (uee) {
      console.log({ uee })
    }
  }

  // tags/label
  const [visible, setVisible] = React.useState(false)
  const [tag, setTag] = React.useState({
    icon: 'bus',
    label: 'Transportation',
  })
  const showModal = () => {
    fetchData()
    setVisible(true)
  }
  const hideModal = () => setVisible(false)

  // calculator
  const [visibleCalc, setVisibleCalc] = useState(false)
  const showModalCalc = () => setVisibleCalc(true)
  const hideModalCalc = () => setVisibleCalc(false)

  // category
  const [categories, setCategories] = useState([])

  const handleSubmit = async values => {
    console.log({ values })
    dispatch(await addEntry(values))
    navigation.navigate('Transactions')
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            income: 'false',
            date: moment().format('YYYY-MM-DD'),
            description: '',
            category: 'transpo',
            amount: '0.00',
          }}
          validationSchema={Yup.object({
            income: Yup.boolean(),
            date: Yup.string().required('Date is required'),
            description: Yup.string(),
            category: Yup.string().required('Category is required'),
            amount: Yup.number().required().moreThan(0, 'Please entery amount'),
          })}
          onSubmit={values => handleSubmit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <>
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
                    setDate(date)
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
                <Text style={styles.text}>Category</Text>

                <Chip
                  icon={categoryMap[values.category].icon}
                  onPress={showModal}>
                  {categoryMap[values.category].label}
                </Chip>

                <CategoryModal
                  visible={visible}
                  hideModal={hideModal}
                  setTag={handleChange('category')}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Amount</Text>
                <Input
                  placeholder="0.00"
                  rightIcon={{
                    type: 'antdesign',
                    name: 'calculator',
                    onPress: () => showModalCalc(),
                  }}
                  onChangeText={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  value={values.amount}
                  errorMessage={errors.amount}
                />
                <Portal>
                  <Modal
                    visible={visibleCalc}
                    onDismiss={hideModalCalc}
                    contentContainerStyle={styles.calcContainerStyle}>
                    <Calculator
                      style={{ flex: 1 }}
                      hasAcceptButton={true}
                      onAccept={(value, text) => {
                        handleChange('amount')(text)
                        hideModalCalc()
                      }}
                    />
                  </Modal>
                </Portal>
              </View>
              <View style={styles.row}>
                <Button onPress={handleSubmit}>Save</Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: 'pink',
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
    alignContent: 'space-between',
  },
  text: {
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  inputStyle: {
    fontSize: 15,
    color: 'white',
  },
  inputContainerStyle: {
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
  },
  calcContainerStyle: {
    flex: 1,
    marginHorizontal: 50,
    marginVertical: 80,
    backgroundColor: 'white',
  },
})

export default InputScreen
