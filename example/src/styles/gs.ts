import {createRStyle} from 'react-native-full-responsive';

export const gs = createRStyle({
  flex: {
    flex: 1,
  },
  disabled: {
    opacity: 0.6,
  },
  button: {
    flex: 1,
    height: '35rs',
    borderRadius: '5rs',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
  },
  buttonText: {
    color: '#000000',
    fontSize: '14rs',
    fontWeight: '600',
  },
  title: {
    fontSize: '18rs',
    fontWeight: '700',
    marginBottom: '10rs',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '14rs',
    lineHeight: '22rs',
    textAlign: 'justify',
  },
  p10: {
    padding: '10rs',
  },
  row: {
    columnGap: '5rs',
    flexDirection: 'row',
  },
});
