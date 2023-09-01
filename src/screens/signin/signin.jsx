import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native'
import { BButton } from "../../components/BButton";
import { Input } from "../../components/input";
import { colors, modifiers } from "../../utils/theme";
import { Header } from "../../components/header";
import { TextButton } from "../../components/textButton";
import { Loading } from '../../components/loading';


function Signin({ navigation }) {
    const [showPass, setShowPass] = useState(false);
    const [showloading, setShowLoading] = useState(false);

    const handleShowPass = () => {
        if (showPass === true) {
            setShowPass(false)
        } else if (showPass === false) {
            setShowPass(true)
        }
    }

    const goToSignup = () => {
        navigation.navigate('Signup')
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bgColors }}>
            <Header title={'Sign in'} />
            <View style={styles.formCon}>
                <Input placeholder={'Email'} showIcon={true} iconName={'mail-outline'} />

                <Input placeholder={'Password'}
                    isSecure={!showPass}
                    showIcon={true}
                    iconName={showPass === false ? 'eye-outline' : 'eye-off-outline'}
                    onIconPress={handleShowPass}
                />
                <View style={styles.textBtnCon}>
                    <TextButton title={'Forgot your password?'} />
                </View>


                <BButton title='Sign in' />
                <View style={styles.goToSignup}>
                    <TextButton title={'Dont have an account yet signup'} onPress={goToSignup} />
                </View>
            </View>
            {
                showloading === true && <Loading />
            }
        </ScrollView>
    );
}

export { Signin }

const styles = StyleSheet.create({
    formCon: {

        height: 500,
        justifyContent: 'center',
        paddingHorizontal: modifiers.containerPadding
    },

    goToSignup: {
        alignItems: 'center'
    },
    textBtnCon: {
        alignItems: 'flex-end'
    }
})
