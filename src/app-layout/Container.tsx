import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    backgroundColor: string;
    children?: React.ReactNode;
}

const Container: React.FC<Props> = ({ backgroundColor, children }) => {
    return (
        <SafeAreaView>
            <View style={[styles.container, { backgroundColor }]}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});

export default Container;
