import React from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import CustomText from '../atoms/CustomText/CustomText';
import Colors from '../../constants/Colors';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean; // Add disabled prop
}

const CustomButton: React.FC<CustomButtonProps & PressableProps> = ({ label, onPress, style, disabled, ...props }) => {
  return (
    <Pressable
      style={[
        styles.buttonStyle,
        style,
        disabled && styles.disabledButtonStyle // Apply gray color when disabled
      ]}
      onPress={disabled ? undefined : onPress} // Disable onPress when disabled
      disabled={disabled} // Pass disabled prop to Pressable
      {...props}
    >
      <CustomText color={Colors.white} weight='700'>
        {label}
      </CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 8,
    backgroundColor: Colors.amber,
    padding: 16,
    alignItems: 'center',
    marginTop: 32
  },
  disabledButtonStyle: {
    backgroundColor: '#a19f9f', // Gray color for disabled button
  }
});

export default CustomButton;
