import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import Modal from "react-native-modal";
import RadioGroup from 'react-native-radio-buttons-group';

function GenderSelector({ show, onClose, onGenderSelected }) {
    // const [radioButtons, setRadioButtons] = useState([
    //     {
    //         id: '1', // acts as primary key, should be unique and non-empty string
    //         label: 'Male',
    //         value: 'option1',
    //         selected: true,
    //     },
    //     {
    //         id: '2',
    //         label: 'Female',
    //         value: 'option2',
    //         selected: false,
    //     },
    // ]);
    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Male',
            value: 'option1',
            selected: true,
        },
        {
            id: '2',
            label: 'Female',
            value: 'option2',
            selected: false,
        }
    ]), []);

    const [selectedId, setSelectedId] = useState();

    // function onPressRadioButton(radioButtonArray) {
    //     const selectedGender = radioButtonArray.find(item => item.selected === true)
    //     onGenderSelected(selectedGender)
    //     console.log(radioButtonArray)
    //     setSelectedId(radioButtonArray)



    // };

    return (
        <View>
            <Modal animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                animationOutTiming={1200}
                animationInTiming={1200}
                isVisible={show} style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ height: '20%', backgroundColor: 'white', padding: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: "800" }}>{""} Select Gender</Text>
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={setSelectedId}
                        selectedId={selectedId}
                        layout={'row'}
                    />
                </View>

            </Modal>
        </View>
    )

}

export { GenderSelector };