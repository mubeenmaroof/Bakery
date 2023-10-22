import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { colors } from "../../utils/theme";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { AddReciepy } from '../../components/addRecipy/';
import { firebase } from '../../services/firebaseConfig';
import { Loading } from "../../components/loading";
import Swiper from "react-native-swiper";
import { showToast } from "../../utils/help";

const sliderHeight = 250;
const slideHeight = 250;


function Home() {
  const [showAddRecipy, setShowAddRecipy] = useState(false);
  const [showloading, setShowLoading] = useState(false);
  const [recipieData, setRecipieData] = useState([]);


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

  const onRecipyLongPress = (recipyId) => {
    alert(recipyId)
    firebase
      .firestore()
      .collection('recipies')
      .doc(recipyId)
      .delete()
      .then(responce => {
        showToast('success', 'Your Recipy Got Deleted')
      }).catch(error => {
        showToast('error', error.message)
      })
  }

  const __renderItem = ({ item }) => {
    const recipy = item.data();
    const recipyId = item.id
    return (
      <TouchableOpacity onLongPress={() => onRecipyLongPress(recipyId)}>
        <ImageBackground style={{ height: 100, width: 100, margin: 5 }} source={{ uri: recipy.recipyImageUrl }}>
          <Text style={{ color: 'white' }}>{recipy.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    )

  }

  const famousRecipies = [
    {
      title: "Brockliee sandwitch",
      recipieImage: "https://cdn.pixabay.com/photo/2016/08/11/08/43/potatoes-1585060_1280.jpg"
    },
    {
      title: "Mash Potatoes",
      recipieImage: "https://cdn.pixabay.com/photo/2019/07/23/08/48/potato-field-4357002_1280.jpg"
    },
    {
      title: "Whole Potato",
      recipieImage: "https://cdn.pixabay.com/photo/2019/07/12/02/19/potatoes-4331742_1280.jpg"
    },
  ]

  return (
    <View
      style={{ flex: 1 }}>
      <View style={{ height: sliderHeight }}>
        <Swiper style={styles.wrapper} showsButtons={true}>
          <ImageBackground source={{ uri: famousRecipies[0].recipieImage }} style={styles.slide1}>
            <Text style={styles.text}>{famousRecipies[0].title}</Text>
          </ImageBackground>

          <ImageBackground source={{ uri: famousRecipies[1].recipieImage }} style={styles.slide1}>
            <Text style={styles.text}>{famousRecipies[1].title}</Text>
          </ImageBackground>

          <ImageBackground source={{ uri: famousRecipies[2].recipieImage }} style={styles.slide1}>
            <Text style={styles.text}>{famousRecipies[2].title}</Text>
          </ImageBackground>

        </Swiper>
      </View>

      <FlatList
        data={recipieData}
        horizontal={true}
        renderItem={__renderItem}
        ListEmptyComponent={<Text>No Recipy Found</Text>}
        refreshing={showloading}
        onRefresh={() => fetchRecipyFromDB()}
      />

      <Toast />
      <FloatingAction
        color={colors.primary}
        onPressMain={() => { setShowAddRecipy(true) }}

      />
      <AddReciepy show={showAddRecipy}
        onClose={() => setShowAddRecipy(false)}
      />




    </View>
  );
}

export { Home };

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    height: slideHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    height: slideHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide3: {
    height: slideHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
