import { View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { BButton } from "./BButton";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

function MediaPicker({ show, onClose, onCameraPressed, onGalleryPressed }) {
    const pickImageFrpmGallery = () => {
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All
        }).then(response => { }).catch(error => { })

    }
    return (
        <View>
            <Modal animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                animationOutTiming={1200}
                animationInTiming={1200}
                isVisible={show} style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ height: '35%', backgroundColor: 'white', justifyContent: 'center', padding: 10, borderRadius: 10 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity style={styles.circleView} onPress={onCameraPressed}>
                            <Ionicons name={'camera-sharp'} size={50} color={'white'} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.circleView} onPress={pickImageFrpmGallery}>
                            <Ionicons name={'image-sharp'} size={50} color={'white'} />
                        </TouchableOpacity>

                    </View>
                    <View style={{ marginTop: 25 }}>
                        <BButton title={'Cancel'} onButtonPress={onClose} />
                    </View>

                </View>
            </Modal>
        </View>
    )
}

export { MediaPicker };

const styles = StyleSheet.create({
    circleView: {
        height: 100,
        width: 100,
        backgroundColor: 'orange',
        borderRadius: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    }
})