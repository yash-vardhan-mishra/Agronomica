import React from 'react'
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import CustomText from '../atoms/CustomText/CustomText';
import Colors from '../../constants/Colors';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<CustomButtonProps & PressableProps> = ({ label, onPress, style, ...props }) => {
  return (
    <Pressable style={[styles.buttonStyle, style]} onPress={onPress} {...props}>
      <CustomText color={Colors.white} weight='700'>
        {label}
      </CustomText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonStyle: { borderRadius: 8, backgroundColor: Colors.amber, padding: 16, alignItems: 'center', marginTop: 32 }
})

export default CustomButton
