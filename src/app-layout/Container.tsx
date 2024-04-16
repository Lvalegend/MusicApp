import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    colors: string[]
    children?: React.ReactNode;
}

const Container: React.FC<Props> = ({ colors, children }) => {
    return (
        <SafeAreaView>
            <LinearGradient colors ={colors} style={[styles.container]}>
                {children}
            </LinearGradient>
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
