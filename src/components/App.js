import {
  Box,
  ChakraProvider,
  CSSReset,
  Flex,
  Heading,
  Link,
  Spacer,
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import CacheContext from "../contexts/cacheContext";
import StatisticalContext from "../contexts/statisticalContext";
import TextContext from "../contexts/textContext";
import CacheService from "../services/cacheService";
import StatisticalService from "../services/statisticalService";
import TextService from "../services/textService";
import theme from "../theme";
import Advisor from "./Advisor";

const statisticalService = new StatisticalService();
const cacheService = new CacheService();
const textService = new TextService();

const navigationLink = (text, url) => (
  <Link
    mx="5"
    color="blue.500"
    as={NavLink}
    to={url}
    activeStyle={{ color: "#ECC94B" }}
  >
    <Heading size="md">{text}</Heading>
  </Link>
);

function App() {
  return (
    <TextContext.Provider value={textService}>
      <StatisticalContext.Provider value={statisticalService}>
        <CacheContext.Provider value={cacheService}>
          <ChakraProvider theme={theme}>
            <CSSReset />
            <Box
              borderWidth="1px"
              w={{ base: "90%", sm: "80%", md: "70%", xl: "45%" }}
              rounded="lg"
              m="auto"
              mt={{ base: "5%" }}
              mb={{ base: "5%" }}
              p="30px"
              shadow="md"
            >
              <Router>
                <Flex mb="10" align="center" wrap="wrap">
                  <Heading px="2" fontWeight="extrabold" color="yellow.400">
                    CryptoWealth
                  </Heading>
                  <Spacer />
                  {navigationLink("Advisor", "/advisor")}
                  {navigationLink("Portfolio", "/portfolio")}
                  {navigationLink("About", "/about")}
                </Flex>

                <Switch>
                  <Redirect exact from="/" to="/advisor" />

                  <Route exact path="/advisor">
                    <Advisor />
                  </Route>

                  <Route exact path="/portfolio">
                    <Heading> NOT IMPLEMENTED</Heading>
                  </Route>

                  <Route exact path="/about">
                    <Heading> NOT IMPLEMENTED</Heading>
                  </Route>
                </Switch>
              </Router>
            </Box>
          </ChakraProvider>
        </CacheContext.Provider>
      </StatisticalContext.Provider>
    </TextContext.Provider>
  );
}

export default App;
