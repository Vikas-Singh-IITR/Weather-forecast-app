const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message_1 = document.getElementById("message-1");
const message_2 = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  const url = `/weather?address=${location}`;

  message_1.textContent = "Loading...";
  message_2.textContent = "";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.log(data.error);
        message_1.textContent = data.error;
        message_2.textContent = "";
      } else {
        console.log(data.location);
        console.log(data.forecast);
        message_1.textContent = data.location;
        message_2.textContent = data.forecast;
      }
    });
});
