import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import Dimensions from "../../../constants/Dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    bottomCard: {
        position: 'absolute',
        borderRadius: 12,
        backgroundColor: Colors.white,
        left: 16,
        right: 16,
        bottom: 16,
        padding: 16,
    },
    locationIcon: {
        position: 'absolute',
        right: 0,
        top: -52,
        height: 32,
        width: 32,
        backgroundColor: Colors.white,
        borderRadius: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shimmerPlaceholder: {
        backgroundColor: '#f7f7f7',
        borderRadius: 6,
        marginTop: 16,
    },
    bottomButton: {
        borderRadius: 12,
        backgroundColor: Colors.amber,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        marginTop: 8,
    },
    locationPin: {
        height: 51,
        width: 36,
        zIndex: 10,
    },
    locationTopText: { marginBottom: 4 },
    locationPinContainer: {
        position: 'absolute',
        left: 0.5 * Dimensions.SCREEN_WIDTH - 18,
        zIndex: 10,
    }
});

export default styles