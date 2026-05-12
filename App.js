import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import {useVideoPlayer, VideoView} from 'expo-video'
import { useEvent } from 'expo';
import React, {useEffect} from 'react';
import { useFonts } from 'expo-font';
import {Asset} from 'expo-asset'

      // <const videoSource= {require("./assets/catSound1.mp4")}  size={size}/>


export default function App() {



  // state = {
  //   isready:"false"
  // } 

  // _loadFontsAsync = async () => {
  //   await Expo.Font.loadAsync({
  //     CooperBlackRegular: require("./assets/CooperBlackRegular.ttf")
  //   });
  // }

// _setupAsync = async () => {
//   await promise.all([
//     this._setAudioModeAsync(),
//     this._loadFontsAsync(),
//   ]);
// this.setState({isReady: true});
// }


const loadAssetsAsync = async () => {
  await Asset.loadAsync([
    require("./assets/1.mp4"),
    require("./assets/2.mp4"),
    require("./assets/3.mp4"),
    require("./assets/4.mp4"),
    require("./assets/5.mp4"),
    require("./assets/6.mp4"),
    require("./assets/7.mp4"),
    require("./assets/8.mp4"),
    require("./assets/9.mp4"),

  ]);
};

useEffect(() => {
  loadAssetsAsync();
  
}, []);


  const [fontLoaded] = useFonts({
    CooperBlackRegular: require("./assets/CooperBlackRegular.ttf")
  })


if(!fontLoaded){
  return null;
}
  let size = 100; 
  return (
  //   {
  //   if (!this.state.isReady){
  //     return(<Expo.AppLoading/>);
  //   }
  // }
    <View style={styles.container}>
      <Text style={{
        color: "yellow",
        fontSize: 42,
        fontFamily: "CooperBlackRegular",
      }}>Cat Sounds</Text>

      <View style ={{
        flexDirection : 'row'
      }}>
      <CatVideoButton source={require("./assets/1.mp4")}
   size={size} />
      <CatVideoButton source={require("./assets/2.mp4")}   size={size} />

      <CatVideoButton source={require("./assets/3.mp4")}   size={size} />

    </View>


      <View style ={{
        flexDirection : 'row'
      }}>
      <CatVideoButton source={require("./assets/4.mp4")}  size={size} />
      <CatVideoButton source={require("./assets/5.mp4")} size={size} />

      <CatVideoButton  source={require("./assets/6.mp4")} size={size} />

    </View>
      


      <View style ={{
        flexDirection : 'row'
      }}>
      <CatVideoButton source={require("./assets/7.mp4")}  size={size} />
      <CatVideoButton  source={require("./assets/8.mp4")} size={size} />

      <CatVideoButton source={require("./assets/9.mp4")}  size={size} />

    </View>
      
      <StatusBar style="auto" />
  </View>

  );
}

function CatVideoButton (props) {

  const player = useVideoPlayer (props.source); 

  const {isPlaying} = useEvent (
    player,
  'playingChange',
  {isPlaying:player.playing}    
  );


  useEvent(player, 'ended', () => {
    player.currentTime = 0;
  });

  const togglePlay = () =>{
    if (isPlaying){
      player.pause();

    }else {
      if(player.currentTime >= player.duration){
        player.currentTime = 0;
      }
      player.play();
    }
  };

 {
  return(
    <View style={{
      margin:10,
    }}>
      <TouchableHighlight onPress={() => {
        console.log("Pressed the cat.")
          togglePlay()
        
      }}>
      
    <VideoView 
      player={player}
      
        // source={this.props.source}
        style={{ 
          width: props.width || props.size || 400, 
          height: props.width || props.size ||  400,
         }}
         fullscreenOptions={{ enable: true }}
         allowsPictureInPicture
         contentFit="cover"
      />
       
    
    </TouchableHighlight>
    </View>
        )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
