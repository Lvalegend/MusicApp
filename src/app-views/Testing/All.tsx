import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';


const YourComponent = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const pagerRef = useRef<any>(null);

    const handleNext = () => {
        if (pagerRef.current) {
            const nextPage = currentPage + 1;
            pagerRef.current.setPage(nextPage); 
            setCurrentPage(nextPage);
        }
    };

    const handlePrevious = () => {
        if (pagerRef.current) {
            const previousPage = currentPage - 1;
            pagerRef.current.setPage(previousPage);
            setCurrentPage(previousPage);
        }
    };
    console.log(currentPage);
    

    return (
        <View style={{ flex: 1 }}>
            <PagerView ref={pagerRef} style={{ flex: 1 }}  onPageSelected={(event) => setCurrentPage(event.nativeEvent.position)}>
                <View key="1">
                    <Text>Screen 1</Text>
                </View>
                <View key="2">
                    <Text>Screen 2</Text>
                </View>
            </PagerView>

            {/* Custom navigation buttons */}
            <TouchableOpacity onPress={handlePrevious}>
                <Text style={{ backgroundColor: 'red' }}>Previuos</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNext}>
                <Text style={{ backgroundColor: 'blue' }}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

export default YourComponent;
