const form = document.getElementById("signup");

form.addEventListener("submit", (event) => {
  // stop form submission
  event.preventDefault();

  // Extract Form data
  const formInfo = new FormData(event.target);
  const data = Object.fromEntries(formInfo.entries());

  // Call end point
  fetch("/api/update-account", {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        return response.json().then((err) => {
          console.log(err);
          // Sweet Alert Modal
          swal("Error", err.message || "Something went wrong" , "error");
          throw new Error(err);
        });
      }
    })
    .then(function (jsonResponse) {
      console.log(jsonResponse.message);
       // Sweet Alert Modal
      swal("Successful", jsonResponse.message, "success")
      .then(() => {
       window.location.reload();
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});
