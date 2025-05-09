import { Component, OnInit } from '@angular/core';
import { IEquip } from '../interfaces/iequip';
import { DadesEquipsService } from '../services/dades-equips.service';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/iuser';

@Component({
  selector: 'app-equip-list',
  standalone: false,
  templateUrl: './equip-list.component.html',
  styleUrls: ['./equip-list.component.css']
})
export class EquipListComponent implements OnInit {
  titolLlistat: string = 'Llistat d’equips';
  listFilter: string = '';
  equips: IEquip[] = [];
  isLoggedIn: boolean = false;
  user: IUser | null = null;

  constructor(private equipsService: DadesEquipsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadEquips();

    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  loadEquips(): void {
    this.equipsService.getEquips().subscribe({
      next: (resp) => {
        if (resp.body) {
          this.equips = resp.body;
        }
      },
      error: (err) => {
        console.error('Error al obtenir equips', err);
      }
    });
  }

  joinEquip(equipId: number): void {
    if (!this.isLoggedIn || this.user?.role !== 'participant') {
      console.error('Només els usuaris participants poden unir-se a un equip.');
      return;
    }
  
    const userId = this.user?.id;
  
    this.equipsService.joinEquip(equipId, userId!).subscribe({
      next: (response) => {
        console.log('Unit a l\'equip amb èxit:', response.message);
        alert('Unit a l\'equip amb èxit!');
  
        if (this.user) {
          this.user.equip = this.equips.find(e => e.id === equipId)!;
          this.authService.setUser(this.user);
        }
      },
      error: (err) => {
        console.error('Error a l\'unir-se a l\'equip:', err.error?.error || err.message);
        alert(err.error?.error || 'Error a l\'unir-se a l\'equip.');
      }
    });
  }
  
  leaveEquip(equipId: number): void {
    if (!this.isLoggedIn || !this.user) return;
  
    this.equipsService.leaveEquip(equipId, this.user.id).subscribe({
      next: (resp) => {
        console.log(resp.message);
        alert(resp.message);
  
        if (this.user) {
          this.user.equip = null;  
          this.authService.setUser(this.user);  
        }
  
        this.loadEquips(); 
      },
      error: (err) => {
        console.error(err.error?.error || err.message);
        alert(err.error?.error || 'Error al sortir de l\'equip.');
      }
    });
  }
   
  deleteEquip(id: number): void {
    this.equipsService.deleteEquip(id).subscribe({
      next: () => {
        this.loadEquips();
      },
      error: (err) => {
        console.error('Error al eliminar l\'equip', err);
      }
    });
  }
}