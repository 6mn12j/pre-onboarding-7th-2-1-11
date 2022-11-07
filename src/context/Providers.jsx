import { CarAPI } from "../api/CarAPI";
import { CarInfoProvider } from "./CarProvider";
import { ColorProvider } from "./ColorProvider";

const BASE_URL = "https://preonboarding.platdev.net/api";

export const carAPI = new CarAPI(BASE_URL);

const Providers = ({ children }) => {
  return (
    <ColorProvider>
      <CarInfoProvider carAPI={carAPI}>{children}</CarInfoProvider>
    </ColorProvider>
  );
};

export default Providers;
