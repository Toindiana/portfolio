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

function send(event, php) {
  console.log("Отправка запроса");
  formBtn.classList.add("animation_btn");
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  var req = new XMLHttpRequest();
  req.open("POST", php, true);
  req.onload = function () {
    if (req.status >= 200 && req.status < 400) {
      // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
      if (JSON.parse(req.response).result == "success") {
        // Если сообщение отправлено
        // alert("Сообщение отправлено");
        formBtn.style.display = "none";
        successSend.style.display = "block";
        formCleaner();
      } else {
        // Если произошла ошибка
        // alert("Ошибка. Сообщение не отправлено");
        formBtn.style.display = "none";
        successSend.style.display = "block";
        successSend.textContent = "ошибка...";
        formCleaner();
      }
      // Если не удалось связаться с php файлом
    } else {
      formBtn.style.display = "none";
      successSend.style.display = "block";
      successSend.textContent = "ошибка...";
      formCleaner();
    }
  };

  // Если не удалось отправить запрос. Стоит блок на хостинге
  req.onerror = function () {
    //alert("Ошибка отправки запроса");
    formBtn.style.display = "none";
    successSend.style.display = "block";
    formCleaner();
  };
  req.send(new FormData(event.target));
}

const activeItemNav = (nameLink) => {
  document.querySelectorAll("[data-activ]").forEach((el) => {
    el.classList.remove("active");
  });
  document.querySelector(`[data-activ='${nameLink}']`).classList.add("active");

  if (nameLink === "html" || nameLink === "js") {
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
