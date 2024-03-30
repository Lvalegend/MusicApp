import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = (props:any) => {
  return (
    <View style={styles.footer}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
  },
});

export default Footer;
