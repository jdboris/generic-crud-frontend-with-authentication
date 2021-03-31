import { E } from "./utils.js";
import { newUserForm, Mode as UserFormMode } from "./user-form.js";
import { User } from "./user.js";

export function newApp(user) {
  let app = E(`<div></div>`);

  render();

  function render() {
    app.innerHTML = "";

    if (!user) {
      user = new User();
      let form = newUserForm(UserFormMode.LOGIN, user);

      form.addEventListener("loginsuccess", (event) => {
        console.log(user);
        user = event.detail.user;
        console.log(user);
        render();
      });

      app.append(form);
    } else {
      let logoutButton = E(`<button type="button">Logout</button>`);
      logoutButton.onclick = () => {
        User.logout().then(() => {
          user = null;
          render();
        });
      };

      app.append(logoutButton, `Welcome, ${user.username}!`);
    }
  }

  return app;
}
