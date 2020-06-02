import React, { useEffect } from 'react'
import { Text, TouchableOpacity, TextInput, StyleSheet, View } from 'react-native'

export const CustomText = props => {
  let fontFamily = 'ubuntu'
  if (props.bold) fontFamily += '-bold'
  if (props.italic) fontFamily += '-italic'

  const { style, ...otherProps } = props

  return <Text style={{ fontFamily, ...style }} {...otherProps}>{props.children}</Text>
}

export const CustomTextInput = props => {
  let fontFamily = 'ubuntu'
  if (props.bold) fontFamily += '-bold'
  if (props.italic) fontFamily += '-italic'

  const { style, ...otherProps } = props

  return (
    <TextInput style={[styles.textInput, { fontFamily, ...style }]} {...otherProps} />
  )
}

export const CustomTextInputWithImg = props => {
  const { Icon, setContent } = props
  const [value, setValue] = React.useState()

  const updateValue = v => {
    setValue(v)
    setContent(v)
  }
  return (
    <View style={styles.CustomTextInputWithImg}>
      <View style={styles.CustomTextInputImg}>
        <Icon styles={{ textAlign: 'center' }} />
      </View>

      <TextInput multiline={true} onChangeText={updateValue} value={value} style={styles.CustomTextInputWithImgImput} placeholder={props.placeholder} />
    </View>
  )
}

export const CustomAreaInputWithImg = props => {
  const { Icon } = props
  const defaultRadius = styles.CustomTextInputWithImg.borderRadius
  const [isMultiline_, setMultiline_] = React.useState(false)  
  const [height_, setHeight_] = React.useState(200)
  const [borderRadius_, setBorderRadius_] = React.useState(defaultRadius)

  const handleFocus = _ => {
    setMultiline_(true)
    setBorderRadius_(12)
  }

  const handleBlur = _ => {
    setMultiline_(false)
    setBorderRadius_(defaultRadius)
  }

  const newStyle = { borderRadius: borderRadius_, height: height_, textAlignVertical: 'top', paddingTop: 5, alignItems: 'flex-start' }
  
  return (
    <View style={[styles.CustomTextInputWithImg, newStyle]}>
      {isMultiline_ ? null : (
        <View style={styles.CustomTextInputImg}>
          <Icon styles={{ textAlign: 'center' }} />
        </View>)}


      <TextInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        multiline={isMultiline_}
        style={[styles.CustomTextInputWithImgImput, newStyle]}
        placeholder={props.placeholder}
      />
    </View>
  )
}

export const CustomButton = props => {
  const { style, textStyle, title, children, isDisabled, ...otherProps } = props
  const [SisDisabled, setDisabled] = React.useState(isDisabled)

  useEffect(_ => {
    setDisabled(isDisabled)
  })
  return (
    <TouchableOpacity disabled={SisDisabled} style={{ ...styles.button, ...style, ...(isDisabled ? styles.disabled : {}) }} {...otherProps}>
      <CustomText bold={true} style={{ color: 'white', fontSize: 16, textAlign: 'center', lineHeight: 15, textAlignVertical: 'center', ...textStyle }} >
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
  disabled: {
    backgroundColor: '#9290B3'
  },
  CustomTextInputImg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 26,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 100,
    backgroundColor: '#fff'
  },
  CustomTextInputWithImg: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#9F91B5',
    paddingLeft: 15,
    color: 'white',
    width: 240,
    minHeight: 35,
    maxHeight: 220
  },
  CustomTextInputWithImgImput: {
    minHeight: 35,
    maxHeight: 220,
    borderRadius: 25,
    // borderColor: 'grey',
    // borderWidth: 0.7,
    color: 'white',
    paddingHorizontal: 7,
    flex: 1,
  },
  textInput: {
    borderRadius: 25,
    borderColor: 'grey',
    borderWidth: 0.7,
    color: 'white',
    width: '70%'
  },
})