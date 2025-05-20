import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadesTicketsQueixaService } from '../services/dades-tickets-queixa.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ticket-queixa-create',
  standalone: false,
  templateUrl: './ticket-queixa-create.component.html',
  styleUrl: './ticket-queixa-create.component.css',
})
export class TicketQueixaCreateComponent implements OnInit {

  myForm: FormGroup;
  errorMessage: string = '';
  filePreviews: string[] = [];
  selectedFiles: File[] = [];
  fotoFile?: File;
  videoFile?: File;
  fotoPreview?: string;
  videoPreview?: string;
  user: any = null;
  tornejos: any[] = [];
  users: any[] = [];
  selectedUserId: string = '';

  constructor(
    private ticketQueixaService: DadesTicketsQueixaService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadTornejos();
    this.myForm = this.formBuilder.group({
      descripcio: [null, [Validators.required, Validators.maxLength(30)]],
      estat: [{ value: 'Ticket de Queixa inicialitzat', disabled: true }],
      torneig_id: ['', Validators.required],
      usuari_destinatari_id: ['', Validators.required]
    });
  }

  loadTornejos(): void {
    this.ticketQueixaService.getTornejosByUser(this.user.id).subscribe({
      next: (res) => this.tornejos = res.body,
      error: (err) => console.error('Error carregant tornejos', err)
    });
  }

  onTournamentChange(event: any): void {
    const torneigId = event.target.value;
    console.log('Torneig seleccionat:', torneigId);
    console.log('User ID:', this.user.id);
    if (torneigId) {
      this.ticketQueixaService.getParticipantsByTorneig(torneigId, this.user.id).subscribe({
        next: (res) => {
          console.log('Participants rebuts:', res.body);
          this.users = res.body || [];
        },
        error: (err) => console.error(err)
      });
    } else {
      this.users = [];
      this.myForm.patchValue({ usuari_destinatari_id: '' });
    }
  }

  onFotoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fotoFile = file;
      this.fotoPreview = URL.createObjectURL(file);
    }
  }

  onVideoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.videoFile = file;
      this.videoPreview = URL.createObjectURL(file);
    }
  }

  isImage(fileUrl: string): boolean {
    return fileUrl.match(/\.(jpeg|jpg|gif|png)$/i) !== null;
  }

  isVideo(fileUrl: string): boolean {
    return fileUrl.match(/\.(mp4|webm|ogg)$/i) !== null;
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.errorMessage = 'Si us plau, completa tots els camps obligatoris.';
      return;
    }
    if (!this.fotoFile && !this.videoFile) {
      this.errorMessage = 'Has de pujar almenys una imatge o un vídeo.';
      return;
    }

    const formData = new FormData();
    formData.append('descripcio', this.myForm.get('descripcio')?.value);
    formData.append('estat', 'Ticket de Queixa inicialitzat');
    formData.append('user_id', this.user.id);
    formData.append('torneig_id', this.myForm.get('torneig_id')?.value);
    formData.append('culpable_id', this.myForm.get('usuari_destinatari_id')?.value);
  
    if (this.fotoFile) formData.append('foto', this.fotoFile);
    if (this.videoFile) formData.append('video', this.videoFile);
  
    this.ticketQueixaService.createTicketQueixa(formData).subscribe({
      next: () => this.router.navigate(['/ticket-queixa-list']),
      error: (error) => {
        this.errorMessage = error.message;
        console.error('Error:', error);
      }
    });
  }

}