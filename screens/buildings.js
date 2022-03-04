import React from "react";
import { View, Text, Button, StyleSheet,ScrollView} from 'react-native';

const BuildingScreen=()=>{
    return(
        <View style={styles.container}>
                <ScrollView> 
                <Text>Building Screen</Text>
                </ScrollView> 
        </View>
    );
}
export default BuildingScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
});