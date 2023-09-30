import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';


type PropsOnChange = {
  onChange: (props: string) => void,
  value: string
}

function CustomInputText({ onChange, value }: PropsOnChange): JSX.Element {


  return (


    <SafeAreaView style={styles.saafeAreaInput}>
      <TextInput value={value} onChangeText={onChange} style={styles.textInput} ></TextInput>
      <TouchableOpacity style={styles.TouchableOpacityStyle}>
        <Image source={require('../../assets/icons/lupa.png')} style={styles.image}  ></Image>
      </TouchableOpacity>
    </SafeAreaView>

  );
};


const styles = StyleSheet.create({
  saafeAreaInput: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 4,
    justifyContent: "flex-end"
  },

  textInput: {
    flex: 1,
    height: "100%",
    backgroundColor: '#fff'
  },
  TouchableOpacityStyle: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff'
  },
  image: {
    width: 32,
    height: 32,
    backgroundColor: '#fff',
    display: "flex",
    justifyContent: 'center',
    alignItems: "center"
  },

});

export default CustomInputText;
