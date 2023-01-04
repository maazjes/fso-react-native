import { TextInput as NativeTextInput } from 'react-native';

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, error && { borderColor: 'red', marginBottom: 0 }];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
