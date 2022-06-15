export const updatePrimaryColor = (data) => {
  console.log("---------------Color payload", data);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var changeColorQL = JSON.stringify({
    query:
      "mutation($email:String!,$name:String!,$primaryColor:String!) {\r\n          changeColor(user:{name:$name,email:$email,primaryColor:$primaryColor}){\r\n              name\r\n              email\r\n              primaryColor\r\n          }\r\n        }",
    variables: {
      email: data.payload.email,
      primaryColor: data.payload.primaryColor,
      name: data.payload.name,
    },
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: changeColorQL,
    redirect: "follow",
  };
  return fetch("/graphql", requestOptions)
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => error);
};

export const getUserByEmail = (data) => {
  console.log("-----------payload", data);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let email = data.payload;

  var getUserByEmailQL = JSON.stringify({
    query:
      "query($email:String!) {\r\n          getUserByEmail(email:$email){\r\n              name\r\n              email\r\n              primaryColor\r\n          }\r\n        }",
    variables: { email: email },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: getUserByEmailQL,
    redirect: "follow",
  };

  return fetch("/graphql", requestOptions)
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => error);
};
