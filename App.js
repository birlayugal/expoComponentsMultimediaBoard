import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import {useVideoPlayer, VideoView} from 'expo-video'
import { useEvent } from 'expo';
import React from 'react';


      // <const videoSource= {require("./assets/catSound1.mp4")}  size={size}/>
const videoSource = require("./assets/catSound1.mp4");


export default function App() {

const player = useVideoPlayer(videoSource, player => {
    // player.loop = true;
    // player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  useEvent(player, 'ended', () => {
    player.currentTime = 0;
  });

  let size = 100; 
  return (
    <View style={styles.container}>
      <Text>Cat Sounds</Text>
      <CatVideoButton player={player}  size={size}/>
      
      <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              if (player.currentTime >= player.duration) {
                player.currentTime = 0;
              }
                
                player.play();
            }
          }}
        />
      <StatusBar style="auto" />
    </View>
  );
}

class CatVideoButton extends React.Component {

  
 render(){
  return(
    <View>
      <TouchableHighlight onPress={() => {
        console.log("Pressed the cat.")
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
