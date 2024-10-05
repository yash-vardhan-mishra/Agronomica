import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
    inputContainer: { marginTop: 20 },
    detailsContainer: { flex: 1, justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 20 },
    dropdownContainer: {
        marginBottom: 16,
        width: '100%',
    },
    dropdown: {
        backgroundColor: Colors.antiFlashWhite,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.brightGray
    },
    dropdownTextStyle: { color: Colors.romanSilver, fontSize: 14, fontFamily: 'Inter-Regular' },
    dropdownPlaceholderStyle: { color: Colors.silver, fontFamily: 'Inter-Regular', fontSize: 14 },
    dropdownItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.brightGray
    },
})

export default styles