import auth from '@react-native-firebase/auth';
interface FirebaseAuthError {
  code: string;
  message: string;
}

export const signUpUser = async (
  email: string,
  password: string,
): Promise<any> => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    console.log('User account created & signed in!', userCredential.user);
    return userCredential;
  } catch (error) {
    const firebaseError = error as FirebaseAuthError;
    if (firebaseError.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    } else if (firebaseError.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    } else {
      console.error('Sign up failed:', firebaseError.message);
    }
    throw firebaseError;
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    console.log('User signed in:', userCredential.user);
    return userCredential;
  } catch (error: any) {
    console.error('Error during sign in:', error.message);
    throw error;
  }
};

export const signOutUser = async () => {
  await auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};
