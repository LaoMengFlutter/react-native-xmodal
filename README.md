# react-native-xmodal
react native 弹出框，类似android的DialogFragment

项目中依赖了mobx（https://github.com/mobxjs/mobx） 和  babel-plugin-transform-decorators-legacy（https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy）

使用：

1、在终端进入到项目目录：npm i react-native-xmodal --save

2、在整个app的最外层添加 ModalContainer 控件，一般项目我们都会用到react-navigation，所以使用react-navigation实例：
   
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
    
    
 3、在需要弹出的地方调用： XModal.show(<Component/>);
 
 4、隐藏：XModal.hide();
 
 show方法等参数：
 
 component：要显示的组件
 
 animationType：modal的animationType ，默认‘fade’
 
 transparent：modal是否透明，默认true
 
 position：弹出的位置，默认居中，
 
 
 ![image](https://github.com/781238222/react-native-xmodal/blob/master/examples/screen/123.png)
