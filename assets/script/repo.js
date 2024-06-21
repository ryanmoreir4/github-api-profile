const token = ``;
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
        repoLanguage.textContent =
          repoData.languages_url || "Linguagem não disponível.";
        repoLink.innerHTML = `<a href="https://github.com/${repoData.login}/${repoData.name}" target="_blank">${data.html_url}</a>`;
      })
      .catch((error) => {
        console.error("Erro ao buscar informações do repositório:", error);
      });
  } else {
    console.error("ID do repositório não encontrado na URL");
  }
});
