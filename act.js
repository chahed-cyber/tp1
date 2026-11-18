// 1. On récupère les éléments HTML
let inputRecherche = document.getElementById("recherche");
let selectCategorie = document.getElementById("categorie");
let cartes = document.getElementsByClassName("carte-item");
let compteur = document.getElementById("compteur");
let messageVide = document.getElementById("aucunResultat");

// 2. Fonction qui filtre les cartes
function filtrer() {
  let texte = inputRecherche.value.toLowerCase();
  let cat = selectCategorie.value;
  let nbVisibles = 0;

  // On parcourt les 8 cartes une par une
  for (let i = 0; i < cartes.length; i++) {
    let titreCarte = cartes[i].querySelector(".card-title").textContent.toLowerCase();
    let catCarte = cartes[i].getAttribute("data-categorie");

    // On vérifie si la catégorie et le texte correspondent
    let memeCategorie = (cat === "Toutes") || (cat === catCarte);
    let memeTexte = titreCarte.includes(texte);

    if (memeCategorie && memeTexte) {
      cartes[i].style.display = "block"; // Afficher la carte
      nbVisibles++;
    } else {
      cartes[i].style.display = "none";  // Cacher la carte
    }
  }

  // Mise à jour du compteur
  compteur.textContent = nbVisibles + " activité(s) trouvée(s)";

  // Afficher ou cacher le message "Aucune activité trouvée"
  if (nbVisibles === 0) {
    messageVide.classList.remove("d-none");
  } else {
    messageVide.classList.add("d-none");
  }
}

// 3. Fonction pour afficher les détails dans la modal
function voirDetails(titre, infos, description) {
  document.getElementById("titreModal").textContent = titre;
  document.getElementById("infosModal").textContent = infos;
  document.getElementById("descModal").textContent = description;

  let modal = new bootstrap.Modal(document.getElementById("maModal"));
  modal.show();
}

// 4. Événements quand l'utilisateur écrit ou change la catégorie
inputRecherche.addEventListener("input", filtrer);
selectCategorie.addEventListener("change", filtrer);