import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function RecipiesDetail({ navigation, route }) {

    const [incomingRecipy, setIncomingRecipy] = useState(route.params.recipy);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Recipies")}
                style={{ flexDirection: 'row-reverse' }} >
                <Ionicons name={'chevron-back'} color={'black'} size={50} />
            </TouchableOpacity>
            <Image style={styles.image} source={{ uri: incomingRecipy.recipyImageUrl }} />
            <View>
                <Text style={styles.text}>{incomingRecipy.title}</Text>
                <Text style={styles.text}>{incomingRecipy.description}</Text>
                <Text style={styles.text}>{incomingRecipy.ingredients}</Text>
            </View>
        </View>

    );
}

export { RecipiesDetail };

const styles = StyleSheet.create({
    image: {
        height: '50%',
        width: '100%',
        justifyContent: 'center',

    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    text: {
        marginVertical: 10,
        fontSize: 15
    }
})