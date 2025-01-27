import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";
import store from "./Store";
import App from "./App";

createRoot(document.getElementById('root')!).render(
    // Оборачиваем приложение в Provider для доступа к Redux store
    <Provider store={store}>
        <App/>
    </Provider>
);