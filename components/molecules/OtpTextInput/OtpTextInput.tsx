import React, { Dispatch, SetStateAction } from 'react';

import {
    View,
    Text,
    StyleProp,
    ViewStyle,
    TextInput,
    TextStyle
} from 'react-native';
import { _size, styles } from './utils';
import OtpInput from './OtpInput';

interface OtpTextInputProps {
    otp: string;
    digits: number;
    setOtp: Dispatch<SetStateAction<string>>;
    style?: StyleProp<ViewStyle>;
    fontStyle?: StyleProp<TextStyle>;
    focusedStyle?: StyleProp<ViewStyle>;
}

const OtpTextInput: React.FC<OtpTextInputProps> = (props) => {
    const {
        otp,
        style,
        digits,
        setOtp,
        fontStyle,
        focusedStyle
    } = props;

    const otpRef = React.useRef<TextInput>(null);


    const _styles = {
        renderInput: [
            styles.renderInput,
            { width: _size(digits) as ViewStyle['width'] },
            ...(style ? [style] : [])
        ],
        textStyles: [
            styles.textStyles,
            fontStyle
        ],
        focused: [
            styles.focused,
            focusedStyle
        ]
    }

    const _onPress = () => {
        otpRef.current?.focus()
    };

    React.useEffect(() => {

        setTimeout(() => {
            _onPress()
        }, 100)

    }, [])


    const _render = React.useMemo(() =>
        <View style={[styles.container]}>
            {
                Array.from({ length: digits }).map((_, i) => (
                    <View
                        style={[
                            _styles.renderInput,
                            (i == otp.length) ? _styles.focused : {},
                        ]}
                        key={i}
                    >
                        <Text
                            onPress={_onPress}
                            style={[_styles.textStyles]}
                        >
                            {(otp[i]) ? otp[i] : <Text style={{ color: '#DEDEDE' }}></Text>}
                        </Text>
                    </View>

                ))
            }
        </View>
        , [otp]);





    return (
        <OtpInput
            digits={digits}
            otp={otp}
            setOtp={setOtp}
            otpRef={otpRef}
            style={styles.input}
            _render={_render}
        />
    )
}




export default OtpTextInput;