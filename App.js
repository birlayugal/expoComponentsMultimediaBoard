import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import {useVideoPlayer, VideoView} from 'expo-video'
import { useEvent } from 'expo';
import React, {useEffect} from 'react';
import { useFonts } from 'expo-font';
import {Asset} from 'expo-asset'

      // <const videoSource= {require("./assets/catSound1.mp4")}  size={size}/>


export default function App() {

const player = useVideoPlayer(videoSource, player => {
    // player.loop = true;
    // player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  useEvent(player, 'ended', () => {
    player.currentTime = 0;
  });

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

const togglePlay = () => {
  if (isPlaying) {
    player.pause();
  } else {
    if (player.currentTime >= player.duration) {
      player.currentTime = 0;
    }

    player.play();
  }
};  

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
 player={player}  size={size} onPress={togglePlay}/>
      <CatVideoButton source={require("./assets/2.mp4")} player={player}  size={size} onPress={togglePlay}/>

      <CatVideoButton source={require("./assets/3.mp4")} player={player}  size={size} onPress={togglePlay}/>

    </View>


      <View style ={{
        flexDirection : 'row'
      }}>
      <CatVideoButton player={player}  size={size} onPress={togglePlay}/>
      <CatVideoButton player={player}  size={size} onPress={togglePlay}/>

      <CatVideoButton player={player}  size={size} onPress={togglePlay}/>

    </View>
      


      <View style ={{
        flexDirection : 'row'
      }}>
      <CatVideoButton player={player}  size={size} onPress={togglePlay}/>
      <CatVideoButton player={player}  size={size} onPress={togglePlay}/>

      <CatVideoButton player={player}  size={size} onPress={togglePlay}/>

    </View>
      <Button
          title={isPlaying ? 'Pause' : 'Play'} name="cat1"
            onPress={togglePlay}

        />
      <StatusBar style="auto" />
  </View>

  );
}

class CatVideoButton extends React.Component {

  
 render(){
  return(
    <View style={{
      margin:10,
    }}>
      <TouchableHighlight onPress={() => {
        console.log("Pressed the cat.")
          this.props.onPress()
        
      }}>
      <View>
    <VideoView 
      player={this.props.player}
      
        // source={this.props.source}
        style={{ 
          width: this.props.width || this.props.size || 400, 
          height: this.props.width || this.props.size ||  400,
         }}
         fullscreenOptions={{ enable: true }}
         allowsPictureInPicture
         contentFit="cover"
      />
       
    </View>
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
