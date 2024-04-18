import * as React from 'react';
import Content from '../../app-layout/Content';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { icon3Cham } from '../../app-uikits/icon-svg';
import { SvgXml } from 'react-native-svg';

interface ArtistsProps {
    onPress: any
}

const Artists: React.FC<ArtistsProps> = ({onPress}) => {
    return(
        <>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style = {{padding:20}}>
                <Pressable style = {styles.button}
                onPress={()=>onPress('Playlists')}>
                    <Text style= {styles.text}>Playlists</Text>
                </Pressable>
                <Pressable 
                style = {styles.button}
                onPress={()=>onPress('Albums')}>
                    <Text style= {styles.text}>Albums</Text>
                </Pressable>
                <Pressable style = {styles.button}
                onPress={()=>onPress('Songs')}>
                    <Text style= {styles.text}>Songs</Text>
                </Pressable>
                <Pressable style = {[styles.button, {backgroundColor: 'red'}]}>
                    <Text style= {styles.text}>Artists</Text>
                </Pressable>
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    button:{
        width: 100,
        height: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderWidth:1,
        borderColor: 'white'
    },
    text:{
        color: 'white'
    },

})
export default Artists;