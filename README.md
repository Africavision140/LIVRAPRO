# LivraPro

Dépôt : `Africavision140/LIVRAPRO` — tout tient ici, un seul dépôt.

## Fichiers, tous à la racine — aucun dossier

```
index.html                 ← toute l'application (agence + boutique + livreur + suivi)
boutique.html              ← ouvre le portail boutique
l.html                     ← ouvre l'espace livreur (lien personnel)
livreur.html               ← même chose, nom long
s.html                     ← ouvre le suivi public d'un colis (lien court)
suivi.html                 ← même chose, nom long
app.html                   ← point d'entrée de l'application (choix du profil)
sw.js                      ← service worker : cache hors ligne
manifest.json              ← l'unique application installable
icon-192.png               ← icônes de l'application
icon-512.png
icon-maskable-512.png
apple-touch-icon.png
```

`app.html`, `boutique.html`, `l.html`, `s.html` et `suivi.html` font trois lignes : ils renvoient vers
`index.html`. **Une seule application à mettre à jour**, celle de `index.html`.

## Les liens

| Lien | Pour qui |
|---|---|
| `https://livrapro.app` | **accueil** : les trois portes |
| `https://livrapro.app/?agence` | l'agence, directement |
| `https://livrapro.app/app.html` | **l'application** : boutiques et livreurs |
| `https://livrapro.app/boutique.html` | les boutiques partenaires (lien direct) |
| `https://livrapro.app/l.html#<jeton>` | un livreur (lien personnel) |
| `https://livrapro.app/s.html#260907005` | le destinataire d'un colis |

Le lien de suivi est produit par le bouton **🔗** sur chaque ligne de livraison, et par la
boutique elle-même depuis son portail. La clé après le `#` est la référence sans le préfixe
ni les tirets : `LP-260907-005` devient `260907005`.

Le champ de recherche du suivi accepte les deux formes, avec ou sans tirets, majuscules ou
minuscules, ainsi que le numéro de téléphone du destinataire.

## Espace livreur

Chaque livreur a un lien personnel, contenant un jeton unique, plus un **code à 4 chiffres**.
Le bouton **🔗 Lien livreur** sur sa fiche donne les deux, prêts à envoyer par WhatsApp.
Par défaut le code correspond aux quatre derniers chiffres de son téléphone ; il se change
dans la fiche du livreur.

Le code n'est demandé qu'à la première ouverture sur un appareil, puis mémorisé.

Si le lien est perdu, tronqué ou mal collé, le livreur peut aussi ouvrir simplement
`https://livrapro.app/l.html` et entrer **son numéro de téléphone
et son code**. Le lien personnel n'est donc qu'un raccourci, jamais une obligation.

Ce que le livreur voit, et rien d'autre :

- ses courses à lui, jamais celles des autres
- pour chaque course : la boutique où retirer le colis, son adresse et son téléphone,
  puis le destinataire, son adresse et son téléphone
- le montant exact à encaisser : frais de livraison si c'est le destinataire qui paie,
  plus le contre-remboursement dû à la boutique
- un bouton d'appel direct et un bouton d'itinéraire vers Google Maps
- deux boutons d'action : **Colis récupéré**, puis **Colis livré**

Chaque action met le suivi à jour instantanément pour l'agence, la boutique et le destinataire.
Le livreur peut aussi se mettre en pause, ce qui le retire des livreurs disponibles.

### Photo et badge

La fiche du livreur accepte une **photo d'identité** : sur téléphone, le bouton ouvre
directement l'appareil photo. L'image est recadrée en carré et réduite à 320 px avant
enregistrement, pour ne pas alourdir la base.

La photo apparaît ensuite sur sa fiche, dans la liste du tableau de bord, dans l'en-tête de
son espace, et sur le suivi public — le destinataire voit donc à qui il remet ou de qui il
reçoit le colis.

Le bouton **🪪 Badge** ouvre un aperçu de la carte au format bancaire (85,6 × 54 mm) :
photo, nom, mention Livreur, téléphone, véhicule, immatriculation et matricule. Trois
sorties possibles :

- **Télécharger PNG** : image à 300 ppp, prête à envoyer par WhatsApp ou à confier à un imprimeur.
- **Partager** : partage natif du téléphone, quand il est disponible.
- **Imprimer** : impression directe depuis le navigateur.

Le code d'accès à 4 chiffres ne figure pas sur le badge, volontairement — un badge se perd
ou se photographie.

### Sur les notifications

La page vérifie les nouvelles affectations toutes les 15 secondes et affiche une notification
système, **tant que l'onglet reste ouvert**. Une vraie notification push, téléphone en veille
et application fermée, demanderait un serveur d'envoi : ce n'est pas possible avec un site
statique sur GitHub Pages. En pratique, prévenez le livreur par WhatsApp et laissez-le garder
la page ouverte pendant son service.

## Logo

Le logo est embarqué dans `index.html`, en WebP détouré sur fond transparent. Deux variantes,
écrites **une seule fois chacune** dans le CSS (`.asset-logo` et `.asset-mark`) :

- **logo complet** (500 px) : écrans de connexion des trois espaces, bon de livraison
- **emblème seul** (200 px) : barre latérale, en-têtes des portails, badge, favicon

Le JavaScript relit ces deux images depuis les règles CSS au démarrage, pour les réutiliser
dans les fenêtres d'impression et sur le badge sans stocker de copie supplémentaire.

Pour changer de logo, remplacez les deux `url(...)` de ces règles par vos propres images
encodées en base64. L'emblème est posé sur une pastille blanche partout où le fond est
sombre, sinon le bleu marine du globe disparaîtrait.

## Raccourcir davantage

L'essentiel de la longueur vient du nom du dépôt. Le renommer dans `Settings` → `Repository name`
raccourcit tous les liens d'un coup : `LIVRAPRO` → `av` donne
`https://africavision140.github.io/av/s.html#260907005`.

Attention : les liens déjà envoyés cessent alors de fonctionner. À faire maintenant, ou jamais.

## L'accueil : une adresse, trois portes

`https://livrapro.app` n'ouvre plus directement l'agence : il présente trois boutons —
**L'agence**, **Une boutique**, **Un livreur** — chacun menant à son propre écran de
connexion. Une seule adresse à retenir et à imprimer.

Cet accueil ne mémorise jamais rien : il montre toujours les trois portes, même si vous
avez déjà choisi un espace auparavant. Les adresses directes restent valables et évitent
le clic : `?agence`, `boutique.html`, `l.html#jeton`, `s.html#référence`.

## Installation sur l'écran d'accueil

**Une seule application** réunit les boutiques et les livreurs. Elle démarre sur `app.html`,
qui demande « Vous êtes une boutique ? un livreur ? ». Le choix est mémorisé : aux
lancements suivants, l'application ouvre directement sur le bon espace. Un bouton
**Changer de profil** dans l'en-tête permet d'y revenir.

C'est ce lien unique qui servira pour Google Play et l'App Store : une application, deux
publics.

Deux raccourcis contournent le choix : le **lien personnel d'un livreur**
(`l.html#jeton`) ouvre directement ses courses, et `boutique.html` ouvre directement
l'espace boutique.

L'espace agence reste un simple lien web : il ne propose pas l'installation, pour ne pas
créer une seconde application dans les stores. Il bénéficie quand même du cache hors ligne.

Un bouton **📲 Installer** apparaît dans l'en-tête quand le navigateur le permet. Sur iPhone,
Safari n'expose aucun bouton : le même bouton affiche alors la marche à suivre
(Partager → Sur l'écran d'accueil).

### Mise à jour et cache

`sw.js` garde en cache les pages et les icônes. La stratégie est « réseau d'abord » : une
nouvelle version de `index.html` arrive dès la prochaine ouverture avec du réseau, et le
cache ne sert que hors connexion. Incrémentez tout de même `VERSION` en tête de `sw.js` à
chaque modification de `index.html`, pour purger proprement les anciens fichiers.

Les appels à Firestore ne sont jamais interceptés : les données restent toujours fraîches.

### Ce que l'installation ne débloque pas

Les notifications **application complètement fermée** restent impossibles : elles exigent un
serveur d'envoi, ce qu'un site statique ne peut pas fournir. Application ouverte ou en
arrière-plan, elles fonctionnent comme avant, avec une vérification toutes les 15 secondes.

## Le circuit

1. L'agence crée la boutique dans l'onglet **Boutiques** : nom, contact, adresse
   d'enlèvement. Le code `BTQ-1234` est généré, le mot de passe est choisi par l'agence.
2. La boutique reçoit le lien du portail et son code.
3. Elle remplit **Nouvelle expédition** : destinataire, adresse, contenu, qui paie les
   frais, montant éventuel à encaisser pour elle.
4. La demande arrive côté agence en **En attente**, avec notification. L'agence assigne un
   livreur et fait avancer la course.
5. Boutique et destinataire suivent l'avancement en direct, chacun sur son lien.

## Base partagée

En haut du bloc `<script>` de `index.html` :

```js
const CLOUD = {
  projectId: 'africa-vision-3b38f',   // '' pour rester 100 % local
  prefix: 'livrapro_'
};
```

Collections : `livrapro_orders`, `livrapro_riders`, `livrapro_clients`. Un enregistrement
par document, dans un champ texte JSON. Envoi immédiat après chaque modification, relecture
toutes les 15 secondes. En cas de coupure, la pastille passe en **Hors ligne**, l'application
continue en local et repart à la reconnexion. Ajouter `?local` à l'URL force le mode local.

## Sécurité à traiter avant la mise en service

La règle Firestore `allow read, write: if true` laisse la base ouverte à qui connaît le nom
du projet. Le portail boutique étant public, cette règle doit être resserrée avant d'y mettre
de vraies courses. Les mots de passe sont stockés hachés en SHA-256.

## Comptes de démonstration

| Compte | Identifiant | Mot de passe |
|---|---|---|
| Agence | `admin` | `admin123` |
| Boutique Nabaya | `BTQ-1001` | `boutique123` |
| Kipé Cosmétiques | `BTQ-1002` | `boutique123` |
| Livreurs | lien personnel | 4 derniers chiffres du téléphone |

## Réglages du tarif

| Constante | Rôle | Valeur |
|---|---|---|
| `TARIF_BASE` | frais de base | `15000` GNF |
| `TARIF_KM` | prix au kilomètre | `3000` GNF |
| `VITESSE` | vitesse moyenne retenue | `18` km/h |
| `RATE_EUR` | taux GNF → EUR | `10000` |
