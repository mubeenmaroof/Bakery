import { View, Text, ImageBackground, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { firebase } from '../../services/firebaseConfig';
import { Input } from "../../components/input";
import { Ionicons } from '@expo/vector-icons';


function Recipies({ navigation }) {

    const [showloading, setShowLoading] = useState(false);
    const [recipieData, setRecipieData] = useState([]);
    const [recipieFilteredData, setRecipieFilteredData] = useState();
    useEffect(() => {
        fetchRecipyFromDB()
    }, [])


    const fetchRecipyFromDB = () => {
        setShowLoading(true)

        firebase
            .firestore()
            .collection('recipies')
            .get().then(responce => {
                setRecipieData(responce.docs)
                setShowLoading(false)
            }).catch(error => {
                console.log({ error })
                setShowLoading(false)
            });
    }

    const __renderItem = ({ item }) => {
        const recipy = item.data();
        const recipyId = item.id
        return (
            <TouchableOpacity onPress={() => navigation.navigate("RecipiesDetail", { recipy: recipy })}>
                <ImageBackground style={{ height: 100, width: 100, margin: 5 }} source={{ uri: recipy.recipyImageUrl }}>
                    <Text style={{ color: 'white' }}>{recipy.title}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )

    }

    const onUserInput = (text) => {
        const filteredData = recipieData.filter(item => item.data().title?.includes(text))
        if (filteredData.length > 0) {
            setRecipieFilteredData(filteredData)
        } else {

        }
    }
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}
            >
                <Ionicons name={'chevron-back'} color={'black'} size={30} />
            </TouchableOpacity>
            <Input placeholder={'Search'} showIcon={true} iconName={'search'} onChange={onUserInput} />
            <FlatList
                data={recipieFilteredData || recipieData}
                renderItem={__renderItem}
                ListEmptyComponent={<Text>No Recipy Found</Text>}
                refreshing={showloading}
                onRefresh={() => fetchRecipyFromDB()}
            />

        </View>
    );
}

export { Recipies };

