import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from '@rneui/base'
import { loginUser, getEntries } from '../store/actions/index'
import { showToast } from '../utils/tools'
import BiometricButton from '../component/biometric.button'

const AuthScreen = props => {
  console.log({ props })
  const dispatch = useDispatch()
  const error = useSelector(state => state.auth.error)
  const [secureEntry, setSecureEntry] = useState(true)
  const [loading, setLoading] = useState(true)

  const loadEntries = async () => {
    dispatch(await getEntries())
  }

  const handleSubmit = async values => {
    setLoading(true)
    console.log({ login: values })
    console.log('handle-submit')
    dispatch(await loginUser(values))
  }

  useEffect(() => {
    loadEntries()
    if (error) {
      showToast('error', 'Sorry', error)
    }
  }, [error])

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            password: '',
          }}
          validationSchema={Yup.object({
            password: Yup.string().required('The password is required'),
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
                placeholder="Passcode"
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
                  marginVertical: 20,
                }}
                titleStyle={{ width: '100%' }}
                onPress={handleSubmit}
                //loading={}
              />
              <BiometricButton />
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
    marginTop: 250,
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
