import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import styles from './Auth.styles'
import CustomButton from '../../components/molecules/CustomButton'
import CustomText from '../../components/atoms/CustomText/CustomText'
import CustomKeyboardAvoidingView from '../../components/molecules/CustomKeyboardAvoidingView'
import Colors from '../../constants/Colors'
import Strings from '../../constants/Strings'
import OtpTextInput from '../../components/molecules/OtpTextInput/OtpTextInput'
import BackButton from '../../components/atoms/BackButton';
import { UnauthStackParamList } from '../../navigation/UnauthStack';
import { verifyOtp } from '../../services/auth';
import { useLoading } from '../../contexts/LoadingContext';
import { saveItem } from '../../services/keychain';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '../../navigation';

type OtpVerificationRouteProp = RouteProp<UnauthStackParamList, 'OtpVerification'>;
type OtpVerificationNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OtpVerification = ({ }) => {
    const route = useRoute<OtpVerificationRouteProp>();
    const { setLoading } = useLoading()
    const { email } = route.params;

    const navigation = useNavigation<OtpVerificationNavigationProp>()
    const [otp, setOtp] = useState('')

    const submitForm = () => {
        setLoading(true)
        verifyOtp(email, otp).then(res => {
            console.log('res is', res);
            saveItem('authToken', res.token); 
            if (res.screen === 'profile-creation') {
                navigation.navigate('AuthStack', { screen: 'ProfileCreation' });
            } else {
                navigation.navigate('AuthStack', { screen: 'Home' });
            }
        }).catch(err => {
            Alert.alert('Error', err.message || 'Something went wrong')
        }).finally(() => {
            setLoading(false)
        })
    }

    const onBackPress = () => {
        navigation.goBack()
    }

    const isButtonEnabled = otp.length === 4

    return (
        <SafeAreaView style={styles.container}>
            <BackButton onPress={onBackPress} />
            <CustomKeyboardAvoidingView>
                <View style={styles.formInnerContainer}>
                    <CustomText weight='700' size={32}>
                        {Strings.otpVerifyPrompt}
                    </CustomText>
                    <View style={styles.otpInputOuterContainer}>
                        <CustomText style={styles.otpInputPrompt} weight='500' color={Colors.romanSilver2}>
                            {Strings.otpInputPrompt}
                        </CustomText>
                        <OtpTextInput otp={otp} setOtp={setOtp} digits={4} />
                        <CustomButton disabled={!isButtonEnabled} label='Verify' onPress={submitForm} />
                    </View>
                </View>
            </CustomKeyboardAvoidingView>
            <View style={styles.bottomPromptContainer}>

                {/* <CustomText size={14} weight='500'>
                    {isLogin ? Strings.signUpBottomPrompt : Strings.loginBottomPrompt}
                </CustomText> */}
                {/* <Pressable onPress={toggleGui}>
                    <CustomText size={14} weight='600' color={Colors.amber}>
                        {' '}{isLogin ? Strings.signUpBottomPromptAction : Strings.loginBottomPromptAction}
                    </CustomText>
                </Pressable> */}
            </View>
        </SafeAreaView>
    )
}

export default OtpVerification
