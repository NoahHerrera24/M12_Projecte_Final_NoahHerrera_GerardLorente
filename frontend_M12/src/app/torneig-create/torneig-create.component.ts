import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DadesTornejosService } from '../services/dades-tornejos.service';
import { DadesEquipsService } from '../services/dades-equips.service';
import { IEquip } from '../interfaces/iequip';
import { IUser } from '../interfaces/iuser';

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

  constructor(
    private torneigService: DadesTornejosService,
    private equipsService: DadesEquipsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.myForm = new FormGroup({
      // Defineix els controls del formulari aquí
    });
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      nom: [null],
      regles: [null],
      premis: [null],
      categoria: [null],
      format: [null],
      data_inici: [null],
      data_fi: [null],
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
      next: (resp) => {
        if (resp.body) {
          this.users = resp.body;
        }
      },
      error: (error) => {
        console.error('Error fetching jugadors', error);
      }
    });
  }

  onSubmit(torneig: any) {
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