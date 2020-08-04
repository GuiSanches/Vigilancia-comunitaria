import React, { Component } from "react";

import { View, StyleSheet, TouchableOpacity } from "react-native";
import { BoxShadow } from "react-native-shadow";

const NeomorphicButton = ({ onPress, width, height, style, children }) => {
  const morphTop = {
    width,
    height,
    color: "#222222",
    border: 2,
    radius: 25,
    opacity: 0.2,
    x: 4,
    y: 6,
    style: { marginVertical: 5 },
  };

  const morphBottom = {
    width,
    height,
    color: "#404040",
    border: 2,
    radius: 25,
    opacity: 0.2,
    x: -4,
    y: -4,
    style: { marginVertical: 5 },
  };

  return style ? (
    <TouchableOpacity style={style} onPress={onPress}>
      <BoxShadow setting={morphTop}>
        <BoxShadow setting={morphBottom}>{children}</BoxShadow>
      </BoxShadow>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <BoxShadow setting={morphTop}>
        <BoxShadow setting={morphBottom}>{children}</BoxShadow>
      </BoxShadow>
    </TouchableOpacity>
  );
};

export default NeomorphicButton;