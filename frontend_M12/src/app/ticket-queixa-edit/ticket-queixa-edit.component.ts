import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesTicketsQueixaService } from '../services/dades-tickets-queixa.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ticket-queixa-edit',
  standalone: false,
  templateUrl: './ticket-queixa-edit.component.html',
  styleUrl: './ticket-queixa-edit.component.css',
})
export class TicketQueixaEditComponent implements OnInit {
  myForm: FormGroup;
  errorMessage: string = '';
  id: string | null | undefined;
  selectedFile: File | null = null;
  fotoActual: string = '';
  fotoFile: File | null = null;
  videoFile: File | null = null;
  videoActual: string = '';
  videoPreview: string | null = null;
  tornejos: any[] = [];
  users: any[] = [];
  selectedUserId: string = '';
  user: any = null;

  constructor(
    private ticketQueixaService: DadesTicketsQueixaService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ruta: ActivatedRoute
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.myForm = this.formBuilder.group({
      descripcio: [null, [Validators.required, Validators.maxLength(30)]],
      estat: [{ value: '', disabled: true }],
      foto: [null],
      video: [null],
      torneig_id: [''],
      culpable_id: ['']
    });

    if (this.id) {
      this.ticketQueixaService.getTicketQueixa(this.id).subscribe({
        next: (data) => {
          this.fotoActual = data.body?.foto || '';
          this.videoActual = data.body?.video || '';
          this.myForm.patchValue({
            descripcio: data.body?.descripcio || '',
            estat: data.body?.estat || '',
            foto: this.fotoActual,
            video: this.videoActual,
            torneig_id: data.body?.torneig_id || ''
          });
          if (data.body?.torneig_id) {
            this.ticketQueixaService.getParticipantsByTorneig(data.body.torneig_id, this.user.id).subscribe({
              next: (res) => {
                this.users = res.body;
                this.myForm.patchValue({
                  culpable_id: data.body?.culpable_id || ''
                });
              },
              error: (err) => console.error(err)
            });
          }
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error:', error);
        },
      });
    }

    this.ticketQueixaService.getTornejosByUser(this.user.id).subscribe({
      next: (res) => this.tornejos = res.body,
      error: (err) => console.error(err)
    });
  }

  onTournamentChange(event: any): void {
    const torneigId = event.target.value;
    if (torneigId) {
      this.ticketQueixaService.getParticipantsByTorneig(torneigId, this.user.id).subscribe({
        next: (res) => {
          this.users = res.body;
          this.myForm.patchValue({
            culpable_id: ''
          });
        },
        error: (err) => console.error(err)
      });
    } else {
      this.users = [];
      this.myForm.patchValue({
        culpable_id: ''
      });
    }
  } 

  onFotoChange(event: any): void {
    if (event.target.files.length > 0) {
      this.fotoFile = event.target.files[0];
      console.log('Archivo de foto seleccionado:', this.fotoFile);

      if (this.fotoFile) {
        this.myForm.patchValue({ foto: this.fotoFile.name });
      }
    }
  }

  onVideoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.videoFile = file;
      this.videoPreview = URL.createObjectURL(file);
      console.log('Archivo de video seleccionado:', this.videoFile);
    }
  }

  onSubmit(): void {

    if (!this.myForm.valid) {
      this.errorMessage = 'Si us plau, completa tots els camps obligatoris.';
      return;
    }

    if (!this.fotoFile && !this.videoFile) {
      this.errorMessage = 'Has de pujar almenys una imatge o un vídeo.';
      return;
    }

    if (this.id) {
      const formData = new FormData();
      formData.append('descripcio', this.myForm.get('descripcio')?.value);
      formData.append('estat', this.myForm.get('estat')?.value);
      formData.append('torneig_id', this.myForm.get('torneig_id')?.value);
      formData.append('culpable_id', this.myForm.get('culpable_id')?.value);

      if (this.fotoFile) {
        formData.append('foto', this.fotoFile);
      } else {
        formData.append('foto', this.fotoActual);
      }

      if (this.videoFile) {
        formData.append('video', this.videoFile);
      } else {
        formData.append('video', this.videoActual);
      }

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      this.ticketQueixaService.updateTicketQueixa(this.id, formData).subscribe({
        next: () => {
          this.ticketQueixaService.getTicketQueixa(this.id).subscribe({
            next: (data) => {
              this.fotoActual = data.body?.foto || '';
              this.videoActual = data.body?.video || '';
              console.log('Datos actualizados:', this.fotoActual, this.videoActual);
              this.router.navigate(['/ticket-queixa-list']);
            },
            error: (error) => {
              console.error(
                'Error al obtener los datos actualizados del ticket de queja:',
                error
              );
            },
          });
        },
        error: (error) => {
          this.errorMessage =
            'Error en actualitzar el Ticket de Queixa. Si us plau, torna-ho a intentar.';
          console.error('Error en actualitzar el Ticket de Queixa:', error);
        },
      });
    }
  }
}