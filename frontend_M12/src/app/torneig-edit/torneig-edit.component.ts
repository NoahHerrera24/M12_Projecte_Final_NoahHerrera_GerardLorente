import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesTornejosService } from '../services/dades-tornejos.service';
import { DadesEquipsService } from '../services/dades-equips.service';
import { IEquip } from '../interfaces/iequip';
import { IUser } from '../interfaces/iuser';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-torneig-edit',
  standalone: false,
  templateUrl: './torneig-edit.component.html',
  styleUrls: ['./torneig-edit.component.css']
})
export class TorneigEditComponent implements OnInit {
  myForm: FormGroup;
  errorMessage: string = '';
  equips: IEquip[] = [];
  users: IUser[] = [];
  id: string | null | undefined;

  constructor(
    private torneigService: DadesTornejosService,
    private equipsService: DadesEquipsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ruta: ActivatedRoute
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.myForm = this.formBuilder.group({
      nom: [null],
      regles: [null],
      premis: [null],
      categoria: [null],
      format: [null],
      data_inici: [null],
      data_fi: [null],
      equips: [[]],
      users: [[]]
    });

    this.equipsService.getEquips().subscribe({
      next: (resp) => {
        if (resp.body) {
          this.equips = resp.body;
        }
      },
      error: (err) => {
        console.error('Error en obtenir les dades dels equips:', err);
      }
    });

    this.torneigService.getJugadors().subscribe({
      next: (resp: HttpResponse<IUser[]>) => {
        if (resp.body) {
          this.users = resp.body;
        }
      },
      error: (err: any) => {
        console.error('Error al obtener los datos de los jugadores:', err);
      }
    });

    if (this.id) {
      this.torneigService.getTorneig(this.id).subscribe({
        next: (data) => {
          this.myForm.setValue({
            nom: data.body?.nom || '',
            regles: data.body?.regles || '',
            premis: data.body?.premis || '',
            categoria: data.body?.categoria || '',
            format: data.body?.format || '',
            data_inici: data.body?.data_inici ? new Date(data.body.data_inici).toISOString().split('T')[0] : '',
            data_fi: data.body?.data_fi ? new Date(data.body.data_fi).toISOString().split('T')[0] : '',
            equips: data.body?.equips.map(equip => equip.id) || [],
            users: data.body?.jugadors.map((user: IUser) => user.id) || []
          });
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.id) {
      this.torneigService.updateTorneig(this.id, this.myForm.value).subscribe({
        next: () => {
          this.router.navigate(['/torneig-list']);
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error:', error);
        }
      });
    }
  }
}