import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ImageBackground, Pressable, ScrollView, StyleSheet, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { iconSreach } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import PlayList from './PlayList';
import { hostNetwork } from '../../host/HostNetwork';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

interface HomeScreenProps {}

interface Playlist {
  _id: string;
  name: string;
  color: string[];
  songs: any[];
  __v: number;
}

interface Album {
  _id: string;
  name: string;
  color: string[];
  songs: any[];
  __v: number;
}

interface Song {
  _id: string;
  nameSong: string;
  imageLink: string;
  songLink: string;
  diration: string;
  singerId: string;
  managerId: string;
}


const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [text, setText] = useState('');
  const [showPlayList, setShowPlayList] = useState(true);
  const [selectedIdP, setSelectedIdP] = useState<string>('');
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistImages, setPlaylistImages] = useState<any>([])
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumImages, setAlbumImages] = useState<any>([])
  const [songs, setSongs] = useState<Song[]>([]);
  const [songImages, setSongImages] = useState<any>([])
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      const response = await axios.post(`http://${hostNetwork}:3000/search`, {
        "searchKeyword": text
      });
      console.log(response.data)
      if (Array.isArray(response.data)) {
        setSongs(response.data);
      } else {
        console.error('Error: No items in response data or items is not an array');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    if (isFocused) {
        fetchData();
    }
  }, [isFocused]);

  useEffect(() => {
    axios.get(`http://${hostNetwork}:3000/inforPlaylist`)
      .then(response => {
        setPlaylists(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  

  const getImage = async (playlistId: any) => {
    try {
        const response = await fetch(`http://${hostNetwork}:3000/playlistImages?id=${playlistId}`, {
            method: 'GET',

        });
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        // const contentType = response.headers.get('Content-Type');
        // if (!contentType || !contentType.startsWith('playlist/')) {
        //     throw new Error('Response is not an image');
        // }

        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data: any = reader.result;
            setPlaylistImages((prevImageData: any) => [...prevImageData, base64data]);
        };
        reader.readAsDataURL(blob);
    } catch (error) {
        console.error('Error fetching image:', error);
    }
 };
 useEffect(() => {
  const sendMultipleRequests = async () => {
    try {
      for (const idSongObj of playlists) {
        const songId = Object.values(idSongObj)[0];
        await getImage(songId);
        console.log(songId)
      }
    } catch (error) {
      console.error('Error sending multiple requests:', error);
    }
  };
  sendMultipleRequests();
  }, [playlists]);


  useEffect(() => {
    axios.get(`http://${hostNetwork}:3000/inforAlbum`)
      .then(response => {
        setAlbums(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const getImageAlbum = async (albumId: any) => {
    try {
        const response = await fetch(`http://${hostNetwork}:3000/albumImages?id=${albumId}`, {
            method: 'GET',

        });
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data: any = reader.result;
            setAlbumImages((prevImageData: any) => [...prevImageData, base64data]);
        };
        reader.readAsDataURL(blob);
    } catch (error) {
        console.error('Error fetching image:', error);
    }
 };
 useEffect(() => {
  const sendMultipleRequestsAlbum = async () => {
    try {
      for (const idSongObj of albums) {
        const songId = Object.values(idSongObj)[0];
        await getImageAlbum(songId);
        console.log(songId)
      }
    } catch (error) {
      console.error('Error sending multiple requests:', error);
    }
  };
  sendMultipleRequestsAlbum();
  }, [albums]);

  const getImageSong = async (songId: any) => {
    try {
        const response = await fetch(`http://${hostNetwork}:3000/songImages?id=${songId}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        const blob = await response.blob();
        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result); // Trả về chuỗi base64
            };
            reader.onerror = reject; // Bắt lỗi khi đọc Blob
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error fetching image:', error);
        return null; // Trả về null nếu có lỗi
    }
  };
  const handleGetImage = async (songId: any) => {
    const base64Image = await getImageSong(songId);
    if (base64Image) {
        console.log('Base64 Image:', base64Image);
        // Sử dụng hình ảnh base64 theo nhu cầu của bạn
    } else {
        console.log('Failed to fetch image');
    }
};



  const handleNavigateToPlaylist = (ID: string) => {
    setShowPlayList(false);
    setSelectedIdP(ID);
  };

  const handleNavigateToBackL = () => {
    setShowPlayList(true);
  };

  const handleChangeText = (newText: string) => {
    setText(newText);
  };

  return (
    <>
      {showPlayList ? (
        <Container colors={['black', 'black', 'black']}>
          <Header>
            <Text style={{ color: 'white', fontSize: 32, marginLeft: 20, marginTop: 20 }}>Home</Text>
            <View style={styles.searchContainer}>
              <Pressable onPress={fetchData}>
                <SvgXml xml={iconSreach()} style={{ margin: 12, marginRight: 0 }} />
              </Pressable>
              <TextInput
                style={styles.input}
                value={text}
                onChangeText={handleChangeText}
                placeholder="Search"
              />
            </View>
          </Header>

          <Content>
            <Text style={{ fontSize: 18, color: 'white', margin: 20 }}>
              Playlist Hot
            </Text>
            <ScrollView horizontal>
              <View>
                <View style = {{flexDirection: 'row'}}>
                  {playlistImages.map((item: any, index: any) => (
                    <View key={index}>
                      <Image
                          style={styles.logo}
                          source={{uri: item}}
                      />
                    </View>
                  ))}
                </View>
                <View style = {{flexDirection: 'row'}}>
                  {playlists.map((item) => (
                    <Pressable
                      key={item._id}
                      onPress={() => handleNavigateToPlaylist("1")}
                      style = {{marginLeft: 90, marginRight:60, marginTop: 5}}
                    >
                        <Text style={styles.title}>{item.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </ScrollView>

            <Text style={{ fontSize: 18, color: 'white', margin: 20 }}>
              Album Hot
            </Text>
            <ScrollView horizontal>
              <View>
                <View style = {{flexDirection: 'row'}}>
                  {albumImages.map((item: any, index: any) => (
                    <View key={index}>
                      <Image
                          style={styles.logo}
                          source={{uri: item}}
                      />
                    </View>
                  ))}
                </View>
                <View style = {{flexDirection: 'row'}}>
                  {albums.map((item) => (
                    <Pressable
                      key={item._id}
                      onPress={() => handleNavigateToPlaylist(item._id)}
                      style = {{marginLeft: 90, marginRight:80, marginTop: 5}}
                    >
                        <Text style={styles.title}>{item.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </ScrollView>


            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 18, color: 'white', marginLeft: 20, marginTop: 20 }}>
                Song Play
              </Text>
              {/* <Text style={{ fontSize: 18, color: 'white', marginLeft: 190, marginTop: 20 }}>
                See all
              </Text> */}
            </View>

            {songs.map((item) => (
              <Pressable
                key={item._id}
                style={styles.item}
              >
                <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song} />
                
                <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                  <Text style={{ color: 'white' }}>{item.nameSong}</Text>
                  <Text style={{ color: 'white' }}>{item.singerId}</Text>
                  <Text style={{ color: 'white', marginTop: 8 }}>{item.diration}</Text>
                </View>
              </Pressable>
            ))}
          </Content>

          <Footer>
            <BottomBar />
          </Footer>
        </Container>
      ) : (
        <PlayList handleNavigateBack={handleNavigateToBackL} id={selectedIdP} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 20,
    height: 40,
  },
  logo: {
    height: 170,
    width: 170,
    alignContent: 'center',
    marginLeft: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingVertical: 1,
    paddingHorizontal: 10,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: '#D9D9D9',
    height: 500,
  },
  list: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  playList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#24242E',
    height: 100,
    width: 380,
    alignContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
  word: {
    fontSize: 18,
    color: 'white',
    alignContent: 'stretch',
  },
  song: {
    height: 70,
    width: 70,
    borderRadius: 10,
  },
});

export default HomeScreen;
