import DataService from "../services/dataService";
import DataContext from "../contexts/dataContext";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import Advisor from "./Advisor";
import theme from "../theme";

const dataService = new DataService();

function App() {
  return (
    <DataContext.Provider value={dataService}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Advisor />
      </ChakraProvider>
    </DataContext.Provider>
  );
}

export default App;
