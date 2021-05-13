import React, { useEffect, useState } from 'react';
import { View, Dimensions, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';
import Bird from './components/Bird'
import Obstacles from './components/Obstacles';
import styles from './styles'

export default function App() {

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth / 2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [gravity, setGravity] = useState(4)
  let obstacleWidth = 60
  let obstacleHeight = 300
  let gap = 200
  let gameTimerId
  let obstaclesTimerId
  let obstaclesTimerIdTwo

  //Reset Game
  const restart = () => {
    setBirdBottom(screenHeight / 2)
    setObstaclesLeft(screenWidth)
    setObstaclesLeftTwo(screenWidth + screenWidth / 2 + 30)
    setObstaclesNegHeight(0)
    setObstaclesNegHeightTwo(0)
    setScore(0)
    setIsGameOver(false)
  }

  //Gravity system
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
        setGravity(gravity => gravity + .5)
      }, 30)
      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom])

  //Jump
  const jump = () => {
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
      setGravity(4)
    }
  }

  //Start first obstacle
  useEffect(() => {
    if ((obstaclesLeft - birdLeft) < 3 && (obstaclesLeft - birdLeft) > 0) {
      setScore(score => score + 1)
    }
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesTimerId)
      }
    } else {
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight(- Math.random() * 100)
    }
  }, [obstaclesLeft])

  //Start second obstacle
  useEffect(() => {
    if ((obstaclesLeftTwo - birdLeft) < 3 && (obstaclesLeftTwo - birdLeft) > 0) {
      setScore(score => score + 1)
    }
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesTimerIdTwo)
      }
    } else {
      setObstaclesLeftTwo(screenWidth)
      setObstaclesNegHeightTwo(- Math.random() * 100)
    }
  }, [obstaclesLeftTwo])

  //Check for collisions
  useEffect(() => {
    //console.log(obstaclesLeft)
    //console.log(screenWidth / 2)
    //console.log(obstaclesLeft > screenWidth / 2)
    if (
      ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
        birdBottom > (obstaclesNegHeight + obstacleHeight + gap - 30)) &&
        (obstaclesLeft > screenWidth / 2 - 30 && obstaclesLeft < screenWidth / 2 + 30)
      )
      ||
      ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
        birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap - 30)) &&
        (obstaclesLeftTwo > screenWidth / 2 - 30 && obstaclesLeftTwo < screenWidth / 2 + 30)
      )
    ) {
      //console.log('game over')
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesTimerId)
    clearInterval(obstaclesTimerIdTwo)
    setIsGameOver(true)
  }

  if (isGameOver) {
    return (
      <View style={styles.container}>
        <Text style={styles.game_over}>Score: {score.toString()}</Text>
        <TouchableOpacity
          onPress={restart}
          style={styles.retry_buttom}>
          <Text style={styles.game_over}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Bird
          birdBottom={birdBottom}
          birdLeft={birdLeft}
        />
        <Obstacles
          color={'green'}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeight}
          gap={gap}
          obstaclesLeft={obstaclesLeft}
        />
        <Obstacles
          color={'green'}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeightTwo}
          gap={gap}
          obstaclesLeft={obstaclesLeftTwo}
        />
        <Text style={styles.curr_score}>{score}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}