import React from 'react';
import { View } from 'react-native';

export default function Bird({ birdBottom, birdLeft }) {
  const birdWidth = 50
  const birdHeight = 60

  return (
    <View style={{
      backgroundColor: 'red',
      width: birdWidth,
      height: birdHeight,
      position: 'absolute',
      left: birdLeft - (birdWidth / 2),
      bottom: birdBottom - (birdHeight / 2),
    }}/>
  )
}