
import Modal from "react-native-modal";
import { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BButton } from "./BButton";
import { Input } from "./input";
import { colors, modifiers } from "../utils/theme";
import { Header } from "./header";
import { MediaPicker } from "./mediaPicker";
import { firebase } from "../services/firebaseConfig";
import { CustomCamera } from "./CustomCamera";
import { Loading } from "./loading";
import { makeBlob } from '../services/uploadImage';
import { getARandomImageName } from '../utils/help';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';




function AddReciepy({ show, onClose }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [isPickerShown, setIsPickerShown] = useState(false);
    const [isCameraShown, setIsCameraShown] = useState(false);
    const [imageFromPicker, setImageFromPicker] = useState('');
    const [imageFromCamera, setImageFromCamera] = useState('');
    const [showloading, setShowLoading] = useState(false);


    const onImageCameFromGallery = (image) => {
        setImageFromPicker(image.uri)
        setIsPickerShown(false)
    }
    // Open Media Picker
    const onImagePressed = () => {
        setIsPickerShown(!isPickerShown)
    };

    async function uploadImage(imgUri) {
        try {
            const imgBlob = await makeBlob(imgUri);
            const userStorageRef = firebase.storage().ref("recipies/");
            const imageName = getARandomImageName();
            console.log(imageName);
            await userStorageRef
                .child(imageName)
                .put(imgBlob)
                .then((uploadResponse) => {
                    console.log(uploadResponse)



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
        <Modal animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            animationOutTiming={1500}
            isVisible={show}
            style={{ flex: 1, justifyContent: 'flex-end' }}
        >
            <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: colors.bgColors }}>
                <TouchableOpacity onPress={onClose}
                    style={{ flexDirection: 'row-reverse' }} >
                    <Ionicons name={'close-circle'} color={'black'} size={50} />
                </TouchableOpacity>
                <Header title={'Add New Recipy'} />

                {/* Image Picker From Camera */}
                <TouchableOpacity onPress={onImagePressed}>
                    <View style={styles.imagePicker}>
                        <Image source={{ uri: imageFromPicker || imageFromCamera }} style={{ width: 100, height: 100, borderRadius: 50 }} resizeMode={'contain'} />
                    </View>
                </TouchableOpacity>


                {/* Add Username, Email, Password with Button*/}
                <View style={styles.formCon}>
                    <Input placeholder={'Title'} showIcon={true} onChange={setFirstName} />
                    <Input placeholder={'Description'} showIcon={true} onChange={setlastName} />
                    <Input placeholder={'Ingrediants'} showIcon={true} onChange={setEmail} />

                    <BButton title='Submit' />
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
        </Modal>
    );
}

export { AddReciepy };

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

