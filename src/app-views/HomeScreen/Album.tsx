import * as React from 'react';
import { View, Text, Image, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { icon3Cham, iconBack, iconDownload, iconFavourite } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import LinearGradient from 'react-native-linear-gradient';
import Song from '../SongScreen/Song';
import { useEffect, useState } from 'react';
import { hostNetwork } from '../../host/HostNetwork';
import axios from 'axios';

interface AlbumProps {
  route: any;
}

interface Album {
  _id: string;
  name: string;
  color: string[];
  songs: any[];
  __v: number;
}

const Album: React.FC<AlbumProps & { navigation: NavigationProp<any> }> = ({ route, navigation }) => {
  const { id } = route.params;
  const [selectedSong, setSelectedSong] = React.useState<string | null>(null);
  const [playlist, setPlaylist] = useState<Album | null>(null);
  const [playlistImage, setPlaylistImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`http://${hostNetwork}:3000/album/${id}`);
        setPlaylist(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlaylist();
  }, [id]);

  const getImage = async (playlistId: string) => {
    try {
      const response = await fetch(`http://${hostNetwork}:3000/albumImages?id=${playlistId}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Không thể lấy ảnh');
      }

      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data: string = reader.result as string;
        setPlaylistImage(base64data);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Lỗi khi lấy ảnh:', error);
    }
  };

  useEffect(() => {
    if (playlist && playlist.songs.length > 0) {
      getImage(playlist._id);
    }
  }, [playlist]);

  if (!playlist) {
    return <Text>Đang tải...</Text>;
  }

  const chillsData = [
    { id: '1', title: 'Point the star', artist: 'Jasper, Martin Arteta, 11:11 Music Group', image: require('../../assets/images/song/SongChill1.jpg') },
    { id: '2', title: 'I Need a Girl', artist: 'Lee', image: require('../../assets/images/song/SongChill2.jpg') },
    { id: '3', title: 'I Like Me Better', artist: 'Peaceful Melody, soave lofi', image: require('../../assets/images/song/SongChill3.jpg') },
    { id: '4', title: 'See You Again', artist: 'Peaceful Melody, soave lofi', image: require('../../assets/images/song/SongChill4.jpg') },
    { id: '5', title: 'Stenven Universe', artist: 'Jasper, Martin Arteta, 11:11 Music Group', image: require('../../assets/images/song/SongChill5.jpg') },
    { id: '6', title: 'Payphone', artist: 'Peaceful melody, soave lofi', image: require('../../assets/images/song/SongChill6.jpg') },
    { id: '7', title: 'You re Beautiful', artist: 'Peaceful Melody, soave lofi', image: require('../../assets/images/song/SongChill7.jpg') },
  ];


  return (
    <>
      <Container colors={['black', 'black', 'black']}>
        <LinearGradient colors={playlist.color} style={{ flex: 1 }}>
          <Header>
            <View style={styles.containerHeader}>
              <Pressable onPress={() => navigation.goBack()}>
                <SvgXml xml={iconBack()} />
              </Pressable>
              <Text style={styles.headerText}>PLAYLIST</Text>
            </View>
          </Header>
          <Content>
            {playlistImage && (
              <ImageBackground source={{ uri: playlistImage }} style={styles.imageBackground}>
                <Text style={styles.albumTitle}>{playlist.name}</Text>
              </ImageBackground>
            )}
            <View style={styles.containerFunction}>
              <Pressable style={styles.icon}>
                <SvgXml xml={iconDownload()} />
                <Text style={styles.text}>Tải về</Text>
              </Pressable>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>PHÁT NGẪU NHIÊN</Text>
              </Pressable>
              <Pressable style={styles.icon}>
                <SvgXml xml={iconFavourite()} />
                <Text style={styles.text}>Yêu thích</Text>
              </Pressable>
            </View>

            {chillsData.map((item) => (
              <Pressable key={item.id} style={styles.song}>
                <View style={styles.songInfo}>
                  <Image source={item.image} style={styles.image} />
                  <View style={styles.songDetails}>
                    <Text style={styles.songTitle}>{item.title}</Text>
                    <Text style={styles.songArtist}>{item.artist}</Text>
                  </View>
                </View>
                <SvgXml xml={icon3Cham()} style={styles.songIcon} />
              </Pressable>
            ))}
          </Content>
          <Footer></Footer>
        </LinearGradient>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    margin: 20,
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    margin: 5,
    marginLeft: 120,
  },
  containerFunction: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 40,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#925bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  icon: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  song: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 17,
  },
  songInfo: {
    flexDirection: 'row',
    width: 360,
  },
  songDetails: {
    margin: 10,
  },
  songTitle: {
    color: 'white',
    fontSize: 15,
    marginBottom: 7,
  },
  songArtist: {
    color: 'gray',
  },
  songIcon: {
    marginTop: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  imageBackground: {
    width: 230,
    height: 230,
    marginHorizontal: 90,
    borderRadius: 20,
    overflow: 'hidden',
  },
  albumTitle: {
    color: '#f26161',
    top: 165,
    margin: 15,
    fontSize: 30,
  },
});

export default Album;
