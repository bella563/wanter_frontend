// src/app/components/user-detail/user-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtenez l'identifiant de l'utilisateur depuis les paramètres de la route
    const idParam = this.route.snapshot.paramMap.get('id');
  
    // Convertir l'identifiant en nombre seulement si idParam est défini
    const id = idParam ? +idParam : null;
  
    // Vérifiez que l'identifiant est valide (non-null et non NaN)
    if (id !== null && !isNaN(id)) {
      this.userService.getUser(id).subscribe({
        next: data => {
          this.user = data;
        },
        error: error => {
          console.error('Erreur lors de la récupération de l’utilisateur', error);
          // Optionnel : ajouter une gestion d'erreur utilisateur, comme une notification ou redirection
        }
      });
    } else {
      // Optionnel : gérer le cas où l'identifiant est invalide ou manquant
      console.error('ID de l’utilisateur invalide ou non fourni');
      // Vous pouvez rediriger l'utilisateur ou afficher un message d'erreur ici si nécessaire
    }
  }
  
}
