import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = (props: any) => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        {props.children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {

    width: '100%',
  },

});

export default Header;
