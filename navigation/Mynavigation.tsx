import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import IniciarSesionScreen from "../screens/IniciarSesionScreen";
import HomeScreen from "../screens/HomeScreen";
import RegistrarseScreen from "../screens/RegistrarseScreen";
import ConfiguracionScreen from "../screens/ConfiguracionScreen";
import { NavigationContainer } from "@react-navigation/native";

const Mystack = createStackNavigator ()
const Mybotton = createBottomTabNavigator()
const Mydraw = createDrawerNavigator()

function Stackf () {
    return (
        <Mystack.Navigator screenOptions={{headerShown: false}}> 
            <Mystack.Screen 
            name="home" 
            component={HomeScreen}></Mystack.Screen>
        </Mystack.Navigator>


    )

}
function Bottonf (){
    return (
        <Mybotton.Navigator>
            <Mybotton.Screen 
            name="Stack" 
            component={Stackf} 
            options={{title:"Menu Principal"}}></Mybotton.Screen>
            <Mybotton.Screen name="Iniciar" component={IniciarSesionScreen}></Mybotton.Screen>
             <Mybotton.Screen name="Registrarte" component={RegistrarseScreen}></Mybotton.Screen>
        </Mybotton.Navigator>
    )

}
function Drawerf (){
    return(
        <Mydraw.Navigator>
            <Mydraw.Screen 
            name="tabs" 
            component={Bottonf}
             options={{title: "Menu Principal"}}></Mydraw.Screen>
             <Mydraw.Screen name="Configuracion" component={ConfiguracionScreen}></Mydraw.Screen>
        </Mydraw.Navigator>
        
    )

}
export default function Navegador  (){
    return(
        <NavigationContainer>
            <Drawerf/>
        </NavigationContainer>
    )
}