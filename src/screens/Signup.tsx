import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {signUpUser} from '../services/firebase';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';

const signupValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password is too short')
    .required('Password is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

const Signup = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={signupValidationSchema}
        onSubmit={async (values: {email: string; password: string}) => {
          const user = await signUpUser(values.email, values.password);
          user && navigation.replace('Home');
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              label="Email"
              mode="outlined"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              style={styles.input}
              error={touched.email && !!errors.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              style={styles.input}
              error={touched.password && !!errors.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}>
              Sign Up
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default Signup;
