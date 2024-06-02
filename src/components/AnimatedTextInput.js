import React, { useRef, useState } from 'react';
import { Animated, Text, TextInput, View } from 'react-native';

const AnimatedTextInput = ({type,placeholder,secure,value,onChangeText,keyBoardType}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyle = {
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 10], // Tamanho do texto do placeholder
    }),
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -5], // Posição vertical do placeholder
    }),
  };

  return (
    <View style={{alignItems:'flex-start',justifyContent:'center',width:'100%'}} >
      {isFocused && <Animated.Text style={[styles.placeholder, animatedStyle]}>{placeholder}</Animated.Text>}
      <TextInput
        style={{padding:5,width:'100%'}}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor='#444'
        placeholder={isFocused ? '' : placeholder}
        autoCapitalize='none'
        autoCorrect={true}
        secureTextEntry={secure}
        textContentType={type}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyBoardType}
      />
    </View>
  );
};

const styles = {
  textInput: {
    borderRadius:4,
    padding:12,
    backgroundColor:'#FAFAFA',
    marginBottom:10,
    borderWidth:1
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    color: 'gray',
    zIndex:6,
  },
};

export default AnimatedTextInput;
