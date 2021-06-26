import DataService from "../services/dataService";
import DataContext from "../contexts/dataContext";
import CacheContext from "../contexts/cacheContext";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import Advisor from "./Advisor";
import theme from "../theme";
import CacheService from "../services/cacheService";

const dataService = new DataService();
const cacheService = new CacheService();

function App() {
  return (
    <DataContext.Provider value={dataService}>
      <CacheContext.Provider value={cacheService}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <Advisor />
        </ChakraProvider>
      </CacheContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
