import { View } from 'react-native';
import { BButton } from '../../components/BButton';
import { showToast } from '../../utils/help';
import Toast from 'react-native-toast-message';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { Animated } from 'react-native';
import { useRef, useEffect } from 'react';

function Settings() {
    const fadeAnim = useRef(new Animated.Value(0)).current

    const openCalender = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
        showToast('success', 'Selected Date From Calender')
    }
    return (
        <View style={{ flex: 1 }}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <BButton title={'Open Calender'} onButtonPress={openCalender} />
            </Animated.View>

            <Calendar
                minDate={dayjs().format('YYYY-MM-DD')}
            />
            <Toast />
        </View>
    )
}

export { Settings };