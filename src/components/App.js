import TextService from "../services/textService";
import TextContext from "../contexts/textContext";
import StatisticalService from "../services/statisticalService";
import StatisticalContext from "../contexts/statisticalContext";
import CacheContext from "../contexts/cacheContext";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import Advisor from "./Advisor";
import theme from "../theme";
import CacheService from "../services/cacheService";

const statisticalService = new StatisticalService();
const cacheService = new CacheService();
const textService = new TextService();

function App() {
  return (
    <TextContext.Provider value={textService}>
      <StatisticalContext.Provider value={statisticalService}>
        <CacheContext.Provider value={cacheService}>
          <ChakraProvider theme={theme}>
            <CSSReset />
            <Advisor />
          </ChakraProvider>
        </CacheContext.Provider>
      </StatisticalContext.Provider>
    </TextContext.Provider>
  );
}

export default App;
