import { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BButton } from "../../components/BButton";
import { Input } from "../../components/input";
import { colors, modifiers } from "../../utils/theme";
import { Header } from "../../components/header";
import { TextButton } from "../../components/textButton";
import { Ionicons } from '@expo/vector-icons';
import { MediaPicker } from '../../components/mediaPicker';
import { firebase } from '../../services/firebaseConfig'


function Signup({ navigation }) {
    const [showPass, setShowPass] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPickerShown, setIsPickerShown] = useState(true);


    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    // Firebase Auth 
    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed up successfully
                const user = userCredential.user;
                console.log('Signed up user:', user.uid);

                // Add Username, Email, Password in Firestore
                firebase.firestore().collection("All Users").doc(email).set({
                    name: userName,
                    email: email,
                    password: password
                }).then(() => {
                    alert("Sign Up Succeccfull")
                }).catch((err) => {
                    Alert.alert(err)
                })
            })
            .catch((error) => {
                // Error occurred
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error:', errorCode, errorMessage);
            });
    };
    // Navigate to Sign in Page
    const goToSiginp = () => {
        navigation.navigate('Signin')
    };
    // Open Media Picker
    const onImagePressed = () => {
        setIsPickerShown(!isPickerShown)
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: colors.bgColors }}>
            <Header title={'Sign up'} />

            {/* Image Picker From Camera */}
            <TouchableOpacity onPress={onImagePressed}>
                <View style={styles.imagePicker}>
                    <Ionicons name='md-image-sharp' color={'white'} size={50} />
                </View>
            </TouchableOpacity>


            {/* Add Username, Email, Password with Button*/}
            <View style={styles.formCon}>
                <Input placeholder={'User Name'} showIcon={true} iconName={'person-outline'} onChange={setUserName} />
                <Input placeholder={'Email'} showIcon={true} iconName={'mail-outline'} onChange={(text) => setEmail(text)} />
                <Input placeholder={'Password'}
                    isSecure={!showPass}
                    showIcon={true}
                    iconName={showPass === false ? 'eye-outline' : 'eye-off-outline'}
                    onIconPress={handleShowPass}
                    onChange={(text) => setPassword(text)}
                />
                <View style={styles.textBtnCon}>
                    <TextButton title={'Already have an account?'} onPress={goToSiginp} />
                </View>
                <BButton title='Sign up' onButtonPress={signUp} />
            </View>

            {/* Media Picker From Camera or Gallery*/}
            <MediaPicker show={isPickerShown} onClose={onImagePressed} />

        </ScrollView>
    );
}

export { Signup }

const styles = StyleSheet.create({
    formCon: {

        height: 500,
        justifyContent: 'center',
        paddingHorizontal: modifiers.containerPadding
    },
    textBtnCon: {
        alignItems: 'flex-end'
    },
    imagePicker: {
        height: 100,
        width: 100,
        backgroundColor: 'orange',
        borderRadius: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    }
})
