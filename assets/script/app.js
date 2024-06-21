require("dotenv").config();
const token = process.env.GITHUB_TOKEN;
const headers = { Authorization: `token ${token}` };

document.addEventListener("DOMContentLoaded", function () {
  const repositorios = document.querySelector(".card-container");
  const colegasTrabalho = document.querySelector(".colegastrabalho");
  const perfilImg = document.querySelector(".imgprofile");
  const perfilName = document.getElementById("profile-name");
  const perfilBio = document.getElementById("profile-bio");
  const perfilLocation = document.getElementById("profile-location");

  function getApiGitHub() {
    //Puxar dados do perfil do GitHub
    fetch("https://api.github.com/users/ryanmoreir4", { headers })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        let userData = await res.json();
        perfilImg.src = userData.avatar_url;
        perfilImg.alt = `${userData.name} Profile Picture`;
        perfilName.textContent = userData.name;
        perfilBio.textContent = userData.bio;
        perfilLocation.innerHTML = `<b>Location:</b> ${userData.location}`;
      })
      .catch((error) => {
        console.error("Erro ao buscar informações do usuário:", error);
      });

    //Puxar repositórios
    fetch("https://api.github.com/users/ryanmoreir4/repos", { headers })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        let data = await res.json();
        data.forEach((item) => {
          let project = document.createElement("div");
          project.classList.add("card-content");
          project.addEventListener("click", () => {
            window.location.href = `repo.html?id=${item.id}`;
          });

          project.innerHTML = `
          <p class="title-card">
            <a style="color: black" ">
              <b>${item.name}</b>
            </a>
          </p>
          <p>${item.description || "Descrição não disponível."}</p>
          <div class="icon-card-repo">
            <img src="/assets/img/grande-estrela-favorita.png" alt="Star Icon" />
            <p>${item.stargazers_count}</p>
            <img src="/assets/img/fork-github.png" alt="Fork Icon" />
            <p>${item.forks_count}</p>
          </div>`;
          repositorios.appendChild(project);
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar informações:", error);
      });

    //Puxar colegas de trabalho
    fetch("https://api.github.com/users/ryanmoreir4/following", { headers })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        let collabsData = await res.json();
        colegasTrabalho.innerHTML = "<h2>Colegas de Trabalho</h2>";
        collabsData.forEach((collab) => {
          let colega = document.createElement("figure");
          colega.classList.add("perfil-colega");

          colega.innerHTML = `
            <a style="color: black" href="https://github.com/${collab.login}">
            <img src="${collab.avatar_url}" alt="${collab.login}" />
            <figcaption>${collab.login}</figcaption></a
            >`;
          colegasTrabalho.appendChild(colega);
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar colaboradores do repositório:", error);
      });
  }

  getApiGitHub();
});
