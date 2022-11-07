import { createContext, useContext, useMemo, useState } from "react";

const CarInfoValueContext = createContext(null);
const CarInfoActionContext = createContext(null);

const useCarInfo = () => {
  const value = useContext(CarInfoValueContext);
  if (value === null) {
    throw new Error("useCarInfo should be used within TodosProvider");
  }
  return value;
};

const useCarInfoActions = () => {
  const value = useContext(CarInfoActionContext);
  if (value === null) {
    throw new Error("useCarInfoActions should be used within TodosProvider");
  }
  return value;
};

const CarInfoProvider = ({ children, carAPI }) => {
  const [carInfo, setCarInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const actions = useMemo(
    () => ({
      async getAllCar() {
        setIsLoading(true);
        const {
          data: { payload },
        } = await carAPI.getAllCar();
        setIsLoading(false);
        setCarInfo(payload);
      },
      async setAllCar(fetchData) {
        setIsLoading(true);
        const {
          data: { payload },
        } = await fetchData();
        setIsLoading(false);
        setCarInfo(payload);
      },
    }),
    [carAPI],
  );

  return (
    <CarInfoValueContext.Provider value={{ carInfo, isLoading }}>
      <CarInfoActionContext.Provider value={actions}>{children}</CarInfoActionContext.Provider>
    </CarInfoValueContext.Provider>
  );
};

export { useCarInfo, useCarInfoActions, CarInfoProvider };
