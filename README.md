# Sujet
# Sujet 02

Créez une calculatrice avec mémoire en suivant le modèle ci-dessous. La calculatrice apparaîtra sur la page principale :

```text

    [Home] [Memory] <-- La navigation

    Number1 : []
    Number2 : []

    button Add
    button Mult
    button Reset

[Resultat] <-- Affichez le résultat
```

La page memory affichera l'ensemble des calculs effectués par l'utilisateur. Dans cette sauvegarde vous devez noter la date,l'opérateur utilisé et le résultat. Ces résultats seront consultables sur la page Memory.

```text

    [Home] [Memory] <-- La navigation
    
    - date 17/12/2021 56 operateur : +
    - date 12/12/2021 120 operateur : *
    - date 11/12/2021 0 operateur : -

```

## Contraintes

Utiliez Node.js ainsi que ejs pour la gestion du templating. Organisez l'application au minimun comme suit :

```text

app/
    assets/
        css/
            style.css <-- styles perso
            bootstrap.min.css (optionnelle)
        favicon.ico
    views/
        home.html 
        memory.html. <- ejs pour insérer les données mémorisées.
    package.json
    app.js   <- instanciation du serveur Node.js
    server.js <- la logique métier pour servir les pages.
```
