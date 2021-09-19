# Boardverse - MOBG5

2019 - 2020 | JLC | 44422

## Présentation

**Nom :** Boardverse

**Description :** Boadrverse est une application pour gérer ses jeux de société (d'où le nom "Board", de l'anglais "board game", et "verse", contraction de "universe").

**Objectif :** L'objectif étant, à la base, d'ajouter ses amis, collègues ou membres de le famille sur la plateforme et de voir qui aime quel jeu, qui a déjà joué à quoi et ainsi de prévoir une journée / après-midi / soirée jeux de société. Cela permet aussi de découvrir de nouveaux jeux et de retenir quel jeu auquel on a apprécié jouer ou non.

**Fonctionnalités :** Elle permettra, après inscription :

* de rechercher et de voir les toutes informations d'un jeu de société, comme
  * son nom ✔️
  * son éditeur ✔️
  * sa date de parution ✔️
  * une description ✔️
  * une liste des languages dans lequel le jeu est disponible
  * le nombre de joueurs ✔️
  * le temps d'une partie ✔️
  * l'age recommandé ✔️
  * des photos du jeu ✔️
  * les récompenses reçues par le jeu
  * les catégories dont le jeu fait partie
  * les types dont le jeu fait partie
  * une moyenne des scores donnés par les utilisateurs
  * une liste d'amis
  ** possédant le jeu
  ** ayant déjà joué au jeu
  ** qui ont ce jeu dans leur liste de souhaits
  * une liste de jeux du même type ✔️
  * une liste de jeux dans la même catégorie ✔️
  * une liste de jeux joués par les joueurs de ce jeu ✔️
  * une liste de jeux du même éditeur ✔️
* de voir un éditeur de jeux de société, dont
  * leurs jeux
  * leur note moyenne (moyenne des notes de tous leurs jeux)
  * leur activité (nouvelles parutions)
* d'ajouter (et de supprimer) des jeux de société à sa collection (liste des jeux possédés)
* d'ajouter (et de supprimer) des jeux de société à une liste de jeux auxquels on a déjà joué
* d'ajouter (et de supprimer) des jeux de société à une liste de jeux qu'on souhaite acheter (wishlist)
* de donner une note (sous forme d'étoiles, de 1 à 5) à un jeu qu'on possède ou auquel on a déjà joué
* de rechercher un utilisateur et consulter son profil (ou son profil à sois), dont
  * voir son nom
  * voir son image de profil
  * voir ajouter la personne en ami
  * voir les jeux possédés
  * voir les jeux auquel l'utilisateur a déjà joué
  * voir les jeux que l'utilisateur souhaite acheter
  * voir une liste des notes sur des jeux faites par l'utilisateur
  * voir une liste des achèvements de l'utilisateur (sorte de progression)
  * voir leur activité (ajout d'un ami, acquisition d'un jeu, ajout d'un jeu à sa wishlist, ajout d'un jeu à la liste des jeux joués, note d'un jeu, achèvent acquis)
* scanner le code bar d'un jeu et accéder à sa page
* voir l'activité des

**Détails techniques :**

* L'application utilisera l'architecture Model-View-ViewModel
* Les données seront obtenues à partir d'API RESTful
* Utilisation de composants réutilisables (fragments) pour éviter le code dupliqué
* Utilisation de plusieurs thèmes
* Support de plusieurs tailles d'écran (responsive design)
* Utilisation de la caméra pour scanner le code-bare d'un jeu

**Problématiques :**

* Les requêtes vers l'API, de façon synchrone, bloquent la vue tant que la requête n'est pas finie.
* L'application ne sera pas disponible hors-ligne

## Activités

* Page de connexion
* Page d'accueil
* Page d'un jeu
* Page d'un éditeur de jeu
* Page d'un utilisateur
* Page contenant une liste (vue étendu d'un carousel)
* Page de recherche
* (Page d'activités)
* (Page de succès / achievements)
