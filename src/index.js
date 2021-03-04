import { HeaderComponent} from './modules/header/components/header/header.component';
import style from '../main.css';

const initApp = () => {
    const APP_MAIN_CONTAINERS = {
        HEADER: document.querySelector('#header'),
        SIDE_NAV: document.querySelector('#sideNav'),
        MAIN_CONTENT: document.querySelector('#mainContent'),
        FOOTER: document.querySelector('#footer')
    }
    setStyle();
    const header = new HeaderComponent(APP_MAIN_CONTAINERS.HEADER);
}

const setStyle = () => {
    const customStyle = document.createElement('style');
    customStyle.innerHTML = style;
    document.head.appendChild(customStyle);
}


initApp();
