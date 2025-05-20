import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesTornejosService } from '../services/dades-tornejos.service';

@Component({
  selector: 'app-torneig-edit',
  standalone: false,
  templateUrl: './torneig-edit.component.html',
  styleUrls: ['./torneig-edit.component.css']
})
export class TorneigEditComponent implements OnInit {
  myForm: FormGroup;
  errorMessage: string = '';
  id: string | null | undefined;

  constructor(
    private torneigService: DadesTornejosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ruta: ActivatedRoute
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.myForm = this.formBuilder.group({
      nom: [null, [Validators.required, Validators.maxLength(15)]],
      regles: [null, [Validators.required, Validators.maxLength(50)]],
      premis: [null, [Validators.required, Validators.maxLength(15)]],
      categoria: [null, [Validators.required, Validators.maxLength(15)]],
      format: [null, [Validators.required, Validators.maxLength(15)]],
      data_inici: [null, Validators.required],
      data_fi: [null, Validators.required]
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
            data_fi: data.body?.data_fi ? new Date(data.body.data_fi).toISOString().split('T')[0] : ''
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
    if (this.myForm.invalid) {
      this.errorMessage = 'Si us plau, completa tots els camps obligatoris.';
      return;
    }

    if (this.id) {
      const formValue = this.myForm.value;   
      this.torneigService.updateTorneig(this.id, formValue).subscribe({
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