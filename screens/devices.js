import React from "react";
import {View, Text, Button, StyleSheet,ScrollView} from 'react-native';

const DevicesScreen=()=>{
    return(
        <View style={styles.container}>
           <ScrollView>
            <Text>Devices Screen</Text>
            </ScrollView> 
        </View>
    );
}
export default DevicesScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
});