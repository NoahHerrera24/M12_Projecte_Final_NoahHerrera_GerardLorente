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
  filePreviews: string[] = [];
  selectedFiles: File[] = [];

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
      proves: [null],
      estat: [{ value: '', disabled: true }]
    });

    if (this.id) {
      this.ticketQueixaService.getTicketQueixa(this.id).subscribe({
        next: (data) => {
          const proves: string[] = Array.isArray(data.body?.proves) ? data.body?.proves : JSON.parse(data.body?.proves || '[]');
          this.myForm.patchValue({
            descripcio: data.body?.descripcio || '',
            estat: data.body?.estat || ''
          });
          this.filePreviews = proves.map(prova => `/assets/uploads/${prova}`);
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error:', error);
        }
      });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    const newFiles = Array.from(input.files);
    this.selectedFiles = [...this.selectedFiles, ...newFiles];

    // Generar previsualizaciones solo para los nuevos archivos
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    this.filePreviews = [...this.filePreviews, ...newPreviews];
  }

  isImage(fileUrl: string): boolean {
    return fileUrl.match(/\.(jpeg|jpg|gif|png)$/i) !== null;
  }

  isVideo(fileUrl: string): boolean {
    return fileUrl.match(/\.(mp4|webm|ogg)$/i) !== null;
  }

  isPdf(fileUrl: string): boolean {
    return fileUrl.toLowerCase().endsWith('.pdf');
  }

  onSubmit(): void {
    if (this.id) {
      const formData = new FormData();
      formData.append('descripcio', this.myForm.get('descripcio')?.value);
      formData.append('estat', this.myForm.get('estat')?.value);

      // Agregar archivos existentes
      this.filePreviews.forEach(preview => {
        const fileName = preview.split('/').pop(); // Obtén el nombre del archivo
        if (!this.selectedFiles.some(file => file.name === fileName)) {
          formData.append('existingProves[]', fileName || ''); // Envía solo el nombre del archivo existente
        }
      });

      // Agregar archivos nuevos
      this.selectedFiles.forEach(file => {
        formData.append('proves[]', file);
      });

      this.ticketQueixaService.updateTicketQueixa(this.id, formData).subscribe({
        next: () => {
          this.router.navigate(['/ticket-queixa-list']);
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error:', error);
        }
      });
    }
  }

}