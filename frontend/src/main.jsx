import { createRoot } from 'react-dom/client'
import '../src/app/index.css'     
import App from './app/App.jsx'
import {store} from '../src/app/app.store.js'
import {Provider} from 'react-redux';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <App/>
    </Provider>
)
