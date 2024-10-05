import React, { useRef } from 'react';
import { TextInput, StyleSheet, TextInputProps, Pressable, PressableProps } from 'react-native';
import Colors from '../../../constants/Colors';
import { useFonts } from 'expo-font';

export type fontFamilies = 'Inter-Regular' | 'Inter-Bold' | 'Inter-Italic' | 'Inter-BoldItalic'

export interface CustomTextBoxProps {
    placeholder?: string;
    value: string;
    onChangeText?: (text: string) => void;
    fontFamily?: fontFamilies;
    textInputStyles?: TextInputProps;
    editable?: boolean;
}

const CustomTextBox: React.FC<CustomTextBoxProps & TextInputProps & PressableProps> = ({ placeholder, value, onChangeText, fontFamily = 'Inter-Regular', textInputStyles, style, editable, ...props }) => {
    const textInputRef = useRef<TextInput>(null);
    const [loaded] = useFonts({
        'Inter-Regular': require('../../../assets/fonts/Inter-Regular.otf'),
        'Inter-Bold': require('../../../assets/fonts/Inter-Bold.otf'),
        'Inter-Medium': require('../../../assets/fonts/Inter-Medium.otf'),
        'Inter-MediumItalic': require('../../../assets/fonts/Inter-MediumItalic.otf'),
        'Inter-SemiBold': require('../../../assets/fonts/Inter-SemiBold.otf'),
        'Inter-SemiBoldItalic': require('../../../assets/fonts/Inter-SemiBoldItalic.otf'),
        'Inter-Italic': require('../../../assets/fonts/Inter-Italic.otf'),
        'Inter-BoldItalic': require('../../../assets/fonts/Inter-BoldItalic.otf'),
    });

    if (!loaded) {
        return null
    }

    return (
        <Pressable style={[
            styles.container,
            style
        ]}
            onPress={() => {
                if (textInputRef.current) {
                    textInputRef.current.focus()
                }
            }}
        >
            <TextInput
                ref={textInputRef}
                style={[{ ...styles.textInputStyle, fontFamily }, textInputStyles]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                editable={editable}
                placeholderTextColor={Colors.silver}
                {...props}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.antiFlashWhite,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.brightGray
    },
    textInputStyle: {
        color: Colors.romanSilver
    }
});

export default CustomTextBox;