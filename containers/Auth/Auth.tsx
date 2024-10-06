import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'

import styles from './Auth.styles'
import CustomButton from '../../components/molecules/CustomButton'
import CustomText from '../../components/atoms/CustomText/CustomText'
import CustomTextBox from '../../components/atoms/CustomText/CustomTextBox'
import CustomKeyboardAvoidingView from '../../components/molecules/CustomKeyboardAvoidingView'
import Colors from '../../constants/Colors'
import Strings from '../../constants/Strings'
import { login, register } from '../../services/auth'
import { AuthScreenNavigationProp } from '../../navigation/UnauthStack';
import { useLoading } from '../../contexts/LoadingContext';
import { showError } from '../../components/molecules/OtpTextInput/utils';

const Auth = () => {
    const initialState = {
        email: '',
        password: ''
    }
    const navigation = useNavigation<AuthScreenNavigationProp>()
    const [isLogin, setIsLogin] = useState(false);
    const [state, setState] = useState(initialState)
    const { setLoading } = useLoading();

    const { email, password } = state

    const handleChange = (type: string, val: string) => {
        setState(prevVal => ({ ...prevVal, [type]: val }))
    }

    const loginUser = () => {
        login(email, password).then(res => {
            navigation.navigate('OtpVerification', { email });
        }).catch(err => {
            showError(err)
        }).finally(() => {
            setLoading(false)
        });
    }

    const registerUser = () => {
        register(email, password).then(res => {
            navigation.navigate('OtpVerification', { email });
        }).catch(err => {
            showError(err)
        }).finally(() => {
            setLoading(false)
        });
    }

    const submitForm = () => {
        setLoading(true)
        if (isLogin) {
            loginUser()
        } else {
            registerUser()
        }
    };

    const toggleGui = () => {
        setIsLogin(val => !val)
        setState(initialState)
    }

    const isButtonEnabled = email && password

    return (
        <SafeAreaView style={styles.container}>
            <CustomKeyboardAvoidingView>
                <View style={styles.formInnerContainer}>
                    <CustomText weight='700' size={32}>
                        {isLogin ? Strings.loginPrompt : Strings.signUpPrompt}
                    </CustomText>
                    <View style={styles.inputContainer}>
                        <CustomTextBox autoCapitalize='none' keyboardType='email-address' style={styles.emailAddressContainer} value={email} onChangeText={(val) => handleChange('email', val)} placeholder='Email' />
                        <CustomTextBox autoCapitalize='none' maxLength={32} secureTextEntry={true} value={password} onChangeText={(val) => handleChange('password', val)} placeholder='Password' />
                        <CustomButton disabled={!isButtonEnabled} label='Send OTP' onPress={submitForm} />
                    </View>
                </View>
            </CustomKeyboardAvoidingView>
            <View style={styles.bottomPromptContainer}>
                <CustomText size={14} weight='500'>
                    {isLogin ? Strings.signUpBottomPrompt : Strings.loginBottomPrompt}
                </CustomText>
                <Pressable onPress={toggleGui}>
                    <CustomText size={14} weight='600' color={Colors.amber}>
                        {' '}{isLogin ? Strings.signUpBottomPromptAction : Strings.loginBottomPromptAction}
                    </CustomText>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default Auth
