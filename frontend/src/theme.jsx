import {createTheme} from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#36d7b7', // Your custom primary color
    },
    secondary: {
      main: '#3366FF', // Your custom secondary color
    },
  },
});

export default customTheme;