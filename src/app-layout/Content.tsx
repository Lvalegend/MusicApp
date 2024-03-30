import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';

const Content = (props:any) => {
  return (
    <View style={styles.content}>
        <ScrollView>
          {props.children}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
  },
});

export default Content;
