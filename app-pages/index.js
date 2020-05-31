import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions
} from "react-native";
import Animated,{Easing} from "react-native-reanimated"
import {TapGestureHandler,State} from "react-native-gesture-handler"
const {width,height} = Dimensions.get('window')
const {Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    clockRunning,
    debug,
    timing,
    interpolate,
Extrapolate} = Animated
function runTiming(clock, value, dest) {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0)
    };
  
    const config = {
      duration: 1000,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease)
    };
  
    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]),
      timing(clock, state, config),
      cond(state.finished, debug('stop clock', stopClock(clock))),
      state.position
    ]);
  }
class HomePage extends Component {
    constructor(){
        super()
        this.buttonOpacity = new Value(1)
        this.onStateChange = event([{
            nativeEvent:({state})=>block([
                cond(eq(state,State.END),set(this.buttonOpacity,runTiming(new Clock,1,0)))
            ])
        }])
        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
          });
          this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3, 0],
            extrapolate: Extrapolate.CLAMP
          });
    }
    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={{...StyleSheet.absoluteFill,transform:[{translateY:this.bgY}]}}>
                    <Image style={styles.image} source={require('../assets/bg.jpg')}/>
                </Animated.View>
                <View style={styles.buttonContainer} >
                    <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                    <Animated.View style={{...styles.button,opacity:this.buttonOpacity,transform:[{translateY:this.buttonY}]}}>
                        <Text style={styles.text}>Let`s play!</Text>
                    </Animated.View>
                    </TapGestureHandler>
                </View>
            </View>
        );
    }
}
export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
        justifyContent:"flex-end"
    },
    image:{
        flex:1,
        height:null,
        width:null
    },
    buttonContainer:{
        height:height/4
    },
    button:{
        height:70,
        backgroundColor:"white",
        marginHorizontal:20,
        borderRadius:35,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:20,
        fontWeight:"bold",
        textTransform:"uppercase"
    }
});