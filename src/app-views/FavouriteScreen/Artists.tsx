import * as React from 'react';
import Content from '../../app-layout/Content';
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { icon3Cham } from '../../app-uikits/icon-svg';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { ArtistInf } from '../../app-navigation/types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useState } from 'react';

interface ArtistsProps {
    onPress: any
    
}
    const data =
    [
        {
            id: 1,
            image: require('../../assets/images/ImageArtist/Jack97.png'),
            name: "Jack - J97",
            follow: "2,5M quan tâm"
        },
        {
            id: 2,
            image: require('../../assets/images/ImageArtist/MartinGarrix.png'),
            name: "Martin Garrix",
            follow: "145K quan tâm"
        },
        {
            id: 3,
            image: require('../../assets/images/ImageArtist/Pitbull.png'),
            name: "Pitbull",
            follow: "80,3K quan tâm"
        },
        {
            id: 4,
            image: require('../../assets/images/ImageArtist/Vicetone.png'),
            name: "Vicetone",
            follow: "50,7K quan tâm"
        },
    ]
const hint=[
    {
        id: 1,
        image: require('../../assets/images/ImageArtist/Jack97.png'),
        name: "Jack - J97",
        follow: "2,5M quan tâm"
    },
    {
        id: 2,
        image: require('../../assets/images/ImageArtist/MartinGarrix.png'),
        name: "Martin Garrix",
        follow: "145K quan tâm"
    },
]
const Artists: React.FC<ArtistsProps> = ({onPress}) => {
    const handleNavigateToArtistInf = (ID: string) => {
        setShowArtistInf(false)
        setSelectedIdP(ID);
    }
    const [showArtistInf, setShowArtistInf] = useState(true);
    const [selectedIdP, setSelectedIdP] = useState<string>(''); 
    const handleNavigateToBackA = () => {
        setShowArtistInf(true)
    };
    const handleSelectArtist = (ID: string) => {
        setSelectedIdP(ID);
    }
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


        {showArtistInf? (
            <View>
                <Text style={{color:'white', fontSize:20, textAlign:'center', fontWeight:'bold'}}>Nghệ sĩ</Text>
                <Text style={{color:'white', textAlign:'center'}}>
                    4 nghệ sĩ · Đã quan tâm
                </Text>
               <View>
                <ScrollView>
                    {data.map((item) => (
                        <TouchableOpacity onPress ={() => {
                            const stringId = item.id.toString();
                            handleNavigateToArtistInf(stringId);
                            handleSelectArtist(stringId);
                        }}
                        key= {item.id} 
                        style={{flexDirection:'row', margin:20, justifyContent:'space-between'}}>
                            <Image style={{width:60, height:60, borderRadius:100, marginLeft:15}} source={item.image}/>
                            <Text style={styles.titleArtist}>{item.name}</Text>
                            <Text style={{color:'gray', flex:1, marginTop:35, right:140}}>{item.follow}</Text>
                        </TouchableOpacity>
                    ))}

                    <Text style={{color:'white', marginLeft:30, fontSize:18}}>Nghệ sĩ gợi ý</Text>
                <Text style= {{color:'gray', marginLeft:30}}>Đang có nhiều quan tâm</Text>

                {hint.map((item, index) => (
                    <View key={index} style={{flexDirection:'row', margin:20, justifyContent:'space-between'}}>
                        <Image style={{width:60, height:60, borderRadius:100, marginLeft:15}} source={item.image}/>
                            <Text style={styles.titleArtist}>{item.name}</Text>
                            <Text style={{color:'gray', flex:1, marginTop:35, right:105}}>{item.follow}</Text>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity style={{borderRadius:10, backgroundColor:'gray', height:20, width:76}} onPress={() => (item)}>
                                <Text style={{color:'white', left:7}}>Quan tâm</Text>
                           </TouchableOpacity>
                           </View>
                    </View>
                ))}
                </ScrollView>
                </View>
        
                </View>
        ): (
            <ArtistInf handleNavigateBack={handleNavigateToBackA} id={selectedIdP} onPress={undefined} />
            )}
        </>
    );
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
    titleArtist:{
    color:'white', 
    fontWeight: 'bold',
     marginLeft:15,
     marginTop:13, 
     fontSize:16, 
     flex:1 
    }
})
export default Artists;


