import { HeaderComponent} from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { MainComponent } from './modules/main/main.component';
import style from '../main.css';

const initApp = () => {
    
    const APP_MAIN_CONTAINERS = {
        HEADER: document.querySelector('#header'),
        MAIN: document.querySelector('#main'),
        FOOTER: document.querySelector('#footer')
    }
    setStyle();
    const header = new HeaderComponent({container:APP_MAIN_CONTAINERS.HEADER});
    const footer = new FooterComponent({container:APP_MAIN_CONTAINERS.FOOTER});
    const main = new MainComponent({container:APP_MAIN_CONTAINERS.MAIN});
}

const setStyle = () => {
    const customStyle = document.createElement('style');
    customStyle.innerHTML = style;
    document.head.appendChild(customStyle);
}


initApp();
