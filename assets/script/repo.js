const token = `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`;
const headers = { Authorization: `token ${token}` };

document.addEventListener("DOMContentLoaded", function () {
  const repoName = document.querySelector(".repo-name");
  const repoDescription = document.querySelector(".repo-description");
  const repoDate = document.querySelector(".repo-date");
  const repoLanguage = document.querySelector(".repo-language");
  const repoLink = document.querySelector(".repo-link");

  // Função para pegar os parâmetros da URL
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      id: params.get("id"),
    };
  }

  // Pega o ID do repositório da URL
  const { id } = getQueryParams();

  if (id) {
    // Busca as informações do repositório pelo ID
    fetch(`https://api.github.com/repositories/${id}`, { headers })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        let repoData = await res.json();
        repoName.textContent = `Repositório: ${repoData.name}`;
        repoDescription.textContent =
          repoData.description || "Descrição não disponível.";
        repoDate.textContent = new Date(repoData.created_at).toLocaleDateString(
          "pt-BR"
        );
        repoLink.innerHTML =
          `<a style="color: blue; text-decoration: underline" href="${repoData.html_url}" target="_blank">GitHub</a>` ||
          "Link de acesso não disponível";

        // Busca as linguagens do repositório
        fetch(repoData.languages_url, { headers })
          .then(async (res) => {
            if (!res.ok) {
              throw new Error(res.status);
            }
            let languagesData = await res.json();
            let languages =
              Object.keys(languagesData).join(", ") ||
              "Linguagens não disponíveis";
            repoLanguage.textContent = languages;
          })
          .catch((error) => {
            console.error("Erro ao buscar linguagens do repositório:", error);
            repoLanguage.textContent = "Erro ao buscar linguagens.";
          });
      })
      .catch((error) => {
        console.error("Erro ao buscar informações do repositório:", error);
      });
  } else {
    console.error("ID do repositório não encontrado na URL");
  }
});
