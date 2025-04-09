import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesTicketsQueixaService } from '../services/dades-tickets-queixa.service';

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
  videoFile: File | null = null;
  videoPreview: string | null = null;

  constructor(
    private ticketQueixaService: DadesTicketsQueixaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ruta: ActivatedRoute
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.myForm = this.formBuilder.group({
      descripcio: [null],
      estat: [{ value: '', disabled: true }],
      foto: [null],
      video: [null],
    });
  
    if (this.id) {
      this.ticketQueixaService.getTicketQueixa(this.id).subscribe({
        next: (data) => {
          this.fotoActual = data.body?.foto || '';
          this.myForm.patchValue({
            descripcio: data.body?.descripcio || '',
            estat: data.body?.estat || '',
            foto: this.fotoActual,
            video: data.body?.video || '',
          });
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error:', error);
        }
      });
    }
  }

  onFotoChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log('Archivo seleccionado:', this.selectedFile); 

      if (this.selectedFile) {
        this.myForm.patchValue({ foto: this.selectedFile.name });
      }
    }
  }

  onVideoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.videoFile = file;
      this.videoPreview = URL.createObjectURL(file);
    }
  }

  onSubmit(): void {
    if (this.id) {
      const formData = new FormData();
      formData.append('descripcio', this.myForm.get('descripcio')?.value);
      formData.append('estat', this.myForm.get('estat')?.value);

      if (this.selectedFile) {
        formData.append('foto', this.selectedFile);
      } else {
        formData.append('foto', this.fotoActual);
      }

      if (this.videoFile) {
        formData.append('video', this.videoFile);
      } else {
        formData.append('video', this.myForm.get('video')?.value || '');
      }

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      } 
  
      this.ticketQueixaService.updateTicketQueixa(this.id, formData).subscribe({
        next: () => {
          this.ticketQueixaService.getTicketQueixa(this.id).subscribe({
            next: (data) => {
              this.fotoActual = data.body?.foto || '';
              console.log('Imagen actualizada:', this.fotoActual);
              this.router.navigate(['/ticket-queixa-list']); 
            },
            error: (error) => {
              console.error('Error al obtener los datos actualizados del ticket de queja:', error);
            }
          });
        },
        error: (error) => {
          this.errorMessage = 'Error en actualitzar el Ticket de Queixa. Si us plau, torna-ho a intentar.';
          console.error('Error en actualitzar el Ticket de Queixa:', error);
        }
      });

    }
  }

}