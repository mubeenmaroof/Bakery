import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, modifiers } from "../utils/theme";

function BButton({
    title = 'title',
    bgColor = colors.primary,
    onButtonPress,

}) {
    return (
        <TouchableOpacity style={[styles.btnCon, { backgroundColor: bgColor }]} onPress={onButtonPress}>
            <Text style={styles.btnTitle}>{title}</Text>
        </TouchableOpacity>
    )
}

export { BButton }

const styles = StyleSheet.create({
    btnCon: {
        padding: 10,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: modifiers.itemMargin,


    },
    btnTitle: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '400'
    }
})