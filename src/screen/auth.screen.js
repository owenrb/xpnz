import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from '@rneui/base'
import { loginUser, getEntries } from '../store/actions/index'
import { showToast } from '../utils/tools'

const AuthScreen = () => {
  const dispatch = useDispatch()
  const error = useSelector(state => state.auth.error)
  const [secureEntry, setSecureEntry] = useState(true)
  const [loading, setLoading] = useState(true)

  const handleSubmit = async values => {
    setLoading(true)
    console.log('handle-submit')
    dispatch(await loginUser(values))

    dispatch(await getEntries())
  }

  useEffect(() => {
    if (error) {
      showToast('error', 'Sorry', error)
    }
  }, [error])

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            email: 'owenrbee@gmail.com',
            password: 's3cr3t',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('The email is required'),
            password: Yup.string()
              .required('The password is required')
              .max(10, 'Must be 10 characters or less'),
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
              <Input
                placeholder="Email"
                leftIcon={{ type: 'antdesign', name: 'mail', color: 'white' }}
                inputStyles={styles.inputStyle}
                placeholderTextColor={'grey'}
                inputContainerStyle={styles.inputContainerStyle}
                renderErrorMessage={errors.email && touched.email}
                errorMessage={errors.email}
                errorStyle={{ color: 'black' }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <Input
                placeholder="Password"
                secureTextEntry={secureEntry}
                leftIcon={{ type: 'antdesign', name: 'lock', color: 'white' }}
                rightIcon={{
                  type: 'antdesign',
                  name: secureEntry ? 'eye' : 'eyeo',
                  onPress: () => setSecureEntry(!secureEntry),
                }}
                inputStyles={styles.inputStyle}
                placeholderTextColor={'grey'}
                inputContainerStyle={styles.inputContainerStyle}
                renderErrorMessage={errors.password && touched.password}
                errorMessage={errors.password}
                errorStyle={{ color: 'black' }}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <Button
                title={'Login'}
                buttonStyle={{
                  marginTop: 20,
                }}
                titleStyle={{ width: '100%' }}
                onPress={handleSubmit}
                //loading={}
              />
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
    padding: 50,
    alignItems: 'center',
  },
  inputStyle: {
    fontSize: 15,
    color: 'white',
  },
  inputContainerStyle: {
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
  },
})

export default AuthScreen
