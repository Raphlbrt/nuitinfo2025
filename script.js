// ==============================
// Données des questions
// ==============================
const questions = [
    {
        text: "Que signifie NIRD ?",
        answers: [
            "Numérique Inclusif, Responsable et Durable",
            "Nouvelle Infrastructure de Réseaux Décentralisés",
            "Noyau d’Innovation pour la Recherche Digitale",
            "Norme Internationale des Ressources Digitales"
        ],
        correctIndex: 0
    },
    {
        text: "Quel est un objectif fort de NIRD ?",
        answers: [
            "Augmenter le nombre de smartphones par élève",
            "Réduire la fracture numérique et favoriser le réemploi",
            "Promouvoir les abonnements aux plateformes privées",
            "Obliger le renouvellement régulier du matériel"
        ],
        correctIndex: 1
    },
    {
        text: "Quel levier NIRD utilise-t-il souvent ?",
        answers: [
            "Reconditionnement d’ordinateurs et logiciels libres",
            "Publicité ciblée et collecte massive de données",
            "Vente forcée de matériel propriétaire",
            "Abandon du numérique dans les établissements"
        ],
        correctIndex: 0
    },
    {
        text: "Pourquoi le reconditionnement de matériel est-il central pour NIRD ?",
        answers: [
            "Pour vendre plus vite de nouveaux appareils",
            "Pour prolonger la durée de vie des équipements existants",
            "Pour bloquer l’accès aux outils numériques",
            "Pour rendre le matériel volontairement plus lent"
        ],
        correctIndex: 1
    },
    {
        text: "Quel type de logiciels est privilégié dans la démarche NIRD ?",
        answers: [
            "Logiciels propriétaires uniquement",
            "Applications payantes sous abonnement",
            "Logiciels libres et open source",
            "Jeux vidéo en ligne"
        ],
        correctIndex: 2
    },
    {
        text: "Quel problème environnemental NIRD contribue à réduire ?",
        answers: [
            "La consommation d’eau potable",
            "Les déchets électroniques et l’obsolescence prématurée",
            "Le bruit dans les salles de classe",
            "La quantité de papier utilisée pour les manuels"
        ],
        correctIndex: 1
    },
    {
        text: "Qui peut bénéficier en priorité d’un numérique plus inclusif et responsable ?",
        answers: [
            "Uniquement les entreprises privées",
            "Les personnes déjà très équipées",
            "Les élèves et les familles en difficulté d’accès au numérique",
            "Uniquement les développeurs professionnels"
        ],
        correctIndex: 2
    },
    {
        text: "Quel type d’action illustre le mieux la démarche NIRD ?",
        answers: [
            "Collecter et reconditionner des ordinateurs pour les redistribuer",
            "Forcer les élèves à acheter le dernier modèle d’ordinateur",
            "Limiter l’usage des ordinateurs à une seule salle",
            "Remplacer tous les ordinateurs chaque année"
        ],
        correctIndex: 0
    },
    {
        text: "En termes de souveraineté numérique, que permet la démarche NIRD ?",
        answers: [
            "Dépendre davantage des grandes plateformes privées",
            "Perdre le contrôle sur les données des usagers",
            "Être plus autonome grâce aux logiciels libres",
            "Supprimer tous les services en ligne"
        ],
        correctIndex: 2
    },
    {
        text: "Comment les élèves peuvent-ils être impliqués concrètement dans NIRD ?",
        answers: [
            "En participant au reconditionnement et à l’installation des machines",
            "En jetant les anciens ordinateurs à la déchetterie",
            "En désactivant tous les ordinateurs du lycée",
            "En utilisant uniquement leur smartphone personnel"
        ],
        correctIndex: 0
    }
];

let currentQuestionIndex = 0;
let degradationLevel = 0;
const maxDegradationLevel = 9;

// ==============================
// Sélecteurs
// ==============================
const questionNumberEl = document.getElementById("question-number");
const questionTextEl = document.getElementById("question-text");
const feedbackEl = document.getElementById("feedback");
const segments = document.querySelectorAll(".segment");
const healthBarEl = document.getElementById("health-bar");
const healthTextEl = document.getElementById("health-text");
const degExplanationEl = document.getElementById("deg-explanation");
const endScreenEl = document.getElementById("end-screen");
const restartBtn = document.getElementById("restart-btn");

// ==============================
// Initialisation
// ==============================
function initQuiz() {
    currentQuestionIndex = 0;
    degradationLevel = 0;
    document.body.className = "deg-0";

    endScreenEl.classList.add("hidden");
    feedbackEl.textContent = "";
    loadQuestion();
    updateHealthUI();
    updateDegradationExplanation();
    handleFakeCursor(); // au cas où on relance depuis deg-8/9
}

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    questionNumberEl.textContent = `Question ${currentQuestionIndex + 1}`;
    questionTextEl.textContent = q.text;

    segments.forEach((btn, idx) => {
        btn.textContent = q.answers[idx] || "---";
    });
}

// ==============================
// Gestion des réponses
// ==============================
function handleAnswerClick(selectedIndex) {
    const q = questions[currentQuestionIndex];

    if (selectedIndex === q.correctIndex) {
        feedbackEl.textContent = "Bonne réponse ! Tu prolonges la vie de ce système.";
        feedbackEl.style.color = "#22c55e";

        moveToNextQuestion();
    } else {
        feedbackEl.textContent = "Mauvaise réponse… l’expérience se dégrade.";
        feedbackEl.style.color = "#f97316";

        increaseDegradation();
        moveToNextQuestion();
    }
}

function moveToNextQuestion() {
    // Petite pause pour laisser voir le feedback
    setTimeout(() => {
        // On boucle sur les questions au lieu d'arrêter le jeu
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;

        // Si on est déjà en niveau max, on ne continue pas le quiz
        if (degradationLevel >= maxDegradationLevel) {
            showEndScreen();
            return;
        }

        feedbackEl.textContent = "";
        loadQuestion();
    }, 900);
}

function showEndScreen() {
    endScreenEl.classList.remove("hidden");

    // Message différent selon le niveau de dégradation atteint
    if (degradationLevel === 0) {
        document.getElementById("end-message").textContent =
            "Tu as réussi à garder un système en bonne santé. NIRD vise justement à maintenir un numérique fluide, durable et accessible.";
    } else if (degradationLevel >= maxDegradationLevel) {
        document.getElementById("end-message").textContent =
            "Tu as vécu l’obsolescence jusqu’au bout : expérience difficile, frustrante. NIRD propose une autre voie : reconditionner, utiliser du libre, réduire la fracture numérique.";
    } else {
        document.getElementById("end-message").textContent =
            "Tu as ressenti comment quelques mauvaises décisions peuvent dégrader l'expérience. NIRD agit pour limiter cette dégradation et rendre le numérique plus responsable.";
    }
}

// ==============================
// Dégradation
// ==============================
function increaseDegradation() {
    if (degradationLevel < maxDegradationLevel) {
        degradationLevel++;
        applyDegradation();

        // Si on vient d'atteindre le niveau 9 → site inutilisable
        if (degradationLevel >= maxDegradationLevel) {
            showEndScreen();
        }
    }
}

function applyDegradation() {
    document.body.className = `deg-${degradationLevel}`;
    updateHealthUI();
    updateDegradationExplanation();
    applyAccentDegradation();
    handleFakeCursor();
}

// --- Accents -> @ (niveau 3+)

function replaceAccentsWithAt(str) {
    if (!str) return "";
    const map = {
        "é":"@", "è":"@", "ê":"@", "ë":"@",
        "à":"@", "â":"@", "ä":"@",
        "ù":"@", "û":"@", "ü":"@",
        "î":"@", "ï":"@", "ô":"@", "ö":"@",
        "ç":"@",
        "É":"@", "È":"@", "Ê":"@", "Ë":"@",
        "À":"@", "Â":"@", "Ä":"@",
        "Ù":"@", "Û":"@", "Ü":"@",
        "Î":"@", "Ï":"@", "Ô":"@", "Ö":"@", "Ç":"@"
    };
    return str.replace(/[\u00C0-\u017F]/g, ch => map[ch] || ch);
}

function applyAccentDegradation() {
    if (degradationLevel < 3) return;

    // Question
    questionTextEl.textContent = replaceAccentsWithAt(questionTextEl.textContent);

    // Réponses
    segments.forEach(btn => {
        btn.textContent = replaceAccentsWithAt(btn.textContent);
    });
}

// --- Inversion des clics (niveau 4 à 6)

function getEffectiveIndex(selectedIndex) {
    // Niveau 4 à 6 : inverser haut/bas et gauche/droite
    if (degradationLevel >= 4 && degradationLevel <= 6) {
        const map = [2, 3, 0, 1];
        // 0 (haut) -> 2 (bas)
        // 1 (droite) -> 3 (gauche)
        // 2 (bas) -> 0 (haut)
        // 3 (gauche) -> 1 (droite)
        return map[selectedIndex] ?? selectedIndex;
    }
    return selectedIndex;
}

// --- Faux curseur (niveau 8+)

let fakeCursor = null;
let mouseInvertedEnabled = false;

function createFakeCursor() {
    if (fakeCursor) return;
    fakeCursor = document.createElement("div");
    fakeCursor.id = "fake-cursor";
    document.body.appendChild(fakeCursor);
}

function onMouseMoveInverted(e) {
    if (!fakeCursor) return;
    const invX = window.innerWidth - e.clientX;
    const invY = window.innerHeight - e.clientY;

    fakeCursor.style.transform = `translate(${invX}px, ${invY}px)`;
}

function handleFakeCursor() {
    if (degradationLevel >= 8) {
        if (!mouseInvertedEnabled) {
            createFakeCursor();
            fakeCursor.style.display = "block";
            window.addEventListener("mousemove", onMouseMoveInverted);
            mouseInvertedEnabled = true;
        }
    } else {
        if (mouseInvertedEnabled) {
            window.removeEventListener("mousemove", onMouseMoveInverted);
            if (fakeCursor) fakeCursor.style.display = "none";
            mouseInvertedEnabled = false;
        }
    }
}

// Mise à jour barre de santé
function updateHealthUI() {
    // Pour 9 niveaux, on approxime la santé
    const percent = Math.max(0, 100 - degradationLevel * (100 / maxDegradationLevel));
    healthBarEl.style.width = percent + "%";

    if (degradationLevel === 0) {
        healthBarEl.style.background = "linear-gradient(to right, #22c55e, #84cc16)";
        healthTextEl.textContent = "Santé du système : 100% – expérience fluide.";
    } else if (degradationLevel <= 2) {
        healthBarEl.style.background = "linear-gradient(to right, #eab308, #f97316)";
        healthTextEl.textContent = "Santé du système : 70% – des bugs commencent à apparaître.";
    } else if (degradationLevel <= 5) {
        healthBarEl.style.background = "linear-gradient(to right, #f97316, #ef4444)";
        healthTextEl.textContent = "Santé du système : 40% – l’usage devient pénible.";
    } else {
        healthBarEl.style.background = "linear-gradient(to right, #7f1d1d, #450a0a)";
        healthTextEl.textContent = "Santé du système : 10% – l’interface frôle l’inutilisable.";
    }
}

// Texte pédagogique
function updateDegradationExplanation() {
    if (degradationLevel === 0) {
        degExplanationEl.textContent =
            "Pour l’instant, tout est propre : comme un équipement bien entretenu, mis à jour et accessible à tous.";
    } else if (degradationLevel === 1) {
        degExplanationEl.textContent =
            "Les premiers signes d’usure apparaissent : une partie du public commence déjà à décrocher.";
    } else if (degradationLevel <= 4) {
        degExplanationEl.textContent =
            "L’expérience devient frustrante : pour beaucoup de familles, c’est le quotidien avec un matériel vieillissant.";
    } else if (degradationLevel <= 7) {
        degExplanationEl.textContent =
            "La dégradation est forte : l’interface est confuse, lente, épuisante. Beaucoup abandonnent à ce stade.";
    } else {
        degExplanationEl.textContent =
            "Le système est quasiment inutilisable. NIRD veut éviter que le numérique en arrive là, grâce au réemploi et au libre.";
    }
}

// ==============================
// Écouteurs
// ==============================
segments.forEach((btn) => {
    btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        const effectiveIndex = getEffectiveIndex(idx);
        handleAnswerClick(effectiveIndex);
    });
});

restartBtn.addEventListener("click", () => {
    initQuiz();
});

// Lancer au chargement
window.addEventListener("DOMContentLoaded", initQuiz);
