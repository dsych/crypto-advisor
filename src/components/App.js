import TextService from '../services/textService';
import TextContext from '../contexts/textContext';
import DataService from '../services/dataService';
import DataContext from '../contexts/dataContext';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import Advisor from './Advisor';
import theme from '../theme';

const dataService = new DataService();
const textService = new TextService();

function App() {
  return (
    <DataContext.Provider value={dataService}>
      <TextContext.Provider value={textService}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <Advisor />
        </ChakraProvider>
      </TextContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
