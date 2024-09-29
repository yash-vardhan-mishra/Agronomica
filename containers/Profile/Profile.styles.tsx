import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, backgroundColor: Colors.white },
    inputContainer: { marginTop: 20 }, 
    detailsContainer: { flex: 1, justifyContent: 'space-between', paddingBottom: 20 }
})

export default styles