import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadesEquipsService } from '../services/dades-equips.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equip-create',
  templateUrl: './equip-create.component.html',
  styleUrls: ['./equip-create.component.css'],
  standalone: false
})
export class EquipCreateComponent implements OnInit {
  myForm: FormGroup;
  errorMessage: string = '';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dadesEquipsService: DadesEquipsService,
    private router: Router
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nom: [null, Validators.required],
      colors_representatius: [null, Validators.required],
      idioma_equip: [null, Validators.required],
      patrocinadors: [null, Validators.required],
      data_fundacio: [null, Validators.required],
      entrenador: [null],
      logo: [null],
      descripcio: [null, Validators.required],
      actiu: [false],
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('nom', this.myForm.get('nom')?.value);
    formData.append('colors_representatius', this.myForm.get('colors_representatius')?.value);
    formData.append('idioma_equip', this.myForm.get('idioma_equip')?.value);
    formData.append('patrocinadors', this.myForm.get('patrocinadors')?.value);
    formData.append('data_fundacio', this.myForm.get('data_fundacio')?.value);
    formData.append('entrenador', this.myForm.get('entrenador')?.value);
    formData.append('descripcio', this.myForm.get('descripcio')?.value);
    formData.append('actiu', this.myForm.get('actiu')?.value ? '1' : '0'); // Convertir a '1' o '0'

    if (this.selectedFile) {
      formData.append('logo', this.selectedFile);
    }

    this.dadesEquipsService.createEquip(formData).subscribe({
      next: () => {
        this.router.navigate(['/equip-list']);
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error('Error al crear el equipo:', error);
      }
    });
  }
}