# Briefing projet — Page profil utilisateur

## Slack de Charles (Product Owner)

> Hello ! Bon, c'est le grand jour aujourd'hui, on va s'attaquer à la nouvelle page profil utilisateur du site.
>
> Tiens, Léo (le designer) vient de me faire parvenir le lien Figma de la maquette.
>
> Et voici le kanban avec les User Stories à intégrer pour ce projet.
>
> Pour ce sprint, il faut que tu intègres les US de la partie TODO (le reste sera au sprint suivant).

---

## Mail d'Antoine (Lead Developer)

**Objet :** Précisions techniques sur la page profil  
**De :** Antoine  
**À :** Moi

> Re,
>
> Charles m'a dit qu'il t'avait briefé sur les User Stories et les maquettes, voici donc plus d'infos côté technique.
>
> L'objectif est de refaire la page profil avec React. Tu seras en charge de développer la page.

### Graphiques

- Le projet intègre des graphiques sur l'activité sportive de l'utilisateur.
- Utiliser **D3** ou **Recharts**.
- Attention à D3 : puissant mais parfois difficile à prendre en main.

### Intégration CSS

- Se concentrer sur la partie **desktop** uniquement.
- Pas de version mobile et tablette pour l'instant (prévu dans un second temps).
- Le projet doit être lisible sur les écrans d'au moins **1024 × 780 pixels**.

### Données et API

- Un backend Node.js a été créé pour réaliser les calls HTTP et récupérer des données d'exemple.
- Tout y est décrit : installation et calls HTTP mis en place.
- Utiliser **Fetch** ou **Axios** pour les appels.
- **Important :** réaliser les calls **en dehors des composants React** — créer un service dédié.

### Méthodologie de développement

1. **Commencer par un mock** des données de l'API.
2. Une fois le projet fonctionnel, intégrer l'API réelle.
3. **Attention :** le schéma de données varie légèrement selon les utilisateurs — penser à **standardiser et formatter** les données avant utilisation.

### Documentation

- Si possible, documenter le projet (README, JSDoc ou autre support pertinent) pour faciliter la collaboration.

> Allez, je te souhaite un bon développement !
>
> Antoine
