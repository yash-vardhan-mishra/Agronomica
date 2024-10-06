import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, TextStyle, View } from 'react-native'
import CustomText from '../atoms/CustomText/CustomText'
import Colors from '../../constants/Colors';

interface HeaderProps {
    title: string;
    onBackPress?: () => void;
    isBackButtonVisible?: boolean;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightIconPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress, isBackButtonVisible = false, rightIcon, onRightIconPress }) => {

    const titleStyles = (): TextStyle => {
        return {
            textAlign: 'center',
            flex: 1
        };
    };

    return (
        <View style={styles.container}>
            {isBackButtonVisible ? (
                <Pressable style={styles.backButton} onPress={onBackPress}>
                    <Ionicons name="arrow-back" size={20} color="black" />
                </Pressable>
            ) : (
                <View style={styles.spacer} />
            )}

            <CustomText style={titleStyles()} size={18} weight='600'>
                {title}
            </CustomText>

            {rightIcon ? (
                <Pressable style={styles.rightIconButton} onPress={onRightIconPress}>
                    <Ionicons name={rightIcon} size={24} color="black" />
                </Pressable>
            ) : (
                <View style={styles.spacer} />
            )}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 12,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderBottomWidth: 0.25,
        borderColor: Colors.romanSilver2
    },
    backButton: {
        marginRight: 16
    },
    rightIconButton: {
        marginLeft: 16
    },
    spacer: {
        width: 40
    },
})
