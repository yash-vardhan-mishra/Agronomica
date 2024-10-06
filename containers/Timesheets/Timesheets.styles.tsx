import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
    inputContainer: { marginTop: 20 },
    detailsContainer: { flex: 1, justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 20 },
    timesheetItem: {
        backgroundColor: Colors.antiFlashWhite,
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    }
})

export default styles