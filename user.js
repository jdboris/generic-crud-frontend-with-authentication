const URL = "http://localhost:3000/";

export class User {
  constructor(id = null, username = null, password = null, roles = null) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.roles = roles;
  }

  static async authenticate() {
    return fetch(URL + "api/login.php", {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      return response.json();
    });
  }

  static async logout() {
    return fetch(URL + "api/login.php", {
      method: "DELETE",
      credentials: "include",
    }).then((response) => {
      return response.json();
    });
  }

  static async read() {
    return fetch(URL + "api/users.php", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.map((user) => {
          return new User(user.id, user.username, null, user.roles);
        });
      });
  }

  async save() {
    if (this.id !== null) {
      return fetch(URL + "api/users.php", {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(this),
      });
    } else {
      return fetch(URL + "api/users.php", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(this),
      });
    }
  }

  async delete() {
    return fetch(URL + "api/users.php", {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({ id: this.id }),
    });
  }

  async signup() {
    console.log(this);
    return fetch(URL + "api/signup.php", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(this),
    }).then((response) => {
      return response.json();
    });
  }

  async login() {
    return fetch(URL + "api/login.php", {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(this),
    }).then((response) => {
      return response.json();
    });
  }
}
