import React from 'react'
import { KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform, ScrollView, ScrollViewProps, StyleProp, StyleSheet, ViewStyle } from 'react-native'

interface CustomKeyboardAvoidingViewProps extends KeyboardAvoidingViewProps, ScrollViewProps {
    children: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
}

const CustomKeyboardAvoidingView: React.FC<CustomKeyboardAvoidingViewProps> = ({ children, style }) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={[styles.container, style]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' }
})

export default CustomKeyboardAvoidingView
