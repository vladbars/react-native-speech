import React from 'react';
import {gs} from '../styles/gs';
import {Text, TouchableOpacity, type TouchableOpacityProps} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({label, disabled, ...rest}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[gs.button, disabled && gs.disabled]}
      {...rest}>
      <Text style={gs.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
