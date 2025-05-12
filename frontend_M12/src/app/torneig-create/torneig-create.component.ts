import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { DadesTornejosService } from '../services/dades-tornejos.service';
import { DadesEquipsService } from '../services/dades-equips.service';
import { IEquip } from '../interfaces/iequip';
import { IUser } from '../interfaces/iuser';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-torneig-create',
  standalone: false,
  templateUrl: './torneig-create.component.html',
  styleUrl: './torneig-create.component.css'
})
export class TorneigCreateComponent implements OnInit {
  myForm: FormGroup;
  errorMessage: string = '';
  equips: IEquip[] = [];
  users: IUser[] = [];
  selectedEquips: number[] = [];
  selectedUsers: number[] = [];

  constructor(
    private torneigService: DadesTornejosService,
    private equipsService: DadesEquipsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.myForm = new FormGroup({
    });
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      nom: [null, Validators.required],
      regles: [null, Validators.required],
      premis: [null, Validators.required],
      categoria: [null, Validators.required],
      format: [null, Validators.required],
      data_inici: [null, Validators.required],
      data_fi: [null, Validators.required],
      equips: [[]],
      jugadors: [[]]
    });

    this.equipsService.getEquips().subscribe({
      next: (resp) => {
        if (resp.body) {
          this.equips = resp.body;
        }
      },
      error: (error) => {
        console.error('Error fetching equips', error);
      }
    });

    this.torneigService.getJugadors().subscribe({
      next: (resp: HttpResponse<IUser[]>) => {
        if (resp.body) {
          this.users = resp.body;
        }
      },
      error: (error: any) => {
        console.error('Error al obtindre els jugadors', error);
      }
    });
  }
  
  onUserToggle(userId: number, isChecked: boolean) {
    if (isChecked) {
      this.selectedUsers.push(userId);
    } else {
      this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
    }
  }

  onSubmit(torneig: any) {
    if (this.myForm.invalid) {
      this.errorMessage = 'Si us plau, completa tots els camps obligatoris.';
      return;
    }
    torneig.equips = this.selectedEquips;
    torneig.jugadors = this.selectedUsers;
  
    this.torneigService.createTorneig(torneig).subscribe({
      next: () => {
        this.router.navigate(['/torneig-list']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }  

}