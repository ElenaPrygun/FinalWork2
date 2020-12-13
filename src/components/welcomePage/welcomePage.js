import html from "./index.html";
import "../../style.css";
import {renderTemplate} from "../../template-utils";

class WelcomeComponent {
    constructor() {
        this.welcomeComponent = renderTemplate(html)
    }

    render() {
        return this.welcomeComponent;
    }
}

export default WelcomeComponent;
