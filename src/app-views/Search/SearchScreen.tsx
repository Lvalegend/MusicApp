import * as React from 'react';
import { Button, View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import { icon3Cham, iconBack, iconRecentSong } from '../../app-uikits/icon-svg';
import iconSearch from '../../assets/svg/IconSearch/iconSearch';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';


interface SearchProps {

}

const SearchScreen: React.FC<SearchProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [text, onChangeText] = React.useState('');
    const recentSongs = [
        {
            id: '1', title: '', recentText: 'Cuối cùng thì Jack-J97', 
        },
        {
            id: '1', title: '', recentText: 'Cuối cùng thì Jack-J97', 
        },
        {
            id: '1', title: '', recentText: 'Cuối cùng thì Jack-J97', 
        },
    ];
    const renderItem =({item} : {
        item: {
            [x: string]: React.ReactNode; id: string; title: string
        }
    }) => (
        <View style={{flexDirection:'row', margin:20,}}>
            <SvgXml xml={iconRecentSong()} width="70" height="70" />
            <Text style = {{color :"white", fontSize:15, marginTop:20, left:15,}}>{item.recentText}</Text>
            <SvgXml xml={icon3Cham()} width="35" height="35" style={{left:100, marginTop:15,}}/>
        </View>
            
    );


    const handleHome = ()=>{
        navigation.navigate('HomeScreen')
    }
    const handleFavourite = ()=>{
        navigation.navigate('Favourite')
    }
    const handleDownload = ()=>{
        navigation.navigate('Download')
    }
    const handleUser = ()=>{
        navigation.navigate('User')
    }

    return (
        <> 

    <Container colors={['black', 'black', 'black']}>
            <Header>
                
            </Header>   

            <Content>
                
                <Text style={styles.headerText}>Tìm kiếm</Text> 

                <TextInput style={styles.inputSearch} 
                onChangeText={onChangeText} 
                value={text}
                placeholder='Tìm kiếm bài hát và nghệ sĩ'
                />
                <Text style={{left:20, fontSize:20, color:'white'}}>Đề xuất cho bạn</Text>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.recommend1}>sau lời từ khước</Text>
                <Text style={styles.recommend2}>chúng ta của tương lai</Text>
                </View>
                <Text style={styles.recommend3}>thiên lý ơi</Text>
                <Text style={styles.recommend4}>từng là</Text>
                <Text style={styles.recommend5}>đom đóm</Text>
        
                <Text style={{color:'white', marginTop:10,fontSize:20,left:20}}>Tìm kiếm gần đây</Text>
               <Text style={{color:'gray', left:340, fontSize:20,marginTop:-20,}}>Xoá</Text>
            <FlatList 
            data={recentSongs} 
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            />
            </Content>

            <Footer>
            <BottomBar>
                    </BottomBar>
            </Footer>
            </Container>
        </>
    );
};
const styles = StyleSheet.create({
    container:{
        
    },
    header:{
        
    },
    headerText:{
        color:"white",
        fontSize:20,
        left:35,
        marginTop:20,
    },
    inputSearch:{
       padding:10,
       height:40,
       marginTop:20,
       width:370,
      margin:12,
        borderWidth:1,
        backgroundColor:'white',
        borderRadius:8,
    },
    recommend1:{
        left:20,
        color:'white',
        borderRadius:8,
        borderWidth:1,
        backgroundColor:'gray',
        width:110,
    },
    recommend2:{
        color:'white',
        borderRadius:8,
        borderWidth:1,
        backgroundColor:'gray',
        width:150,
        left:80,
    },
    recommend3:{
        color:'white',
        borderRadius:8,
        borderWidth:1,
        backgroundColor:'gray',
        width:70,
        left:40,
        marginTop:20,
    },
    recommend4:{
        color:'white',
        borderRadius:8,
        borderWidth:1,
        backgroundColor:'gray',
        width:55,
       left:170,
       marginTop:-20,
    },
    recommend5:{
        color:'white',
        borderRadius:8,
        borderWidth:1,
        backgroundColor:'gray',
        width:70,
       left:300,
       marginTop:-20,
    }
})
export default SearchScreen;
