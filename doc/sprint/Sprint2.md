# Sprint 2 : 10 décembre - 21 décembre

## US

| ID | US | Difficulté | Priorité |
|:--:|:--:|:----------:|:--------:|
|3| En tant qu'utilisateur je souhaite ajouter un arrêt, cela correspond à un arrêt de tram ou un arrêt de bus afin de visualiser les horaires en temps réels. Les informations arrêts qui ne sont pas des trajets ne seront pas sur la même ligne. L'information des horaires en temps réels seront situé en dessous  de l'arrêt, il y aura seulement 2 horaires de temps réel. |3|HAUTE|
|8| En tant qu'utilisateur je souhaite pouvoir ajouter des trajets, c'est à dire plusieurs arrêts. Les arrêts d'un même trajet sont affichés en une ligne. L'information des horaires en temps réels seront situé en dessous  de l'arrêt, il y aura seulement 2 horaires de temps réel. |3|HAUTE|
|4| En tant qu'utilisateur, au moment d'ajouter un arrêt, si cet arrêt est commun à un tram et un bus je souhaite pouvoir choisir soit le tram soit le bus |2|MOYENNE|
|TOTAL|-----|8|----|

## Tâches 

| Id | Description | Issue affiliée | Dépendances | Affectation | Statut |
|:---:|:---:|:---:|:---:|:---:|:---:|
|T2i| Intégrer travis au projet afin d'automatiser les tests e2e et les tests d'intégration.|N/A|N/A|François| EN COURS|
|T3d| Créer le composant angular 'trajet' qui s'occupera de gérer les trajets. La page des trajets inclura un bouton '+' permettant l'ajout de trajet en sélectionnant des arrêts, les arrêts des trajets s'affiche sur la même ligne. |3|N/A|  | A FAIRE|
|T3.1i|Implémenter T3d, la tâche est fini lorsque tout ce qui est décrit est implémenter, et que les arrêts possibles sont récupérer via notre serveur.|3|T3d|  | A FAIRE |
|T3.2i| Ajouter l'information des horaires temps réels aux trajets, seulement deux horaires temps réel s'afficheront en dessous par arrêt du trajet, les horaires temps réels sont récupérer via l'api rest de open data.|3|T3d, T3.1i|  | A FAIRE|
|T4.1i| Implémenter la tâche T4d définit durant le sprint 1, la tâche est fini lorsque les arrêts sont listés et le choix des arrêts possible sont récupérer en utilisant l'API de notre serveur.| 8 | T4d | Antonin | EN COURS |
|T4.2i| Ajouter aux arrêts les horaires temps réels récupérer en utilisant l'api rest, les horaires apparaîtront à droite des arrêts concerné. La tâches est considérée comme faite lorsque les horaires s'affichent bien à droite de l'arrêt concerné et que les horaires temps réels sont bien récuperer via l'api open data.| 8 |T4d, T4.1i | | A FAIRE |
| T5.i | Ajouter la possibilité de choisir les horaires d'un arrêt tram ou d'un arrêt bus, si l'arrêt en question est commun au deux type d'arrêt. Ce choix est fait au moment d'ajouter l'arrêt. Cela s'intégre au même endroit que le choix des arrêts. | 4 | T4d, T4.1i |  | A FAIRE |