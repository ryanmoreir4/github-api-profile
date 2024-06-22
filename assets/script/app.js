const token = `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`;
const headers = { Authorization: `token ${token}` };

document.addEventListener("DOMContentLoaded", function () {
  const repositorios = document.querySelector(".card-container");
  const colegasTrabalho = document.querySelector(".colegastrabalho");
  const perfilImg = document.querySelector(".imgprofile");
  const perfilNome = document.getElementById("profile-name");
  const perfilBio = document.getElementById("profile-bio");
  const perfilLocation = document.getElementById("profile-location");
  const quantRepositorios = document.getElementById("quant-repo");

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
        perfilNome.textContent = userData.name;
        perfilBio.textContent = userData.bio;
        perfilLocation.innerHTML = `<b>Location:</b> ${userData.location}`;
        quantRepositorios.textContent = `Repositórios (${userData.public_repos})`;
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
              <b style="color: black" id="title-text-card">${item.name}</b>
          </p>
          <p id="text-card">${
            item.description || "Descrição não disponível."
          }</p>
          <div class="icon-card-repo">
            <img src="/assets/img/grande-estrela-favorita.png" alt="Star Icon" />
            <p style="color: black">${item.stargazers_count}</p>
            <img src="/assets/img/fork-github.png" alt="Fork Icon" />
            <p style="color: black">${item.forks_count}</p>
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

        document.addEventListener("DOMContentLoaded", function () {
          fetch("http://localhost:3000/conteudosSugeridos")
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  "Network response was not ok " + response.statusText
                );
              }
              return response.json();
            })
            .then((data) => {
              console.log("Data received:", data); // Log the data received
              const carouselInner = document.querySelector(".carousel-inner");
              const carouselIndicators = document.querySelector(
                ".carousel-indicators"
              );

              data.forEach((item, index) => {
                console.log("Processing item:", item); // Log each item being processed
                // Create carousel item
                const carouselItem = document.createElement("div");
                carouselItem.classList.add("carousel-item");
                if (index === 0) {
                  carouselItem.classList.add("active");
                }

                const img = document.createElement("img");
                img.src = item.imagem;
                img.classList.add("d-block", "w-100");
                img.alt = item.titulo;

                const caption = document.createElement("div");
                caption.classList.add(
                  "carousel-caption",
                  "d-none",
                  "d-md-block"
                );

                const title = document.createElement("h5");
                title.textContent = item.titulo;

                const description = document.createElement("p");
                description.textContent = item.descricao;

                caption.appendChild(title);
                caption.appendChild(description);
                carouselItem.appendChild(img);
                carouselItem.appendChild(caption);
                carouselInner.appendChild(carouselItem);

                // Create carousel indicator
                const indicator = document.createElement("button");
                indicator.type = "button";
                indicator.setAttribute(
                  "data-bs-target",
                  "#carouselExampleCaptions"
                );
                indicator.setAttribute("data-bs-slide-to", index);
                indicator.setAttribute("aria-label", `Slide ${index + 1}`);
                if (index === 0) {
                  indicator.classList.add("active");
                  indicator.setAttribute("aria-current", "true");
                }

                carouselIndicators.appendChild(indicator);
              });
            })
            .catch((error) => console.error("Erro ao buscar os dados:", error));
        });
      });
  }
  getApiGitHub();
});
