const anchors = document.querySelectorAll(".nav_link");
const projectsItem = document.querySelectorAll(".projects_item");
const projectDescAll = document.querySelectorAll(".project_desc");
const formBtn = document.querySelector(".form_btn");
const form = document.querySelector(".form");
const successSend = document.querySelector(".success_send");
const el_block = document.querySelectorAll("[data-block]");
const heroTitle = document.querySelector(".hero_title");
const logo = document.querySelector(".logo");
const hero = document.querySelector(".hero");
const btnModileMenu = document.querySelector(".btnModileMenu");
const screenModileMenu = document.querySelector(".screenModileMenu");
const navigation = document.querySelector(".navigation");

btnModileMenu.addEventListener("click", () => {
  navigation.classList.toggle("navigation_open");
  screenModileMenu.classList.toggle("screenModileMenu-open");
});
screenModileMenu.addEventListener("click", () => {
  navigation.classList.toggle("navigation_open");
  screenModileMenu.classList.toggle("screenModileMenu-open");
});
console.log();
for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute("href");

    document.querySelector(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

logo.addEventListener("click", () => {
  hero.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

for (let item of projectsItem) {
  const itemBtn = item.querySelector(".item_wrap-btn");
  const projectDesc = item.querySelector(".project_desc");
  const descClose = item.querySelector(".desc_close");

  itemBtn.addEventListener("click", () => {
    projectDesc.style.top = "0";
  });

  descClose.addEventListener("click", () => {
    projectDesc.style.top = "250px";
  });
}

document.addEventListener("click", (e) => {
  let a = e.target.className == "item_wrap-btn" || e.target.localName == "span";
  if (!a) {
    projectDescAll.forEach((el) => {
      el.style.top = "250px";
    });
  }
});

const formCleaner = () => {
  let inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
};

function send(event) {
  event.preventDefault();
  formBtn.classList.add("animation_btn");
  const text = document.getElementById("formText");
  const email = document.getElementById("formEmail");
  const tel = document.getElementById("formTel");

  const url = "https://yakovenko-aleksandr.ru/mailSend.php";
  const bodyForm = new FormData();
  bodyForm.append("text", text.value);
  bodyForm.append("email", email.value);
  bodyForm.append("tel", tel.value);

  // Опции запроса
  const options = {
    method: "POST",
    body: bodyForm,
  };

  // Отправка запроса с использованием fetch
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        formBtn.style.display = "none";
        successSend.style.display = "block";
        successSend.textContent = "ошибка...";
        formCleaner();
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      formBtn.style.display = "none";
      successSend.style.display = "block";
      formCleaner();
    })
    .catch((error) => {
      console.error(error);
      formBtn.style.display = "none";
      successSend.style.display = "block";
      successSend.textContent = "ошибка...";
      formCleaner();
    });
}

const activeItemNav = (nameLink) => {
  document.querySelectorAll("[data-activ]").forEach((el) => {
    el.classList.remove("active");
  });
  document.querySelector(`[data-activ='${nameLink}']`).classList.add("active");

  if (nameLink === "html" || nameLink === "js" || nameLink === "skills") {
    setTimeout(() => {
      if (document.querySelector(".no_block") !== null) {
        document.querySelector(".no_block").classList.remove("no_block");
      }
    }, 300);
  }
};

// Создаем новый observer (наблюдатель)
let observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    // Выводим в консоль сам элемент
    if (entry.isIntersecting) {
      activeItemNav(entry.target.dataset.block);
    }
  });
});
// Прикрепляем его к «наблюдателю»
el_block.forEach((el) => {
  observer.observe(el);
});

let resetObserve = new IntersectionObserver((entries) => {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      document.querySelectorAll("[data-activ]").forEach((el) => {
        el.classList.remove("active");
      });
    }
  });
});
resetObserve.observe(heroTitle);
