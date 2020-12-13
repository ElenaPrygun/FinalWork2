import {createBrowserHistory} from "history";

const appHistory = createBrowserHistory();

export function getHistory() {
    return appHistory;
}