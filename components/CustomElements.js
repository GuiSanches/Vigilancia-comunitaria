import React from 'react'
import { Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

export const CustomText = props => {
    let fontFamily = 'ubuntu'
    if(props.bold) fontFamily += '-bold'
    if(props.italic) fontFamily += '-italic'

    const {style, ...otherProps} = props

    return <Text style={{fontFamily, ...style}} {...otherProps}>{props.children}</Text>
}

export const CustomTextInput = props => {
  let fontFamily = 'ubuntu'
  if(props.bold) fontFamily += '-bold'
  if(props.italic) fontFamily += '-italic'

  const {style, ...otherProps} = props

  return (
    <TextInput style={[styles.textInput, {fontFamily, ...style}]} {...otherProps} />
  )
}

export const CustomButton = props => {
  const {style, textStyle, title, children,...otherProps} = props

  return (
    <TouchableOpacity style={styles.button} {...otherProps}>
      <CustomText bold={true} style={{color: 'white', fontSize: 16, textAlign: 'center', lineHeight: 15,textAlignVertical: 'center',...textStyle}} >
        {title ? title : children}
      </CustomText>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    width: '70%',
    height: 40,
    backgroundColor: '#CF62A4',
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: 'grey',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderRadius: 25,
    borderColor: 'grey',
    borderWidth: 0.7,
    color: 'white',
    width: '70%',    
  }
})