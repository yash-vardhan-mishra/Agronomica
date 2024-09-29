import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import CustomText, { CustomTextProps } from '../atoms/CustomText/CustomText';
import CustomTextBox, { CustomTextBoxProps } from '../atoms/CustomText/CustomTextBox';

interface CustomTextBoxWithTitleProps extends CustomTextBoxProps {
    title: string;
    titleStyle?: CustomTextProps;
    containerStyle?: ViewStyle;
    titleWeight?: CustomTextProps['weight'];
    titleSize?: CustomTextProps['size'];
    titleColor?: CustomTextProps['color'];
    editable?: boolean;
}

const CustomTextBoxWithTitle: React.FC<CustomTextBoxWithTitleProps> = ({
    title,
    titleStyle,
    containerStyle,
    titleWeight='500',
    titleSize=12,
    titleColor,
    editable,
    ...props
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <CustomText
                style={[{ marginBottom: 8 }, titleStyle]}
                weight={titleWeight}
                size={titleSize}
                color={titleColor}
            >
                {title}
            </CustomText>
            <CustomTextBox
                editable={editable}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
});

export default CustomTextBoxWithTitle;