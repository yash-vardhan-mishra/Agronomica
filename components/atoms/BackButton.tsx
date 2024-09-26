import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

interface BackButtonProps {
    onPress: () => void
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Ionicons name="chevron-back-outline" size={20} color={Colors.darkGunmetal} />
        </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({
    container: {
        height: 44,
        width: 44,
        borderColor: Colors.brightGray,
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 32,
        left: 20,
        zIndex: 100
    }
})
