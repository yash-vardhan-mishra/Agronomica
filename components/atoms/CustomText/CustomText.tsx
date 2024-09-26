
import { useFonts } from 'expo-font';
import React from 'react';
import { Text, TextProps } from 'react-native';

type fontFamilies = 'inter' | 'inter-italic';
export type fontWeights = '400' | '500' | '600' | '700';

export interface CustomTextProps {
    children: React.ReactNode;
    font?: fontFamilies;
    weight?: fontWeights;
    size?: number;
    lineHeight?: number;
    color?: string
}

const fontMap = {
    inter: {
        400: 'Inter-Regular',
        500: 'Inter-Medium',
        600: 'Inter-SemiBold',
        700: 'Inter-Bold',
    },
    'inter-italic': {
        400: 'Inter-Italic',
        500: 'Inter-MediumItalic',
        600: 'Inter-SemiBoldItalic',
        700: 'Inter-BoldItalic',
    },
};

const CustomText: React.FC<CustomTextProps & TextProps> = ({
    children,
    font = 'inter',
    weight = '400',
    size = 16,
    lineHeight = size * 1.5,
    color,
    style,
    ...props
}) => {
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

    const fontFamily = fontMap[font][weight];

    return (
        <Text
            testID="my-text"
            style={[
                {
                    fontFamily,
                    fontSize: size,
                    lineHeight,
                    color
                },
                style
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

export default CustomText;