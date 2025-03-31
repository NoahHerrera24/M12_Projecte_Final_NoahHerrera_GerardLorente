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
          this.myForm.patchValue({
            descripcio: data.body?.descripcio || '',
            estat: data.body?.estat || '' 
          });
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error:', error);
        }
      });
    }
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

  onSubmit(): void {
    if (this.id) {
      const formData = new FormData();
      formData.append('descripcio', this.myForm.get('descripcio')?.value);
      formData.append('estat', this.myForm.get('estat')?.value); 
      
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