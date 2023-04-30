import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";


function CustomCamera({ show, onClose }) {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    return (
        <View>
            <Modal animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                animationOutTiming={1500}
                animationInTiming={1500}
                isVisible={show} style={{ flex: 1, justifyContent: 'flex-end' }}>

                <Camera style={styles.camera} type={type}>

                </Camera>


            </Modal>
        </View>
    )
}

export { CustomCamera };

const styles = StyleSheet.create({
    camera: {
        flex: 1
    },
})