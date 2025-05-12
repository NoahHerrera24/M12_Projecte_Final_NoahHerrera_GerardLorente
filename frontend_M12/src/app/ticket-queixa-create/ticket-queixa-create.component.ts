import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadesTicketsQueixaService } from '../services/dades-tickets-queixa.service';


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

  constructor(
    private ticketQueixaService: DadesTicketsQueixaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      descripcio: [null, Validators.required],
      proves: [null, Validators.required],
      estat: [{ value: 'Ticket de Queixa inicialitzat', disabled: true }]
    });
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

    if (this.fotoFile) {
      formData.append('foto', this.fotoFile);
    }

    if (this.videoFile) {
      formData.append('video', this.videoFile);
    }

    this.ticketQueixaService.createTicketQueixa(formData).subscribe({
      next: () => this.router.navigate(['/ticket-queixa-list']),
      error: (error) => {
        this.errorMessage = error.message;
        console.error('Error:', error);
      }
    });
  }

}