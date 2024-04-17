import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { iconDownload, iconFavourite, iconHome, iconPopular, iconUser } from '../../app-uikits/icon-svg';


interface Props{

}


const BottomBarCustom: React.FC<Props> = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touch}>
                <SvgXml xml={iconHome()} />
                <Text style={styles.text}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touch}>
                <SvgXml xml={iconPopular()} />
                <Text style={styles.text}>Popular</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touch}>
                <SvgXml xml={iconFavourite()} />
                <Text style={styles.text}>Favourite</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touch}>
                <SvgXml xml={iconDownload()} />
                <Text style={styles.text}>Download</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touch}>
                <SvgXml xml={iconUser()} />
                <Text style={styles.text}>User</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom:20,
       

    },
    text: {
       color: 'white',
       marginTop: 5
    
    },
    touch: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default BottomBarCustom;
