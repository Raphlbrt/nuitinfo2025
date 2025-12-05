// ==============================
// PAGE D'ACCUEIL
// ==============================
const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');

// Gérer le clic pour démarrer le quiz
if (startScreen) {
    startScreen.addEventListener('click', function() {
        // Animation de disparition
        startScreen.classList.add('fade-out');

        // Après l'animation, masquer la page d'accueil et afficher le quiz
        setTimeout(() => {
            startScreen.style.display = 'none';
            quizContainer.classList.remove('hidden');
            // Initialiser le quiz une fois affiché
            if (typeof initQuiz === 'function') {
                initQuiz();
            }
        }, 800);
    });
}

// ==============================
// Arbre de décisions - Questions
// ==============================
const questionTree = {
    "start": {
        text: "Que signifie NIRD ?",
        answers: [
            "Numérique Inclusif, Responsable et Durable",
            "Nouvelle Infrastructure de Réseaux Décentralisés",
            "Noyau d'Innovation pour la Recherche Digitale",
            "Norme Internationale des Ressources Digitales"
        ],
        correctIndex: 0,
        nextNodes: ["q1_objectif", "q2_infra_start", "q3_libre_start", "q4_normes_start"]
    },

    // ==========================================
    // BRANCHE 1 : Objectif NIRD (Bon parcours)
    // ==========================================
    "q1_objectif": {
        text: "Quel est l'objectif principal du numérique responsable ?",
        answers: [
            "Réduire l'impact environnemental et social",
            "Vendre plus d'appareils neufs",
            "Augmenter la consommation d'énergie",
            "Créer plus de déchets électroniques"
        ],
        correctIndex: 0,
        nextNodes: ["q1_reemploi", "q1_vente", "q1_energie", "q1_dechets"]
    },
    "q1_reemploi": {
        text: "Le reconditionnement, c'est quoi exactement ?",
        answers: [
            "Réparer et remettre en état du matériel usagé",
            "Jeter et racheter du neuf",
            "Peindre l'appareil en vert",
            "Le revendre plus cher"
        ],
        correctIndex: 0,
        nextNodes: ["q1_reparation", "q1_jetable", "q1_greenwash", "q1_revente"]
    },
    "q1_reparation": {
        text: "Pourquoi privilégier la réparation ?",
        answers: [
            "Ça prolonge la durée de vie et réduit les déchets",
            "C'est moins cher d'acheter du neuf",
            "C'est trop compliqué",
            "Personne ne sait réparer"
        ],
        correctIndex: 0,
        nextNodes: ["q1_duree", "q1_neuf", "q1_complique", "q1_personne"]
    },
    "q1_duree": {
        text: "Un appareil qui dure 10 ans au lieu de 2 ans...",
        answers: [
            "Économise 80% de ressources et d'énergie",
            "C'est ringard",
            "C'est moins performant",
            "Ça fait perdre des emplois"
        ],
        correctIndex: 0,
        nextNodes: ["q1_ressources", "q1_ringard", "q1_perf", "q1_emploi"]
    },
    "q1_ressources": {
        text: "Les ressources pour fabriquer un smartphone...",
        answers: [
            "Incluent des métaux rares et de l'eau",
            "Sont infinies",
            "Ne posent pas de problème",
            "Se recyclent à 100%"
        ],
        correctIndex: 0,
        nextNodes: ["q1_rares", "q1_infini", "q1_probleme", "q1_recycle"]
    },
    "q1_rares": {
        text: "Les métaux rares (lithium, cobalt, terres rares)...",
        answers: [
            "Sont extraits dans des conditions souvent difficiles",
            "Poussent dans les arbres",
            "Sont illimités",
            "Ne polluent pas"
        ],
        correctIndex: 0,
        nextNodes: ["q1_extraction", "q1_arbre", "q1_illimite", "q1_pollue"]
    },
    "q1_extraction": {
        text: "L'extraction minière pour l'électronique...",
        answers: [
            "Détruit des écosystèmes et consomme beaucoup d'eau",
            "Est écologique",
            "Ne concerne pas le numérique",
            "S'améliore naturellement"
        ],
        correctIndex: 0,
        nextNodes: ["q1_ecosysteme", "q1_eco", "q1_concerne", "q1_naturel"]
    },
    "q1_ecosysteme": {
        text: "Alors, que peut-on faire concrètement ?",
        answers: [
            "Réparer, reconditionner, réutiliser, recycler",
            "Acheter le dernier modèle chaque année",
            "Jeter et racheter",
            "Ne rien faire"
        ],
        correctIndex: 0,
        nextNodes: ["q1_action", "q1_dernier", "q1_jeter", "q1_rien"]
    },
    "q1_action": {
        text: "NIRD propose justement ces solutions. Vous êtes prêt ?",
        answers: [
            "Oui, je veux agir pour un numérique responsable",
            "Non, c'est trop contraignant",
            "Peut-être plus tard",
            "Je m'en fous"
        ],
        correctIndex: 0,
        nextNodes: ["q1_action_suite", "q2_illegal", "q3_pourquoi_libre", "q4_pub"]
    },
    "q1_action_suite": {
        text: "Commençons par quoi concrètement ?",
        answers: [
            "Utiliser du matériel reconditionné",
            "Acheter le dernier iPhone",
            "Jeter mon vieux PC",
            "Rien changer"
        ],
        correctIndex: 0,
        nextNodes: ["q1_final_bon", "q4_chaque_annee", "q2_acheter", "q3_proprio"]
    },
    "q1_final_bon": {
        text: "Et pour les logiciels ?",
        answers: [
            "Privilégier les logiciels libres et légers",
            "Tout sur le cloud des GAFAM",
            "Acheter des licences chères",
            "Pirater"
        ],
        correctIndex: 0,
        nextNodes: ["q1_final_message", "q2_gafam", "q3_proprio", "q4_sert_rien"]
    },
    "q1_final_message": {
        text: "Vous avez tout compris ! Prêt à passer à l'action ?",
        answers: [
            "Oui, je vais appliquer ces principes",
            "Non, c'est trop contraignant",
            "Peut-être un jour",
            "Je continue comme avant"
        ],
        correctIndex: 0,
        nextNodes: ["end", "q2_prouver", "q3_transition", "q4_chaque_annee"]
    },

    // Sous-branches de la branche 1
    "q1_vente": { text: "Vendre plus, ça fait tourner l'économie non ?", answers: ["L'économie circulaire est plus durable", "Oui, il faut consommer", "Plus on achète mieux c'est", "C'est la croissance"], correctIndex: 0, nextNodes: ["q1_circulaire", "q1_consommer", "q1_achete", "q1_croissance"] },
    "q1_jetable": { text: "La culture du jetable...", answers: ["Est un désastre écologique", "Est pratique", "Est moderne", "Est normale"], correctIndex: 0, nextNodes: ["q1_desastre", "q2_demonstration", "q3_proprio", "q4_pub"] },
    "q1_greenwash": { text: "Greenwashing : qu'est-ce que c'est ?", answers: ["Faire croire qu'on est écolo sans l'être", "C'est vraiment écologique", "C'est bien pour l'image", "Tout le monde le fait"], correctIndex: 0, nextNodes: ["q1_faux_eco", "q1_vraiment", "q1_image", "q1_monde"] },
    "q1_revente": { text: "Revendre du reconditionné très cher...", answers: ["Trahit l'objectif social de l'économie circulaire", "C'est normal", "C'est du business", "Faut bien gagner sa vie"], correctIndex: 0, nextNodes: ["q1_social", "q1_normal", "q1_business", "q1_gagner"] },
    "q1_circulaire": { text: "L'économie circulaire c'est...", answers: ["Réparer, réutiliser, recycler en boucle", "Une mode", "Trop compliqué", "Pour les écolos"], correctIndex: 0, nextNodes: ["q1_boucle", "q1_mode_eco", "q1_trop", "q1_ecolos"] },
    "q1_boucle": { text: "Dans un système circulaire...", answers: ["Les déchets deviennent des ressources", "On jette quand même", "Rien ne change", "C'est utopique"], correctIndex: 0, nextNodes: ["q1_dechets_ressources", "q1_jette", "q1_change", "q1_utopique"] },
    "q1_dechets_ressources": { text: "Concrètement avec NIRD...", answers: ["On récupère des PC pour les remettre à neuf", "On achète du neuf aux élèves", "On jette tout", "On ne fait rien"], correctIndex: 0, nextNodes: ["q1_recupere", "q1_achete_neuf", "q1_tout_jette", "q1_fait_rien"] },
    "q1_recupere": {
        text: "Et qui en bénéficie ?",
        answers: ["Les élèves et familles en difficulté", "Personne", "Les riches seulement", "Les entreprises"],
        correctIndex: 0,
        nextNodes: ["q1_inclusif", "q2_prouver", "q4_empechements", "q3_pas_important"]
    },
    "q1_inclusif": {
        text: "Le numérique inclusif, ça signifie ?",
        answers: [
            "Accessible à tous, peu importe le revenu",
            "Réservé aux riches",
            "Seulement pour les jeunes",
            "Ça n'existe pas"
        ],
        correctIndex: 0,
        nextNodes: ["q1_accessibilite", "q4_moquent", "q3_gratuit", "q2_controle"]
    },
    "q1_accessibilite": {
        text: "Comment NIRD rend le numérique accessible ?",
        answers: [
            "Matériel reconditionné abordable + formation",
            "En vendant très cher",
            "Ça ne marche pas",
            "C'est impossible"
        ],
        correctIndex: 0,
        nextNodes: ["q1_final_message", "q2_gafam", "q3_complique", "q4_existe_pas"]
    },
    "q1_desastre": {
        text: "Que faire contre cette culture du jetable ?",
        answers: [
            "Éduquer, réguler, proposer des alternatives",
            "Rien, c'est perdu",
            "Acheter plus",
            "Ignorer le problème"
        ],
        correctIndex: 0,
        nextNodes: ["q1_alternatives", "q2_rien_faire", "q4_chaque_annee", "q3_pas_important"]
    },
    "q1_alternatives": {
        text: "Quelles alternatives concrètes ?",
        answers: [
            "Repair cafés, recycleries, logiciels libres",
            "Aucune",
            "Acheter neuf",
            "Se débrouiller seul"
        ],
        correctIndex: 0,
        nextNodes: ["q1_action_suite", "q2_rien_faire", "q4_mieux", "q3_pourquoi_libre"]
    },

    // ==========================================
    // BRANCHE 2 : Infrastructure / Site qui rame
    // ==========================================
    "q2_infra_start": {
        text: "Le site commence à ramer... Normal ?",
        answers: [
            "Oui, c'est l'obsolescence programmée qui agit",
            "Non, il faut juste rafraîchir",
            "C'est ma connexion",
            "Il faut acheter un nouvel ordi"
        ],
        correctIndex: 0,
        nextNodes: ["q2_obsolescence", "q2_refresh", "q2_connexion", "q2_acheter"]
    },
    "q2_obsolescence": {
        text: "Vous avez remarqué ? Le site se dégrade vraiment...",
        answers: [
            "Oui, c'est une démonstration de l'obsolescence",
            "Non, tout va bien",
            "C'est juste un bug",
            "Il faut mettre à jour le site"
        ],
        correctIndex: 0,
        nextNodes: ["q2_demonstration", "q2_va_bien", "q2_bug", "q2_maj"]
    },
    "q2_demonstration": {
        text: "Cette dégradation vous rappelle quelque chose ?",
        answers: [
            "Un vieux PC qui devient inutilisable",
            "Rien du tout",
            "Un jeu qui lag",
            "Mon téléphone neuf"
        ],
        correctIndex: 0,
        nextNodes: ["q2_vieux_pc", "q2_rien", "q2_jeu", "q2_neuf"]
    },
    "q2_vieux_pc": {
        text: "Pourquoi un PC devient-il 'trop lent' avec le temps ?",
        answers: [
            "Logiciels plus lourds, mises à jour forcées",
            "Il vieillit naturellement",
            "C'est normal",
            "Il faut le changer tous les 2 ans"
        ],
        correctIndex: 0,
        nextNodes: ["q2_logiciels", "q2_vieillit", "q2_normal", "q2_changer"]
    },
    "q2_logiciels": {
        text: "Les logiciels de plus en plus lourds...",
        answers: [
            "C'est parfois de l'obsolescence programmée",
            "C'est pour améliorer les fonctionnalités",
            "C'est le progrès",
            "C'est nécessaire"
        ],
        correctIndex: 0,
        nextNodes: ["q2_programme", "q2_fonctions", "q2_progres", "q2_necessaire"]
    },
    "q2_programme": {
        text: "L'obsolescence programmée, c'est légal ?",
        answers: [
            "Non, c'est interdit en France depuis 2015",
            "Oui, c'est autorisé",
            "Ça dépend",
            "Personne ne contrôle"
        ],
        correctIndex: 0,
        nextNodes: ["q2_illegal", "q2_autorise", "q2_depend", "q2_controle"]
    },
    "q2_illegal": {
        text: "Alors pourquoi ça continue ?",
        answers: [
            "Difficile à prouver, lobbying, modèle économique",
            "Ça ne continue pas",
            "C'est faux",
            "Les entreprises sont honnêtes"
        ],
        correctIndex: 0,
        nextNodes: ["q2_prouver", "q2_continue_pas", "q2_faux", "q2_honnetes"]
    },
    "q2_prouver": {
        text: "Comment lutter contre ça ?",
        answers: [
            "Droit à la réparation, logiciel libre, sensibilisation",
            "On ne peut rien faire",
            "Acheter plus cher",
            "Faire confiance aux marques"
        ],
        correctIndex: 0,
        nextNodes: ["q2_droit", "q2_rien_faire", "q2_cher", "q2_confiance"]
    },
    "q2_droit": {
        text: "Le droit à la réparation, ça change quoi ?",
        answers: [
            "Accès aux pièces, aux docs, réparabilité obligatoire",
            "Rien",
            "C'est trop compliqué",
            "Ça coûte cher"
        ],
        correctIndex: 0,
        nextNodes: ["q2_pieces_detachees", "q3_pas_important", "q4_design", "q1_fait_rien"]
    },
    "q2_pieces_detachees": {
        text: "L'accès aux pièces détachées...",
        answers: [
            "Permet de réparer soi-même ou localement",
            "C'est dangereux",
            "Ça casse la garantie",
            "C'est interdit"
        ],
        correctIndex: 0,
        nextNodes: ["q2_reparation_locale", "q4_tech", "q3_proprio", "q1_tout_jette"]
    },
    "q2_reparation_locale": {
        text: "Réparer localement plutôt qu'en usine...",
        answers: [
            "Réduit l'empreinte carbone et crée des emplois",
            "C'est moins bien",
            "Faut tout renvoyer au fabricant",
            "C'est impossible"
        ],
        correctIndex: 0,
        nextNodes: ["q1_final_message", "q3_moins_secure", "q4_notre_bien", "q1_complique"]
    },
    "q2_maj": {
        text: "OK, mettons à jour le site. À qui s'adresser ?",
        answers: [
            "Une communauté open source locale",
            "Les GAFAM",
            "Un prestataire au prix le plus élevé",
            "Personne, c'est parfait"
        ],
        correctIndex: 0,
        nextNodes: ["q2_communaute", "q2_gafam", "q2_prestataire", "q2_parfait"]
    },
    "q2_communaute": {
        text: "Les communautés open source, c'est efficace ?",
        answers: [
            "Oui : Linux, Firefox, LibreOffice...",
            "Non, ça marche jamais",
            "C'est pour les geeks",
            "C'est trop compliqué"
        ],
        correctIndex: 0,
        nextNodes: ["q2_linux", "q2_marche_pas", "q2_geek", "q2_complique"]
    },
    "q2_linux": {
        text: "Linux, c'est quoi au juste ?",
        answers: [
            "Un système d'exploitation libre et gratuit",
            "Une marque d'ordinateur",
            "Un langage de programmation",
            "Un virus"
        ],
        correctIndex: 0,
        nextNodes: ["q2_os_libre", "q2_marque", "q2_langage", "q2_virus"]
    },
    "q2_os_libre": {
        text: "Pourquoi utiliser un OS libre ?",
        answers: [
            "Contrôle, sécurité, pas d'obsolescence forcée",
            "C'est gratuit seulement",
            "Pour faire le malin",
            "C'est la mode"
        ],
        correctIndex: 0,
        nextNodes: ["q2_controle_utilisateur", "q3_gratuit", "q4_moquent", "q1_personne"]
    },
    "q2_controle_utilisateur": {
        text: "Reprendre le contrôle de son matériel...",
        answers: [
            "C'est un droit fondamental",
            "C'est pour les geeks",
            "Ça ne sert à rien",
            "C'est dangereux"
        ],
        correctIndex: 0,
        nextNodes: ["q2_souverainete", "q3_complique", "q4_sert_rien", "q1_arbre"]
    },
    "q2_souverainete": {
        text: "La souveraineté numérique à l'école ?",
        answers: [
            "Former aux outils libres et indépendants",
            "Tout sur Google Classroom",
            "Peu importe les outils",
            "C'est compliqué"
        ],
        correctIndex: 0,
        nextNodes: ["q1_final_message", "q2_gafam", "q3_proprio", "q4_complique"]
    },
    "q2_gafam": {
        text: "Dépendre des GAFAM, c'est risqué pourquoi ?",
        answers: [
            "Perte de contrôle, enfermement, données",
            "C'est pas risqué",
            "Ils sont fiables",
            "Y'a pas d'alternative"
        ],
        correctIndex: 0,
        nextNodes: ["q2_controle_perdu", "q2_pas_risque", "q2_fiable", "q2_alternative"]
    },
    "q2_controle_perdu": {
        text: "La souveraineté numérique, c'est important ?",
        answers: [
            "Oui, pour garder le contrôle de nos outils",
            "Non, pas vraiment",
            "Seulement pour les gouvernements",
            "C'est du marketing"
        ],
        correctIndex: 0,
        nextNodes: ["q2_donnees_perso", "q4_sert_rien", "q3_pas_important", "q1_pollue"]
    },
    "q2_donnees_perso": {
        text: "Vos données personnelles sur les serveurs des GAFAM...",
        answers: [
            "Sont exploitées commercialement",
            "Sont en sécurité",
            "Ça ne me dérange pas",
            "Je n'ai rien à cacher"
        ],
        correctIndex: 0,
        nextNodes: ["q2_vie_privee", "q3_dangereux", "q4_optionnel", "q1_eco"]
    },
    "q2_vie_privee": {
        text: "La vie privée numérique...",
        answers: [
            "Est un droit qu'il faut protéger",
            "N'existe plus",
            "N'est pas importante",
            "C'est pour les paranoïaques"
        ],
        correctIndex: 0,
        nextNodes: ["q1_final_message", "q3_moins_secure", "q4_existe_pas", "q1_illimite"]
    },

    // ==========================================
    // BRANCHE 3 : Logiciel libre
    // ==========================================
    "q3_libre_start": {
        text: "Quelle technologie favorise la durabilité ?",
        answers: [
            "Les logiciels libres et open source",
            "Les apps propriétaires à abonnement",
            "Les mises à jour forcées",
            "Le cloud intensif"
        ],
        correctIndex: 0,
        nextNodes: ["q3_pourquoi_libre", "q3_proprio", "q3_maj_force", "q3_cloud"]
    },
    "q3_pourquoi_libre": {
        text: "Pourquoi préférer le logiciel libre ?",
        answers: [
            "Transparence, contrôle, pérennité",
            "Parce que c'est gratuit",
            "Pour faire comme les autres",
            "C'est la mode"
        ],
        correctIndex: 0,
        nextNodes: ["q3_transparence", "q3_gratuit", "q3_autres", "q3_mode"]
    },
    "q3_transparence": {
        text: "La transparence du code source, ça veut dire quoi ?",
        answers: [
            "On peut voir, vérifier et modifier le code",
            "C'est invisible",
            "C'est secret",
            "C'est compliqué"
        ],
        correctIndex: 0,
        nextNodes: ["q3_verifier", "q3_invisible", "q3_secret", "q3_complique"]
    },
    "q3_verifier": {
        text: "Pourquoi c'est important de pouvoir vérifier le code ?",
        answers: [
            "Sécurité, confiance, pas de porte dérobée",
            "C'est pas important",
            "Personne ne le fait",
            "C'est trop technique"
        ],
        correctIndex: 0,
        nextNodes: ["q3_securite", "q3_pas_important", "q3_personne", "q3_technique"]
    },
    "q3_securite": {
        text: "La sécurité par l'open source...",
        answers: [
            "Plus d'yeux = plus de bugs trouvés et corrigés",
            "C'est moins sécurisé",
            "Les hackers voient le code",
            "C'est dangereux"
        ],
        correctIndex: 0,
        nextNodes: ["q3_yeux", "q3_moins_secure", "q3_hackers", "q3_dangereux"]
    },
    "q3_yeux": {
        text: "La communauté open source...",
        answers: [
            "Collabore pour améliorer le logiciel",
            "Ne fait rien",
            "Est désorganisée",
            "N'existe pas vraiment"
        ],
        correctIndex: 0,
        nextNodes: ["q3_collabore", "q3_fait_rien", "q3_desorg", "q3_existe_pas"]
    },
    "q3_collabore": {
        text: "Des exemples concrets d'open source ?",
        answers: [
            "Linux, Firefox, VLC, LibreOffice, WordPress...",
            "Windows, Office",
            "iPhone, Mac",
            "Rien de connu"
        ],
        correctIndex: 0,
        nextNodes: ["q3_exemples", "q3_windows", "q3_apple", "q3_rien_connu"]
    },
    "q3_exemples": {
        text: "Internet lui-même repose sur l'open source ?",
        answers: [
            "Oui : serveurs Linux, protocoles ouverts",
            "Non, c'est propriétaire",
            "C'est compliqué",
            "Je sais pas"
        ],
        correctIndex: 0,
        nextNodes: ["q3_internet", "q3_propio_internet", "q3_complique_internet", "q3_sais_pas"]
    },
    "q3_internet": {
        text: "Vous êtes convaincu par le libre ?",
        answers: [
            "Oui, je vais essayer !",
            "Non, trop compliqué",
            "Peut-être",
            "Je reste sur Windows"
        ],
        correctIndex: 0,
        nextNodes: ["q3_premier_pas", "q4_complique", "q2_prouver", "q1_ringard"]
    },
    "q3_premier_pas": {
        text: "Par quoi commencer avec le libre ?",
        answers: [
            "Firefox, LibreOffice, VLC sur son OS actuel",
            "Tout changer d'un coup",
            "Rien, c'est trop dur",
            "Attendre que d'autres le fassent"
        ],
        correctIndex: 0,
        nextNodes: ["q3_transition", "q2_acheter", "q4_rien_empeche", "q1_perf"]
    },
    "q3_transition": {
        text: "La transition vers le libre...",
        answers: [
            "Peut être progressive et accompagnée",
            "Doit être brutale",
            "Est impossible",
            "Ne marche jamais"
        ],
        correctIndex: 0,
        nextNodes: ["q3_accompagnement", "q2_changer", "q4_impossible", "q1_emploi"]
    },
    "q3_accompagnement": {
        text: "NIRD accompagne cette transition comment ?",
        answers: [
            "Formation, documentation, communauté",
            "Rien",
            "C'est payant",
            "Seulement pour les experts"
        ],
        correctIndex: 0,
        nextNodes: ["q1_final_message", "q2_rien_faire", "q4_trop_cher", "q1_infini"]
    },

    // ==========================================
    // BRANCHE 4 : Normes et durabilité
    // ==========================================
    "q4_normes_start": {
        text: "Un bon indicateur de durabilité numérique ?",
        answers: [
            "La durée de vie moyenne des équipements",
            "Le nombre de publicités",
            "La taille des mises à jour",
            "Le nombre de trackers"
        ],
        correctIndex: 0,
        nextNodes: ["q4_duree_vie", "q4_pub", "q4_maj_taille", "q4_trackers"]
    },
    "q4_duree_vie": {
        text: "En France, combien de temps garde-t-on un smartphone ?",
        answers: [
            "Environ 2-3 ans",
            "10 ans",
            "6 mois",
            "Jusqu'à ce qu'il casse"
        ],
        correctIndex: 0,
        nextNodes: ["q4_2_3_ans", "q4_10ans", "q4_6mois", "q4_casse"]
    },
    "q4_2_3_ans": {
        text: "Pourtant, un smartphone pourrait durer...",
        answers: [
            "5 à 7 ans avec un bon entretien",
            "1 an maximum",
            "2 ans c'est déjà bien",
            "Il faut le changer chaque année"
        ],
        correctIndex: 0,
        nextNodes: ["q4_5_7ans", "q4_1an", "q4_2ans_bien", "q4_chaque_annee"]
    },
    "q4_5_7ans": {
        text: "Qu'est-ce qui empêche de garder son téléphone plus longtemps ?",
        answers: [
            "Batterie, mises à jour arrêtées, mode, réparabilité",
            "Rien",
            "Il devient moche",
            "Les amis se moquent"
        ],
        correctIndex: 0,
        nextNodes: ["q4_empechements", "q4_rien_empeche", "q4_moche", "q4_moquent"]
    },
    "q4_empechements": {
        text: "La batterie non remplaçable...",
        answers: [
            "C'est de l'obsolescence programmée",
            "C'est pour le design",
            "C'est technique",
            "C'est normal"
        ],
        correctIndex: 0,
        nextNodes: ["q4_batterie_obso", "q4_design", "q4_tech", "q4_normal_bat"]
    },
    "q4_batterie_obso": {
        text: "Les fabricants pourraient faire des batteries amovibles ?",
        answers: [
            "Oui, ils le faisaient avant !",
            "Non, impossible techniquement",
            "Non, c'est trop cher",
            "Non, personne ne veut ça"
        ],
        correctIndex: 0,
        nextNodes: ["q4_avant", "q4_impossible", "q4_trop_cher", "q4_personne_veut"]
    },
    "q4_avant": {
        text: "Pourquoi ils ont arrêté alors ?",
        answers: [
            "Pour vendre plus de téléphones neufs",
            "Pour notre bien",
            "C'est mieux comme ça",
            "Le progrès"
        ],
        correctIndex: 0,
        nextNodes: ["q4_vendre_plus", "q4_notre_bien", "q4_mieux", "q4_progres_bat"]
    },
    "q4_vendre_plus": {
        text: "L'indice de réparabilité en France...",
        answers: [
            "Oblige à afficher la note de réparabilité",
            "N'existe pas",
            "Est optionnel",
            "Ne sert à rien"
        ],
        correctIndex: 0,
        nextNodes: ["q4_indice", "q4_existe_pas", "q4_optionnel", "q4_sert_rien"]
    },
    "q4_indice": {
        text: "Cet indice, c'est un progrès ?",
        answers: [
            "Oui, ça pousse les fabricants à faire mieux",
            "Non, c'est du greenwashing",
            "Ça ne change rien",
            "Personne ne le regarde"
        ],
        correctIndex: 0,
        nextNodes: ["q4_fabricants", "q1_greenwash", "q2_continue_pas", "q3_mode"]
    },
    "q4_fabricants": {
        text: "Les fabricants peuvent-ils vraiment changer ?",
        answers: [
            "Oui, avec pression des consommateurs et lois",
            "Non, jamais",
            "Ils sont trop puissants",
            "C'est leur nature"
        ],
        correctIndex: 0,
        nextNodes: ["q4_consommateurs", "q2_honnetes", "q2_gafam", "q1_probleme"]
    },
    "q4_consommateurs": {
        text: "Le pouvoir des consommateurs...",
        answers: [
            "Influence le marché par les choix d'achat",
            "N'existe pas",
            "Est une illusion",
            "Ne sert à rien"
        ],
        correctIndex: 0,
        nextNodes: ["q4_achats_responsables", "q3_existe_pas", "q2_confiance", "q1_recycle"]
    },
    "q4_achats_responsables": {
        text: "Acheter responsable, concrètement ?",
        answers: [
            "Reconditionné, durable, local, éthique",
            "Le moins cher possible",
            "Le plus cher",
            "N'importe quoi"
        ],
        correctIndex: 0,
        nextNodes: ["q1_final_message", "q2_cher", "q1_revente", "q3_gratuit"]
    },

    // Complétion de toutes les sous-branches avec interconnexions
    // Branches 1 - Sous-nœuds étendus
    "q1_neuf": { text: "C'est moins cher d'acheter du neuf ?", answers: ["Faux ! Le reconditionné est 30-70% moins cher", "Oui toujours", "Le neuf c'est mieux", "C'est pareil"], correctIndex: 0, nextNodes: ["q1_prix", "q4_notre_bien", "q2_cher", "q3_mode"] },
    "q1_complique": { text: "Réparer c'est trop compliqué ?", answers: ["Pas avec les bons outils et tutoriels", "Oui impossible", "Faut être expert", "Personne ne sait"], correctIndex: 0, nextNodes: ["q1_outils", "q3_technique", "q2_marche_pas", "q4_design"] },
    "q1_personne": { text: "Personne ne sait réparer ?", answers: ["Il y a des repair cafés, des tutos, des communautés", "C'est vrai", "C'est perdu", "Faut tout jeter"], correctIndex: 0, nextNodes: ["q1_repair_cafe", "q3_fait_rien", "q2_rien_faire", "q4_casse"] },
    "q1_ringard": { text: "Garder un vieux appareil c'est ringard ?", answers: ["Non, c'est responsable et malin !", "Oui totalement", "On se moque de moi", "Faut le dernier modèle"], correctIndex: 0, nextNodes: ["q1_responsable", "q4_moquent", "q3_mode", "q2_maj"] },
    "q1_perf": { text: "Un vieil appareil est-il moins performant ?", answers: ["Souvent suffisant pour un usage normal", "Oui inutilisable", "Faut du neuf", "C'est trop lent"], correctIndex: 0, nextNodes: ["q1_usage", "q2_vieillit", "q4_chaque_annee", "q3_proprio"] },
    "q1_emploi": { text: "La réparation détruit des emplois ?", answers: ["Faux ! Ça en crée dans la réparation locale", "Oui c'est vrai", "Ça tue l'industrie", "C'est mauvais pour l'économie"], correctIndex: 0, nextNodes: ["q1_emplois_locaux", "q2_honnetes", "q4_fabricants", "q3_existe_pas"] },
    "q1_infini": { text: "Les ressources sont infinies ?", answers: ["Non, la Terre a des limites", "Oui", "On trouvera toujours", "Y'en a assez"], correctIndex: 0, nextNodes: ["q1_limites", "q2_controle", "q3_sais_pas", "q4_optionnel"] },
    "q1_probleme": { text: "L'extraction ne pose pas de problème ?", answers: ["Si : pollution, droits humains, conflits", "Non aucun", "C'est bien géré", "Tout va bien"], correctIndex: 0, nextNodes: ["q1_extraction", "q2_continue_pas", "q4_normal_bat", "q3_dangereux"] },
    "q1_recycle": { text: "Tout se recycle à 100% ?", answers: ["Non, moins de 20% des métaux rares", "Oui tout", "C'est magique", "Pas de problème"], correctIndex: 0, nextNodes: ["q1_taux_recyclage", "q3_invisible", "q2_faux", "q4_sert_rien"] },
    "q1_arbre": { text: "Les métaux rares poussent dans les arbres ?", answers: ["Non, ils nécessitent des mines profondes", "Oui", "Ça pousse", "C'est naturel"], correctIndex: 0, nextNodes: ["q1_mines", "q3_rien_connu", "q4_6mois", "q2_virus"] },
    "q1_illimite": { text: "Les métaux rares sont illimités ?", answers: ["Non, ils sont par définition rares et limités", "Oui", "Y'en a partout", "C'est infini"], correctIndex: 0, nextNodes: ["q1_rarete", "q2_pas_risque", "q3_secret", "q4_10ans"] },
    "q1_pollue": { text: "L'extraction ne pollue pas ?", answers: ["Si énormément : eau, sols, air", "Non c'est propre", "C'est écologique", "Pas de pollution"], correctIndex: 0, nextNodes: ["q1_pollution_extraction", "q3_dangereux", "q4_design", "q2_fiable"] },
    "q1_eco": { text: "L'extraction est écologique ?", answers: ["Non, c'est une des industries les plus polluantes", "Oui", "C'est vert", "Pas de problème"], correctIndex: 0, nextNodes: ["q1_industrie_polluante", "q2_fiable", "q3_complique_internet", "q4_existe_pas"] },
    "q1_concerne": { text: "Ça ne concerne pas le numérique ?", answers: ["Si ! Chaque smartphone contient 50+ métaux", "Non", "C'est pas lié", "Rien à voir"], correctIndex: 0, nextNodes: ["q1_50_metaux", "q2_virus", "q4_casse", "q3_windows"] },
    "q1_naturel": { text: "Ça s'améliore naturellement ?", answers: ["Non, il faut des réglementations et actions", "Oui", "Le marché régule", "Ça va tout seul"], correctIndex: 0, nextNodes: ["q1_reglementation", "q3_windows", "q4_progres_bat", "q2_depend"] },
    "q1_dernier": { text: "Acheter le dernier modèle chaque année ?", answers: ["C'est le pire pour la planète", "C'est bien", "Faut être à jour", "C'est normal"], correctIndex: 0, nextNodes: ["q1_action_suite", "q4_chaque_annee", "q2_maj", "q3_mode"] },
    "q1_jeter": { text: "Jeter et racheter ?", answers: ["C'est l'opposé de NIRD", "C'est pratique", "C'est plus simple", "C'est normal"], correctIndex: 0, nextNodes: ["q1_circulaire", "q2_acheter", "q3_proprio", "q4_mieux"] },
    "q1_rien": { text: "Ne rien faire ?", answers: ["Le changement vient de nos actions", "C'est mieux", "Trop compliqué", "Ça sert à rien"], correctIndex: 0, nextNodes: ["q2_prouver", "q3_pas_important", "q4_sert_rien", "q1_pratique"] },

    // Suite des complétions avec interconnexions
    "q1_prix": { text: "Le reconditionné, c'est de la qualité ?", answers: ["Oui, souvent garanti 1-2 ans !", "Non c'est nul", "C'est cassé", "Faut du neuf"], correctIndex: 0, nextNodes: ["q1_action_suite", "q2_rien_faire", "q3_moins_secure", "q4_impossible"] },
    "q1_outils": { text: "Les outils de réparation sont accessibles ?", answers: ["De plus en plus, avec le droit à la réparation", "Non jamais", "C'est impossible", "Trop cher"], correctIndex: 0, nextNodes: ["q2_droit", "q3_personne", "q4_impossible", "q1_business"] },
    "q1_repair_cafe": { text: "Un repair café, c'est quoi ?", answers: ["Un lieu où on répare ensemble gratuitement", "Un café", "Ça existe pas", "C'est payant"], correctIndex: 0, nextNodes: ["q1_alternatives", "q3_existe_pas", "q2_gafam", "q4_trop_cher"] },
    "q1_responsable": { text: "NIRD rend le numérique responsable comment ?", answers: ["Réparation, réemploi, logiciel libre, sensibilisation", "Ça change rien", "C'est impossible", "C'est utopique"], correctIndex: 0, nextNodes: ["q1_action_suite", "q2_depend", "q3_complique", "q4_existe_pas"] },
    "q1_usage": { text: "Avez-vous vraiment besoin du dernier processeur ?", answers: ["Non, pour 90% des usages un vieux PC suffit", "Oui obligé", "Faut de la puissance", "Sinon ça rame"], correctIndex: 0, nextNodes: ["q2_logiciels", "q3_gratuit", "q4_1an", "q1_moderne"] },
    "q1_emplois_locaux": { text: "Vous êtes convaincu par NIRD ?", answers: ["Oui, c'est l'avenir !", "Non", "Peut-être", "Je sais pas"], correctIndex: 0, nextNodes: ["q1_action_suite", "q2_obsolescence", "q3_pourquoi_libre", "q4_pub"] },

    // Branches 2-4 complétions avec interconnexions
    "q2_refresh": { text: "Rafraîchir résout les problèmes ?", answers: ["Non, le problème est structurel", "Oui", "Parfois", "Je sais pas"], correctIndex: 0, nextNodes: ["q2_obsolescence", "q3_invisible", "q4_rien_empeche", "q1_utopique"] },
    "q2_connexion": { text: "C'est votre connexion ?", answers: ["Non, c'est le site qui se dégrade volontairement", "Oui", "Sûrement", "Mon WiFi"], correctIndex: 0, nextNodes: ["q2_obsolescence", "q3_secret", "q4_tech", "q1_change"] },
    "q2_acheter": { text: "Acheter un nouvel ordi ?", answers: ["Non ! C'est ce que veut l'obsolescence", "Oui", "Faut du neuf", "Le mien est vieux"], correctIndex: 0, nextNodes: ["q2_obsolescence", "q4_chaque_annee", "q3_proprio", "q1_jette"] },

    // Sous-branches de toutes les branches avec interconnexions
    "q1_consommer": { text: "Consommer plus ?", answers: ["Ce n'est pas durable", "Oui", "Toujours plus", "C'est bien"], correctIndex: 0, nextNodes: ["q1_circulaire", "q2_fonctions", "q4_10ans", "q3_mode"] },
    "q1_achete": { text: "Plus on achète mieux c'est ?", answers: ["Non, il faut consommer responsable", "Oui", "Bien sûr", "Toujours"], correctIndex: 0, nextNodes: ["q4_consommateurs", "q2_progres", "q3_gratuit", "q1_normale"] },
    "q1_croissance": { text: "La croissance infinie ?", answers: ["Impossible dans un monde fini", "C'est possible", "Toujours", "Pourquoi pas"], correctIndex: 0, nextNodes: ["q1_circulaire", "q2_necessaire", "q3_mode", "q4_sert_rien"] },

    // Nouvelles sous-branches manquantes
    "q1_mode_eco": { text: "L'écologie c'est juste une mode ?", answers: ["Non, c'est une nécessité urgente", "Oui ça passera", "C'est tendance", "On verra"], correctIndex: 0, nextNodes: ["q1_circulaire", "q3_mode", "q4_sert_rien", "q2_refresh"] },
    "q1_trop": { text: "Trop compliqué pour vous ?", answers: ["Non, avec de l'accompagnement c'est faisable", "Oui totalement", "Peut-être", "Sûrement"], correctIndex: 0, nextNodes: ["q3_accompagnement", "q4_complique", "q2_depend", "q1_gagner"] },
    "q1_ecolos": { text: "Réservé aux écolos ?", answers: ["Non, c'est pour tout le monde !", "Oui", "C'est militant", "Pas pour moi"], correctIndex: 0, nextNodes: ["q1_inclusif", "q3_mode", "q2_normal", "q4_mieux"] },
    "q1_jette": { text: "Jeter quand même dans un système circulaire ?", answers: ["Seulement ce qui ne peut vraiment pas être réparé", "Tout jeter", "Beaucoup jeter", "C'est pareil"], correctIndex: 0, nextNodes: ["q1_recupere", "q2_acheter", "q4_mieux", "q3_proprio"] },
    "q1_change": { text: "Rien ne change vraiment ?", answers: ["Si, les mentalités et pratiques évoluent", "C'est vrai", "Trop lent", "Impossible"], correctIndex: 0, nextNodes: ["q1_action_suite", "q2_depend", "q3_pas_important", "q4_impossible"] },
    "q1_utopique": { text: "C'est utopique ?", answers: ["Non, ça marche déjà dans de nombreux endroits", "Oui totalement", "C'est un rêve", "Impossible"], correctIndex: 0, nextNodes: ["q1_recupere", "q2_controle", "q3_existe_pas", "q4_complique"] },
    "q1_achete_neuf": { text: "Acheter du neuf pour l'école ?", answers: ["Le reconditionné est tout aussi bien", "Oui forcément", "Faut du neuf", "C'est mieux"], correctIndex: 0, nextNodes: ["q1_inclusif", "q4_notre_bien", "q2_cher", "q3_gratuit"] },
    "q1_tout_jette": { text: "Tout jeter, vraiment ?", answers: ["Non, c'est l'inverse de NIRD", "Oui", "Pourquoi pas", "C'est plus simple"], correctIndex: 0, nextNodes: ["q1_circulaire", "q2_faux", "q4_casse", "q3_mode"] },
    "q1_fait_rien": { text: "Ne rien faire concrètement ?", answers: ["NIRD agit : récupération, formation, distribution", "C'est vrai", "Ça sert à rien", "Que des paroles"], correctIndex: 0, nextNodes: ["q1_action_suite", "q2_rien_faire", "q4_sert_rien", "q3_pas_important"] },
    "q1_faux_eco": { text: "Comment reconnaître le vrai du faux écolo ?", answers: ["Actions concrètes vs communication vide", "On ne peut pas", "C'est pareil", "Tout est faux"], correctIndex: 0, nextNodes: ["q1_action", "q2_confiance", "q3_pas_important", "q4_fabricants"] },
    "q1_vraiment": { text: "C'est vraiment écologique ?", answers: ["Il faut vérifier les actions réelles", "Impossible à savoir", "On fait confiance", "Tout se vaut"], correctIndex: 0, nextNodes: ["q1_action", "q2_gafam", "q4_fabricants", "q3_moins_secure"] },
    "q1_image": { text: "Juste pour l'image ?", answers: ["L'écologie doit être authentique, pas du marketing", "Oui c'est ça", "C'est normal", "Pourquoi pas"], correctIndex: 0, nextNodes: ["q1_action", "q3_mode", "q2_pas_risque", "q4_optionnel"] },
    "q1_monde": { text: "Tout le monde fait du greenwashing ?", answers: ["Non, certains agissent vraiment", "Oui tous", "Sûrement", "Probablement"], correctIndex: 0, nextNodes: ["q1_action", "q2_honnetes", "q4_sert_rien", "q3_existe_pas"] },
    "q1_social": { text: "L'aspect social est important ?", answers: ["Essentiel : numérique accessible à tous", "Pas vraiment", "C'est secondaire", "On s'en fout"], correctIndex: 0, nextNodes: ["q1_inclusif", "q3_pas_important", "q4_existe_pas", "q2_connexion"] },
    "q1_normal": { text: "C'est normal de vendre cher ?", answers: ["Pas dans une démarche inclusive", "Oui", "Bien sûr", "Toujours"], correctIndex: 0, nextNodes: ["q1_inclusif", "q2_cher", "q4_notre_bien", "q3_gratuit"] },
    "q1_business": { text: "Le business avant tout ?", answers: ["Non, l'impact social prime", "Oui", "Forcément", "C'est logique"], correctIndex: 0, nextNodes: ["q1_social", "q2_gafam", "q4_fabricants", "q3_proprio"] },
    "q1_gagner": { text: "Faut bien gagner sa vie ?", answers: ["Oui, mais pas au détriment de la mission sociale", "Oui sans limite", "Le profit maximum", "Toujours plus"], correctIndex: 0, nextNodes: ["q1_social", "q2_controle_perdu", "q4_consommateurs", "q3_mode"] },
    "q1_pratique": { text: "Le jetable c'est pratique non ?", answers: ["La facilité a un coût environnemental énorme", "Oui très", "C'est l'idéal", "Pourquoi changer"], correctIndex: 0, nextNodes: ["q1_desastre", "q2_necessaire", "q4_mieux", "q3_complique"] },
    "q1_moderne": { text: "C'est moderne de jeter ?", answers: ["Non, c'est dépassé et destructeur", "Oui", "C'est actuel", "C'est comme ça"], correctIndex: 0, nextNodes: ["q1_desastre", "q3_mode", "q4_normal_bat", "q2_progres"] },
    "q1_normale": { text: "C'est devenu normal ?", answers: ["Malheureusement, mais on peut changer", "Oui", "Totalement", "Forcément"], correctIndex: 0, nextNodes: ["q1_alternatives", "q2_normal", "q3_pas_important", "q4_sert_rien"] },

    // Nouvelles branches de profondeur
    "q1_limites": { text: "Les limites planétaires...", answers: ["Sont déjà dépassées pour certaines ressources", "N'existent pas", "On trouvera des solutions", "Pas notre problème"], correctIndex: 0, nextNodes: ["q1_action", "q2_controle", "q4_fabricants", "q3_sais_pas"] },
    "q1_taux_recyclage": { text: "20% de recyclage c'est peu ?", answers: ["Oui, il faut faire durer plutôt que recycler", "C'est déjà bien", "C'est assez", "Ça ira"], correctIndex: 0, nextNodes: ["q1_reparation", "q4_sert_rien", "q2_depend", "q3_invisible"] },
    "q1_mines": { text: "Les mines de métaux rares...", answers: ["Détruisent environnement et populations locales", "Sont propres", "Pas de problème", "C'est géré"], correctIndex: 0, nextNodes: ["q1_extraction", "q3_dangereux", "q2_faux", "q4_design"] },
    "q1_rarete": { text: "La rareté des métaux...", answers: ["Oblige à économiser et réutiliser", "On trouvera ailleurs", "Pas de souci", "Y'en a assez"], correctIndex: 0, nextNodes: ["q1_reparation", "q2_alternative", "q4_6mois", "q3_secret"] },
    "q1_pollution_extraction": { text: "Cette pollution...", answers: ["Justifie encore plus la réparation", "C'est exagéré", "C'est géré", "Pas grave"], correctIndex: 0, nextNodes: ["q1_duree", "q2_faux", "q4_design", "q3_dangereux"] },
    "q1_industrie_polluante": { text: "Que faire face à cette industrie polluante ?", answers: ["Ralentir la production en faisant durer", "Rien", "Continuer", "C'est comme ça"], correctIndex: 0, nextNodes: ["q1_duree", "q3_fait_rien", "q2_necessaire", "q4_progres_bat"] },
    "q1_50_metaux": { text: "50 métaux dans un smartphone ?", answers: ["Oui, d'où l'importance de le garder longtemps", "C'est faux", "Pas tant", "Exagéré"], correctIndex: 0, nextNodes: ["q4_5_7ans", "q2_faux", "q3_secret", "q1_rarete"] },
    "q1_reglementation": { text: "Les réglementations suffisent ?", answers: ["Non, il faut aussi changer nos pratiques", "Oui", "C'est assez", "Trop même"], correctIndex: 0, nextNodes: ["q1_action", "q2_autorise", "q4_optionnel", "q3_pas_important"] },

    // Nœud final
    "end": {
        text: "Fin du parcours !",
        answers: ["", "", "", ""],
        correctIndex: 0,
        nextNodes: ["end", "end", "end", "end"]
    }
};

let currentNode = "start";
let questionCount = 0;
let degradationLevel = 0;
const maxDegradationLevel = 7;
const maxQuestions = 15;

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
const chrome404El = document.getElementById("chrome-404");
const restartFrom404Btn = document.getElementById("restart-from-404");

// ==============================
// Initialisation
// ==============================
function initQuiz() {
    currentNode = "start";
    questionCount = 0;
    degradationLevel = 0;

    // Nettoyer complètement toutes les classes de dégradation
    document.body.className = "";

    // Nettoyer le faux curseur si présent
    if (fakeCursor) {
        fakeCursor.remove();
        fakeCursor = null;
    }

    // Retirer l'événement de souris inversée
    if (mouseInvertedEnabled) {
        window.removeEventListener("mousemove", onMouseMoveInverted);
        mouseInvertedEnabled = false;
    }

    // Réinitialiser tous les styles inline qui pourraient avoir été ajoutés
    document.body.style.cssText = "";

    // Nettoyer tous les styles inline des segments et leurs enfants
    segments.forEach(btn => {
        btn.style.cssText = "";
        const segmentText = btn.querySelector('.segment-text');
        const segmentLetter = btn.querySelector('.segment-letter');
        if (segmentText) segmentText.style.cssText = "";
        if (segmentLetter) segmentLetter.style.cssText = "";
    });

    // Nettoyer les styles de la question
    if (questionTextEl) questionTextEl.style.cssText = "";
    if (questionNumberEl) questionNumberEl.style.cssText = "";

    // Nettoyer d'autres éléments qui pourraient avoir été modifiés
    const elementsToClean = [
        '.wheel', '.center-circle', '.divider',
        '.main-header', '.status-panel', '.question-panel'
    ];
    elementsToClean.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.style.cssText = "";
    });

    // Masquer les écrans de fin
    endScreenEl.classList.add("hidden");
    if (chrome404El) chrome404El.classList.add("hidden");

    feedbackEl.textContent = "";
    loadQuestion();
    updateHealthUI();
    updateDegradationExplanation();
}

function loadQuestion() {
    const node = questionTree[currentNode];
    if (!node) {
        showEndScreen();
        return;
    }

    questionNumberEl.textContent = `Question ${questionCount + 1}`;
    questionTextEl.textContent = node.text;

    // Restaurer les lettres A, B, C, D
    const letters = ['A', 'B', 'C', 'D'];

    // Restaurer la police et le texte original de chaque segment
    segments.forEach((btn, idx) => {
        const segmentText = btn.querySelector('.segment-text');
        const segmentLetter = btn.querySelector('.segment-letter');

        // Restaurer la lettre (A, B, C, D)
        if (segmentLetter) {
            segmentLetter.textContent = letters[idx];
            segmentLetter.style.cssText = "";
        }

        // Mettre à jour le texte de la réponse
        if (segmentText) {
            segmentText.textContent = node.answers[idx] || "";
            segmentText.style.cssText = "";
        }

        // Nettoyer le bouton lui-même
        btn.style.cssText = "";
    });
}

// ==============================
// Gestion des réponses
// ==============================
function handleAnswerClick(selectedIndex) {
    const node = questionTree[currentNode];
    if (!node) return;

    if (selectedIndex === node.correctIndex) {
        feedbackEl.textContent = "Bonne réponse ! Tu prolonges la vie de ce système.";
        feedbackEl.style.color = "#22c55e";

        moveToNextQuestion(selectedIndex);
    } else {
        feedbackEl.textContent = "Mauvaise réponse… l'expérience se dégrade.";
        feedbackEl.style.color = "#f97316";

        increaseDegradation();
        moveToNextQuestion(selectedIndex);
    }
}

function moveToNextQuestion(selectedIndex) {
    // Petite pause pour laisser voir le feedback
    setTimeout(() => {
        const node = questionTree[currentNode];
        if (!node) {
            showEndScreen();
            return;
        }

        // Naviguer vers le nœud suivant selon la réponse choisie
        if (node.nextNodes && node.nextNodes[selectedIndex]) {
            currentNode = node.nextNodes[selectedIndex];
        } else {
            currentNode = "end";
        }

        questionCount++;

        // Si le nœud suivant n'existe pas, revenir au début d'une branche aléatoire
        if (currentNode !== "end" && !questionTree[currentNode]) {
            const fallbackNodes = ["q1_objectif", "q2_infra_start", "q3_libre_start", "q4_normes_start"];
            currentNode = fallbackNodes[Math.floor(Math.random() * fallbackNodes.length)];
        }

        // Vérifier si on a atteint la fin ou le max de dégradations
        // IMPORTANT : Vérifier questionCount >= 10 minimum AVANT de terminer
        if (currentNode === "end" && questionCount >= 10) {
            showEndScreen();
            return;
        }

        if (degradationLevel >= maxDegradationLevel && questionCount >= 10) {
            showEndScreen();
            return;
        }

        if (questionCount >= maxQuestions) {
            showEndScreen();
            return;
        }

        feedbackEl.textContent = "";
        loadQuestion();
    }, 900);
}

function showEndScreen() {
    // Mettre à jour les statistiques
    const totalQuestionsEl = document.getElementById("total-questions");
    const totalDegradationsEl = document.getElementById("total-degradations");
    if (totalQuestionsEl) totalQuestionsEl.textContent = questionCount;
    if (totalDegradationsEl) totalDegradationsEl.textContent = degradationLevel;

    // Si trop de dégradations (>= 7), afficher la page 404 Chrome
    if (degradationLevel >= maxDegradationLevel) {
        chrome404El.classList.remove("hidden");

        // Messages personnalisés selon le niveau
        const messages = [
            "L'obsolescence programmée a rendu ce site complètement inutilisable.",
            "Trop d'erreurs ont accumulé. Le système est devenu obsolète.",
            "Ce site a subi une dégradation fatale. Expérience terminée.",
            "L'interface s'est complètement effondrée sous le poids de l'obsolescence."
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        document.getElementById("custom-error-message").textContent = randomMessage;
    } else {
        // Sinon, afficher l'écran de fin normal
        endScreenEl.classList.remove("hidden");

        if (degradationLevel === 0) {
            document.getElementById("end-message").textContent =
                "Parfait ! Tu as réussi à garder un système en bonne santé. NIRD vise justement à maintenir un numérique fluide, durable et accessible.";
        } else if (degradationLevel >= 4) {
            document.getElementById("end-message").textContent =
                "Tu as ressenti l'obsolescence progressive : site ralenti, design cassé, expérience frustrante. NIRD propose une autre voie.";
        } else {
            document.getElementById("end-message").textContent =
                `Quelques erreurs (${degradationLevel}) ont dégradé l'expérience. NIRD agit pour limiter cette dégradation et rendre le numérique plus responsable.`;
        }
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

    // Réponses - modifier uniquement le contenu des spans, pas le bouton entier
    segments.forEach(btn => {
        const segmentText = btn.querySelector('.segment-text');
        const segmentLetter = btn.querySelector('.segment-letter');

        if (segmentText) {
            segmentText.textContent = replaceAccentsWithAt(segmentText.textContent);
        }
        if (segmentLetter) {
            segmentLetter.textContent = replaceAccentsWithAt(segmentLetter.textContent);
        }
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

    // Mettre à jour le compteur de dégradations
    const degCounterEl = document.getElementById("deg-counter");
    if (degCounterEl) {
        degCounterEl.textContent = degradationLevel;
    }

    if (degradationLevel === 0) {
        healthBarEl.style.background = "linear-gradient(to right, #22c55e, #84cc16)";
        healthTextEl.textContent = "Santé du système : 100% – expérience fluide.";
    } else if (degradationLevel <= 2) {
        healthBarEl.style.background = "linear-gradient(to right, #eab308, #f97316)";
        healthTextEl.textContent = "Santé du système : 70% – des bugs commencent à apparaître.";
    } else if (degradationLevel <= 5) {
        healthBarEl.style.background = "linear-gradient(to right, #f97316, #ef4444)";
        healthTextEl.textContent = "Santé du système : 40% – l'usage devient pénible.";
    } else {
        healthBarEl.style.background = "linear-gradient(to right, #7f1d1d, #450a0a)";
        healthTextEl.textContent = "Santé du système : 10% – l'interface frôle l'inutilisable.";
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
    // Masquer l'écran de fin
    endScreenEl.classList.add("hidden");
    // Réinitialiser le quiz
    initQuiz();
});

// Event listener pour le bouton restart depuis la page 404
if (restartFrom404Btn) {
    restartFrom404Btn.addEventListener("click", () => {
        // Masquer la page 404
        chrome404El.classList.add("hidden");
        // Réinitialiser le quiz
        initQuiz();
    });
}

// Le quiz sera initialisé au clic sur la page d'accueil
// Plus besoin de l'initialiser automatiquement
// window.addEventListener("DOMContentLoaded", initQuiz);

// ==============================
// FOND INTERACTIF AVEC GRILLE
// ==============================
const canvas = document.getElementById('interactive-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

if (canvas && ctx) {
    let mouseX = 0;
    let mouseY = 0;
    let gridPoints = [];

    // Initialiser le canvas
    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Créer les points de la grille
        gridPoints = [];
        const spacing = 60;
        const cols = Math.ceil(canvas.width / spacing) + 1;
        const rows = Math.ceil(canvas.height / spacing) + 1;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                gridPoints.push({
                    x: i * spacing,
                    y: j * spacing,
                    baseX: i * spacing,
                    baseY: j * spacing
                });
            }
        }
    }

    // Suivre la souris
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Redimensionner le canvas
    window.addEventListener('resize', initCanvas);

    // Animation du fond
    function animateBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Déplacer les points en fonction de la souris
        gridPoints.forEach(point => {
            const dx = mouseX - point.x;
            const dy = mouseY - point.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 200;

            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                point.x = point.baseX + (dx * force * 0.3);
                point.y = point.baseY + (dy * force * 0.3);
            } else {
                // Retour à la position de base
                point.x += (point.baseX - point.x) * 0.1;
                point.y += (point.baseY - point.y) * 0.1;
            }
        });

        // Dessiner les lignes de la grille
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
        ctx.lineWidth = 1;

        const spacing = 60;
        const cols = Math.ceil(canvas.width / spacing) + 1;

        // Lignes horizontales
        for (let j = 0; j < Math.ceil(canvas.height / spacing) + 1; j++) {
            ctx.beginPath();
            for (let i = 0; i < cols; i++) {
                const point = gridPoints[i * Math.ceil(canvas.height / spacing + 1) + j];
                if (point) {
                    if (i === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                }
            }
            ctx.stroke();
        }

        // Lignes verticales
        for (let i = 0; i < cols; i++) {
            ctx.beginPath();
            for (let j = 0; j < Math.ceil(canvas.height / spacing) + 1; j++) {
                const point = gridPoints[i * Math.ceil(canvas.height / spacing + 1) + j];
                if (point) {
                    if (j === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                }
            }
            ctx.stroke();
        }

        // Dessiner les points
        gridPoints.forEach(point => {
            const dx = mouseX - point.x;
            const dy = mouseY - point.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                const alpha = (100 - dist) / 100;
                ctx.fillStyle = `rgba(99, 102, 241, ${alpha * 0.4})`;
                ctx.beginPath();
                ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        requestAnimationFrame(animateBackground);
    }

    initCanvas();
    animateBackground();
}
