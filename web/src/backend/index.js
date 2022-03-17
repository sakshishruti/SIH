import users from "./db.json";

const SignInUser = async (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const regex = new RegExp(/^MP-\b\d{5}\b/);
      if (regex.test(user.username)) {
        const userFound = users.find((u) => u.username === user.username);
        if (!userFound) {
          reject("Invalid username or password");
        } else if (userFound.password !== user.password) {
          reject("Invalid username or password");
        } else {
          resolve(userFound);
        }
      } else reject("Invalid username or password");
    }, 2000);
  });
};

const numbers = ["29A 331 85", "30A 612 35", "29A 901 01", "30A 613 29", "30V 4495", "30A 614 58"];

const getNumberPlates = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(numbers);
    }, 2000);
  });
};

export { SignInUser, getNumberPlates };
