import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Header = (props: any) => {
  return (


    <View style={styles.header}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
  },

});

export default Header;
