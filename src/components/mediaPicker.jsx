import { View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { BButton } from "./BButton";
import { Ionicons } from '@expo/vector-icons';

function MediaPicker({ show, onClose }) {
    return (
        <View>
            <Modal animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                animationOutTiming={1500}
                animationInTiming={1500}
                isVisible={show} style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ height: '35%', backgroundColor: 'white', justifyContent: 'center', padding: 30, borderRadius: 10 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity style={styles.circleView}>
                            <Ionicons name={'camera-sharp'} size={50} color={'white'} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.circleView}>
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