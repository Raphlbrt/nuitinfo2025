// ==============================
// Données des questions (exemple)
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
    }
];

let currentQuestionIndex = 0;
let degradationLevel = 0;
const maxDegradationLevel = 3;

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
        currentQuestionIndex++;

        if (currentQuestionIndex >= questions.length) {
            showEndScreen();
        } else {
            feedbackEl.textContent = "";
            loadQuestion();
        }
    }, 900);
}

function showEndScreen() {
    endScreenEl.classList.remove("hidden");

    // Message différent si beaucoup d’erreurs
    if (degradationLevel === 0) {
        document.getElementById("end-message").textContent =
            "Tu as réussi à garder un système en bonne santé. NIRD vise justement à maintenir un numérique fluide, durable et accessible.";
    } else if (degradationLevel === maxDegradationLevel) {
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
    }
    applyDegradation();
}

function applyDegradation() {
    document.body.className = `deg-${degradationLevel}`;
    updateHealthUI();
    updateDegradationExplanation();
}

// Mise à jour barre de santé
function updateHealthUI() {
    const percent = Math.max(0, 100 - degradationLevel * 30);
    healthBarEl.style.width = percent + "%";

    if (degradationLevel === 0) {
        healthBarEl.style.background = "linear-gradient(to right, #22c55e, #84cc16)";
        healthTextEl.textContent = "Santé du système : 100% – expérience fluide.";
    } else if (degradationLevel === 1) {
        healthBarEl.style.background = "linear-gradient(to right, #eab308, #f97316)";
        healthTextEl.textContent = "Santé du système : 70% – des bugs commencent à apparaître.";
    } else if (degradationLevel === 2) {
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
    } else if (degradationLevel === 2) {
        degExplanationEl.textContent =
            "L’expérience devient frustrante : pour beaucoup de familles, c’est le quotidien avec un matériel vieillissant.";
    } else {
        degExplanationEl.textContent =
            "À ce stade, certains abandonnent complètement le numérique. NIRD veut éviter d’en arriver là, via le réemploi et le libre.";
    }
}

// ==============================
// Écouteurs
// ==============================
segments.forEach((btn) => {
    btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        handleAnswerClick(idx);
    });
});

restartBtn.addEventListener("click", () => {
    initQuiz();
});

// Lancer au chargement
window.addEventListener("DOMContentLoaded", initQuiz);
