import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container = (props: any) => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                {props.children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
         width:'100%',
         height:'100%',
       
    },

});

export default Container;
