import { E, newInput } from "./utils.js";

export const Mode = {
  SIGNUP: "Signup",
  LOGIN: "Login",
};

export function newUserForm(mode, user) {
  let form = E(`<form></form>`);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  render(mode);

  function render(mode, message = null, errors = []) {
    form.innerHTML = "";

    let switchButton = E(
      `<button type="button">${
        mode == Mode.LOGIN ? "Create Account" : "Login Instead"
      }</button>`
    );

    switchButton.onclick = () => {
      render(mode == Mode.LOGIN ? Mode.SIGNUP : Mode.LOGIN);
    };

    form.append(
      ...errors.map((error) => E(`<div class="error">${error}</div>`)),
      message ? E(`<div class="success">${message}</div>`) : "",
      newInput(`<input type="text" name="username" />`, user),
      newInput(`<input type="password" name="password" />`, user),
      E(`<button>${mode}</button`),
      switchButton
    );

    form.onsubmit = () => {
      if (mode == Mode.LOGIN) {
        user.login().then((response) => {
          if (response.errors.length) {
            render(Mode.LOGIN, null, response.errors);
          } else {
            render(Mode.LOGIN, "Login successful!");

            let event = new CustomEvent("loginsuccess", {
              detail: response,
            });
            form.dispatchEvent(event);
          }
        });
      } else if (mode == Mode.SIGNUP) {
        user.signup().then((response) => {
          if (response.errors.length) {
            render(Mode.SIGNUP, null, response.errors);
          } else {
            render(Mode.SIGNUP, "Signup successful!");

            let event = new CustomEvent("loginsuccess", {
              detail: response,
            });
            form.dispatchEvent(event);
          }
        });
      }
    };
  }

  return form;
}
