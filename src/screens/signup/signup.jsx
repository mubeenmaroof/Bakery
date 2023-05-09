import { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { BButton } from "../../components/BButton";
import { Input } from "../../components/input";
import { colors, modifiers } from "../../utils/theme";
import { Header } from "../../components/header";
import { TextButton } from "../../components/textButton";
import { MediaPicker } from '../../components/mediaPicker';
import { firebase } from '../../services/firebaseConfig'
import { CustomCamera } from '../../components/CustomCamera';
import { uploadImage } from '../../services/uploadImage';



function Signup({ navigation }) {
    const [showPass, setShowPass] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPickerShown, setIsPickerShown] = useState(false);
    const [isCameraShown, setIsCameraShown] = useState(false);
    const [imageFromPicker, setImageFromPicker] = useState('');
    const [imageFromCamera, setImageFromCamera] = useState('');

    const handleShowPass = () => {
        setShowPass(!showPass)
    }
    const onImageCameFromGallery = (image) => {
        setImageFromPicker(image.uri)
        setIsPickerShown(false)
    }

    // Firebase Auth 
    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed up successfully
                const user = userCredential.user;
                console.log('Signed up user:', user.uid);

                // Add Username, Email, Password in Firestore
                firebase.firestore().collection("users").doc(email).set({
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

        uploadImage(imageFromCamera || imageFromPicker)

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
                    <Image source={{ uri: imageFromPicker || imageFromCamera }} style={{ width: 100, height: 100, borderRadius: 50 }} resizeMode={'contain'} />
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
            <MediaPicker show={isPickerShown}
                onClose={onImagePressed}
                onImagePickerSelected={(imageSelected) => { onImageCameFromGallery(imageSelected) }}
                onCameraPressed={() => { setIsCameraShown(!isCameraShown) }}
            />
            <CustomCamera show={isCameraShown}
                onClose={() => setIsCameraShown(false)}
                onPicktureTaken={(response) => {
                    setIsCameraShown(false), setIsPickerShown(false)
                    setImageFromCamera(response.uri)
                }}
            />

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
