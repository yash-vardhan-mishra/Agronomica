import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import YouTubePlayer from 'react-native-youtube-iframe';
import Dimensions from '../../constants/Dimensions';
import Header from '../../components/molecules/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';

// Sample video IDs (replace these with actual video IDs from YouTube)
const videoIds = [
    'DKIwUGHHASY', // Precision Agriculture
    'divmWrMGkHo', // Sustainable Farming Practices
    'XzSchrmBt8g', // Crop Rotation Benefits
    'tWgDqBryR30', // Introduction to Hydroponics
    'ubANrz13Ysg', // Using Drones in Agriculture
    'NquuybXOwTg', // Soil Health and Regeneration
    'W78emPTUHW8', // How to Increase Crop Yields
    'pGtdoGXhjxQ', // The Future of Farming: Vertical Farming
    'M6vSwVC1V90', // Smart Irrigation Systems
    'WhOrIUlrnPo', // Organic Farming: The Basics
    '3Wag2RyZGc0', // Climate Change and Agriculture
    'B6yIpA95OFQ', // Livestock Management Techniques
    'NSdPgLVpLCc', // Farm Equipment Innovations
    'e4XRcrOulug', // Understanding Market Trends in Agriculture
    'Our-F5Fh3Go', // The Role of Technology in Modern Farming
    'hXlSicZE9jI', // Effective Pest Control Strategies
    'AsNLvO_AsKY', // Regenerative Agriculture Explained
    '_pfoMmGhXzM', // Farming in the Digital Age
    'HKPGiPtS0Ms', // Agricultural Policy and Its Impact
    'VZge2cq5NwQ'  // Farm Safety
];

const Home = () => {
    // Function to render each item in the FlatList
    const renderItem = ({ item }: any) => (
        <View style={styles.videoContainer}>
            <YouTubePlayer
                webViewProps={{ scrollEnabled: false }}
                height={200}
                width={Dimensions.SCREEN_WIDTH - 16}
                play={false} // Change to true to autoplay
                videoId={item}
                onChangeState={event => console.log(`Player state: ${event}`)}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header title='Home' />
            <FlatList
                style={{ padding: 16 }}
                data={videoIds}
                renderItem={renderItem}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    videoContainer: {
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
});

export default Home;
