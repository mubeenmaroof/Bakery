import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { BButton } from "../../components/BButton";
import { Input } from "../../components/input";
import { colors, modifiers } from "../../utils/theme";
import { Header } from "../../components/header";
import { TextButton } from "../../components/textButton";
import { firebase } from '../../services/firebaseConfig';

function Signup({ navigation }) {
    const [showPass, setShowPass] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleShowPass = () => {
        if (showPass === true) {
            setShowPass(false)
        } else if (showPass === false) {
            setShowPass(true)
        }
    }
    const onSignupPress = () => {
        firebase.firestore().collection('users').doc('id002').set({
            users_name: userName,
            users_email: email,
            users_password: password,
        });

    };
    const goToSiginp = () => {
        navigation.navigate('Signin')
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bgColors }}>
            <Header title={'Sign up'} />
            <View style={styles.formCon}>

                <Input placeholder={'User Name'} showIcon={true} iconName={'person-outline'} onChange={setUserName} />
                <Input placeholder={'Email'} showIcon={true} iconName={'mail-outline'} onChange={setEmail} />

                <Input placeholder={'Password'}
                    isSecure={!showPass}
                    showIcon={true}
                    iconName={showPass === false ? 'eye-outline' : 'eye-off-outline'}
                    onIconPress={handleShowPass}
                    onChange={setPassword}


                />
                <View style={styles.textBtnCon}>
                    <TextButton title={'Already have an account?'} onPress={goToSiginp} />
                </View>

                <BButton title='Sign up' onPress={onSignupPress} />
            </View>
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
    }
})
