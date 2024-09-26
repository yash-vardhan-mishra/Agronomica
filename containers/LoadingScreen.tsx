// conatiners/LoadingScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useLoading } from '../contexts/LoadingContext';
import Paths from '../constants/Paths';

const LoadingScreen: React.FC = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <View style={styles.container}>
            <View style={styles.overlay} />
            <LottieView
                source={Paths.animations.loadingAnimation}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    animation: {
        width: 150,
        height: 150,
    },
});

export default LoadingScreen;
