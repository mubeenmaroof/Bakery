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
import { Loading } from '../../components/loading';
import { makeBlob } from '../../services/uploadImage';
import { getARandomImageName, showToast } from '../../utils/help';
import Toast from 'react-native-toast-message';




function Signup({ navigation }) {
    const [showPass, setShowPass] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPickerShown, setIsPickerShown] = useState(false);
    const [isCameraShown, setIsCameraShown] = useState(false);
    const [imageFromPicker, setImageFromPicker] = useState('');
    const [imageFromCamera, setImageFromCamera] = useState('');
    const [showloading, setShowLoading] = useState(false);

    const handleShowPass = () => {
        setShowPass(!showPass)
    }
    const onImageCameFromGallery = (image) => {
        setImageFromPicker(image.uri)
        setIsPickerShown(false)
    }

    // Firebase Auth 
    const signUp = () => {
        console.log(userName, email, password);
        //create a user account in firebase auth then upload Image
        setShowLoading(true);
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed up successfully
                const user = userCredential.user;
                console.log('Signed up user:', user.uid);
                uploadImage(imageFromCamera || imageFromPicker);
                showToast("success", "Registered Successfully Proceed to Login", "top");

                // Add Username, Email, Password in Firestore
                setShowLoading(true)
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
            .catch((autherror) => {
                // Error occurred
                console.log(autherror);
                setShowLoading(false);
                showToast("error", autherror.message, "top");
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

    async function uploadImage(imgUri) {
        try {
            const imgBlob = await makeBlob(imgUri);
            const userStorageRef = firebase.storage().ref("users/");
            const imageName = getARandomImageName();
            console.log(imageName);
            await userStorageRef
                .child(imageName)
                .put(imgBlob)
                .then((uploadResponse) => {
                    console.log(uploadResponse)
                    setShowLoading(false);

                    Toast.show({
                        type: 'success',
                        text1: 'Hello',
                        text2: 'This is some something 👋',
                        position: 'bottom',
                    });


                })
                .catch((uploadError) => {
                    console.log(uploadError)
                    setShowLoading(false);
                })

        } catch (blobError) {
            console.log(blobError)
            setShowLoading(false);
        }
    }

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
            {showloading && <Loading />}
            <Toast />
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
