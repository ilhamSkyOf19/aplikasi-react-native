import { height, width } from '@/utils/utils';
import { MaterialIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
// ================
// Props
// ================
interface Props {
  custom?: ViewStyle | ViewStyle[];
  customText?: TextStyle | TextStyle[];
  label: string;
  nameIcon?: keyof typeof MaterialIcons.glyphMap;
  handleButton: (() => void)[];
  sizeIcon?: number;
}
const ButtonBasic: React.FC<Props> = ({ handleButton, custom, label, customText, nameIcon, sizeIcon }) => {
  return (
    <TouchableOpacity onPress={() => handleButton.forEach(f => f())} style={[styles.containerButton, custom]}>
      {nameIcon && <MaterialIcons name={nameIcon} size={sizeIcon} color={'white'} />}
      <Text style={[styles.textBold, customText]}>
        {label}
      </Text>
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({
  containerButton: {
    width: width / 4.5,
    height: height / 26,
    backgroundColor: '#32CD32',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  textBold: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center'
  },
})


export default memo(ButtonBasic)
