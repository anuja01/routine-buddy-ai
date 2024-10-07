import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text, Snackbar} from 'react-native-paper';
import {Formik} from 'formik';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {signInUser} from '../services/firebase';

// Define the types for the form values
interface LoginFormValues {
  email: string;
  password: string;
}

// Validation schema using Yup
const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const LoginScreen: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  // Initial form values
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const showToast = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };
  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={async (values: LoginFormValues) => {
          try {
            const user = await signInUser(values.email, values.password);
            user && navigation.replace('Home');
          } catch (error) {
            showToast(`Sign in error:  ${error}`);
            console.log('error');
          }
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
              onPress={handleSubmit as (e?: React.BaseSyntheticEvent) => void}
              style={styles.button}>
              Login
            </Button>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Signup')}>
              Don't have an account? Sign Up
            </Text>
          </>
        )}
      </Formik>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000} // Duration in milliseconds
        action={{
          label: 'Close',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {message}
      </Snackbar>
    </View>
  );
};

// Styles
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
  link: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;
