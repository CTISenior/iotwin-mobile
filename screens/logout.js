import React from "react";
import {View, Text, Button, StyleSheet} from 'react-native';

const LogoutScreen=()=>{
    return(
        <View style={styles.container}>
            <Text>Press Button to Logout</Text>
            <Button 
            title="LOGOUT"
            onPress={()=>{alert('Button Clicked')}}>
            </Button>
        </View>
    );
}
export default LogoutScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
});