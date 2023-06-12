const token = "2aiE8Fe3dEz8HsvukV0Uac2QK4zQVfYL57BsOxQyfWFIWFTYhg7jWYX4qg9k";


const urlShortened = document.querySelector(".url-shortened");
const btnCopy = document.querySelector("#copyUrl");
const containerRes = document.querySelector(".container");
const formUrl = document.querySelector("#formUrl");

const fetchShortenerUrl = async (e) => {
  e.preventDefault();
  const inputUrlValue = document.querySelector("#url");

  let regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  if (!inputUrlValue.value.trim()) {
    alert("O campo não pode ser enviado vazio!");
    inputUrlValue.value = "";
    return;
  }
  if (!regex.test(inputUrlValue.value)) {
    alert("A url é invalida! :(");
    inputUrlValue.value = "";
    return;
  }
  const bodyFetch = {
    url: inputUrlValue.value,
  };

  const response = await fetch("https://api.tinyurl.com/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token} `,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyFetch),
  });

  const resJson = await response.json();

  const data = await resJson;

  if (data) {
    showResponse();
    urlShortened.textContent = data.data.tiny_url;
    return;
  }

  inputUrlValue.value = "";
};



const copy = () => {
  if (urlShortened) {
    navigator.clipboard.writeText(urlShortened.textContent);
    alert("Copiado");
    return;
  }
  alert("Não tem texto para copiar");
};

const showResponse = () => {
  containerRes.classList.remove("hide");
  containerRes.classList.add("show");
};

formUrl.addEventListener("submit", fetchShortenerUrl);
btnCopy.addEventListener("click", copy);
