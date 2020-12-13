import html from "./index.html";
import "../../style.css";
import {renderTemplate} from "../../template-utils";

class Footer {
    constructor() {
        this.footer = renderTemplate(html)
    }

    render() {
        return this.footer;
    }
}

export default Footer;
