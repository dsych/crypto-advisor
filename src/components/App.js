import DataService from '../services/dataService';
import DataContext from '../contexts/dataContext';
import CacheContext from '../contexts/cacheContext';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import Advisor from './Advisor';
import theme from '../theme';
import CacheService from '../services/cacheService';
import TextService from '../services/textService';
import TextContext from '../contexts/textContext';

const dataService = new DataService();
const cacheService = new CacheService();
const textService = new TextService();

function App() {
  return (
    <DataContext.Provider value={dataService}>
      <TextContext.Provider value={textService}>
        <CacheContext.Provider value={cacheService}>
          <ChakraProvider theme={theme}>
            <CSSReset />
            <Advisor />
          </ChakraProvider>
        </CacheContext.Provider>
      </TextContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
