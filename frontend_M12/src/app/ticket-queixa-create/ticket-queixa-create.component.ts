import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(
    private ticketQueixaService: DadesTicketsQueixaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      descripcio: [null],
      proves: [null],
      estat: [{ value: 'Ticket de Queixa inicialitzat', disabled: true }]
    });
  }

  onFileChange(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    this.filePreviews = this.selectedFiles.map(file => URL.createObjectURL(file));
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
    const formData = new FormData();
    formData.append('descripcio', this.myForm.get('descripcio')?.value);
    formData.append('estat', 'Ticket de Queixa inicialitzat');

    this.selectedFiles.forEach(file => {
      formData.append('proves[]', file);
    });

    this.ticketQueixaService.createTicketQueixa(formData).subscribe({
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
