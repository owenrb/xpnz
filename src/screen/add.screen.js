import React, { useState } from 'react'
import { StyleSheet, View, Keyboard } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { Input } from '@rneui/base'
import { Switch, Text } from '@rneui/themed'
import DatePicker from 'react-native-date-picker'
import { Calculator } from 'react-native-calculator'
import {
  Modal,
  Portal,
  Chip,
  DefaultTheme,
  Provider,
  Button,
} from 'react-native-paper'
import CategoryModal from '../component/categoryModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { categoryMap } from '../config/categories.config'
import { addEntry } from '../store/actions'
import DropDown from 'react-native-paper-dropdown'
import { monthList } from '../config/repeat.config'
import { DATE_FORMAT } from '../config/constants'

const InputScreen = ({ navigation, route }) => {
  console.log({ route })
  const { id } = route.params
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user')
      if (value !== null) {
        const user = JSON.parse(value)

        const arr = user.profile.tags
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
    Keyboard.dismiss()
    fetchData()
    setVisible(true)
  }
  const hideModal = () => setVisible(false)

  // calculator
  const [visibleCalc, setVisibleCalc] = useState(false)
  const showModalCalc = () => {
    Keyboard.dismiss()
    setVisibleCalc(true)
  }
  const hideModalCalc = () => setVisibleCalc(false)

  // category
  const [categories, setCategories] = useState([])

  const handleSubmit = async values => {
    console.log({ values })
    dispatch(await addEntry(values))
    if (!addAgain) navigation.navigate('Journal')
  }

  // repeat
  const [showDropDown, setShowDropDown] = useState(false)

  const [addAgain, setAddAgain] = useState(false)

  //<ScrollView contentContainerStyle={styles.contentContainer}>

  return (
    <Provider theme={DefaultTheme}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            income: 'false',
            date: moment().format(DATE_FORMAT),
            description: '',
            category: 'misc',
            amount: '0.00',
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
                  {moment(values.date, DATE_FORMAT).toDate().toDateString()}
                </Button>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={moment(values.date, DATE_FORMAT).toDate()}
                  onConfirm={date => {
                    setOpen(false)
                    handleChange('date')(moment(date).format(DATE_FORMAT))
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
                        handleChange('amount')(value + '')
                        hideModalCalc()
                      }}
                    />
                  </Modal>
                </Portal>
              </View>
              <View style={styles.row}>
                <DropDown
                  label={'Repeat'}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={values.repeat}
                  setValue={handleChange('repeat')}
                  list={monthList}
                  dropDownStyle={{ marginTop: -20 }}
                />
              </View>
              <View style={styles.row}>
                <Button
                  mode="contained"
                  style={styles.saveButtons}
                  onPress={x => {
                    setAddAgain(false)
                    handleSubmit(x)
                  }}>
                  Save
                </Button>
                <Button
                  mode="contained"
                  style={styles.saveButtons}
                  onPress={x => {
                    setAddAgain(true)
                    handleSubmit(x)
                  }}>
                  Save +
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </Provider>
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
  saveButtons: { margin: 5, width: 100, borderRadius: 9 },
})

export default InputScreen
