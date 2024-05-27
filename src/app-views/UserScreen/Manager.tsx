import { NavigationProp } from "@react-navigation/native"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { deleteToken } from "../../secure-storage/DeleteToken"

interface ManagerProps {

}

const Manager: React.FC<ManagerProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const handleLogout = async () => {
        await deleteToken()
        navigation.navigate('User')
    }
    return (
        <View>
            <Text style={{ color: 'red', fontSize: 30 }}>Manager user</Text>
            <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, marginHorizontal: 20, borderRadius: 10 }} onPress={handleLogout}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 15 }}>Logout</Text>
            </TouchableOpacity>
        </View>

    )
}
export default Manager