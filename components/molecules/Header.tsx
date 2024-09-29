import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, TextStyle, View } from 'react-native'
import CustomText from '../atoms/CustomText/CustomText'

interface HeaderProps {
    title: string;
    onBackPress?: () => void;
    isBackButtonVisible?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress, isBackButtonVisible = false }) => {

    const titleStyles = (isBackButtonVisible: boolean): TextStyle => {
        return {
            textAlign: isBackButtonVisible ? 'left' : 'center',
            flex: isBackButtonVisible ? 0 : 1
        };
    };

    return (
        <View style={styles.container}>
            {isBackButtonVisible ? <Pressable style={styles.backButton} onPress={onBackPress}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable> : null}
            <CustomText style={titleStyles(isBackButtonVisible)} size={18} weight='500'>
                {title}
            </CustomText>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: { alignItems: 'center', paddingVertical: 12, width: '100%', flexDirection: 'row' },
    backButton: { marginRight: 24 },
    title: { flex: 1 },
})