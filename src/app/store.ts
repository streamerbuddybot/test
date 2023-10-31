// store.ts
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
// import userReducer from "@/features/user/userSlice";
import commandReducer from "../redux/commands/CommandSlice";
// import notificationsReducer from "@/features/notifications/notificationsSlice";
// import integrationsReducer from "@/features/integration/integrationSlice";
import { useDispatch } from "react-redux";


const store = configureStore({
  reducer: {
    auth: authReducer,
    // user: userReducer,
    // integrations: integrationsReducer,
    commands: commandReducer,
    // notificationsReducer
  },
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
