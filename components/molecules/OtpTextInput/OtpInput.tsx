
import React, { Dispatch, SetStateAction } from 'react';
import { View, TextInput, StyleProp, ViewStyle } from 'react-native';

interface OtpInputProps {
    digits: number;
    otpRef: React.RefObject<TextInput>;
    style: StyleProp<ViewStyle>
    setOtp: Dispatch<SetStateAction<string>>;
    otp: string;
    _render: React.ReactNode;
}

const OtpInput: React.FC<OtpInputProps> = ({ digits, otpRef, style, setOtp, otp, _render }) => {
    return (
        <View style={{ width: '100%' }}>
            <TextInput
                maxLength={digits}
                ref={otpRef}
                style={style}
                onChangeText={setOtp}
                value={otp}
                keyboardType='number-pad'
            />
            {_render}
        </View>
    );
}
export default OtpInput;