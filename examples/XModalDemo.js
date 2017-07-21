/**
 * Created by 孟庆东 on 2017/7/19.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
} from 'react-native';
import {StackNavigator} from "react-navigation";

import {ModalContainer} from 'react-native-xmodal'
import XModal from 'react-native-xmodal'
import * as Animatable from 'react-native-animatable';


export default class XModalDemo extends Component {
    render() {
        return (
            <View  style={{flex:1}}>
                <Navigator/>
                <View style={{position:'absolute',top:0,left:0,right:0,bottom:0,}}>
                    <ModalContainer/>
                </View>
            </View>
        );
    }
}


class HomePage extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Button title='show modal(Bottom,height:200)' onPress={() => {
                    XModal.show(<Modal1/>,{position:XModal.POSITION.BOTTOM,componentHeight:200});
                }}/>
                <Button title='show modal(Bottom)' onPress={() => {
                    XModal.show(<Modal1/>,{position:XModal.POSITION.BOTTOM});
                }}/>
                <Button title='show modal(Topheight:200)' onPress={() => {
                    XModal.show(<Modal1/>,{position:XModal.POSITION.TOP,componentHeight:200});
                }}/>
                <Button title='show modal(Top)' onPress={() => {
                    XModal.show(<Modal1/>,{position:XModal.POSITION.TOP});
                }}/>
                <Button title='show modal' onPress={() => {
                    XModal.show(<Modal1/>);
                }}/>

            </View>
        );
    }
}

class MainPage extends Component {
    render() {
        return (
            <View>
                <Button title='show'/>
            </View>
        );
    }
}

class Modal1 extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <View
                style={{width: 300, height: 200, backgroundColor: 'red',justifyContent:'center'}}>
                <Button title='hide modal' onPress={() => {
                    XModal.hide();
                }}/>
            </View>
        );
    }
}

const Navigator = StackNavigator({
    Home: {screen: HomePage,},
    Main: {screen: MainPage,}
});