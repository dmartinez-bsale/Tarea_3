import App from "./App.svelte";
import { MDCTextField } from "@material/textfield";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCList } from "@material/list";
import { MDCRipple } from "@material/ripple";
import { MDCRadio } from "@material/radio";
import { MDCCheckbox } from "@material/checkbox";

const app = new App({
    target: document.body,
    props: {
        name: "World",
    },
});
// * topbar
const topAppBarElement = [...document.querySelectorAll(".mdc-top-app-bar")].map(
    (el) => new MDCTopAppBar(el)
);
// * button
const button = [...document.querySelectorAll(".mdc-button")].map(
    (el) => new MDCRipple(el)
);

// * texfield
const textField = [...document.querySelectorAll(".mdc-text-field")].map(
    (el) => new MDCTextField(el)
);

// * mdc-list
const list = [...document.querySelectorAll(".mdc-list")].map(
    (el) => new MDCList(el)
);
// * riples
const listItemRipples = [...document.querySelectorAll(".mdc-list")].map(
    (listItemEl) => new MDCRipple(listItemEl)
);
listItemRipples.unbounded = true;
// * icon-button
const iconButtonRipple = new MDCRipple(
    document.querySelector(".mdc-icon-button")
);
iconButtonRipple.unbounded = true;

export default app;
