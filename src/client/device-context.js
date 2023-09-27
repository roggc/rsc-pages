import { createContext, useContext } from "react";

const deviceContext = createContext();

export const useDeviceContext = () => useContext(deviceContext);
export default deviceContext.Provider;
