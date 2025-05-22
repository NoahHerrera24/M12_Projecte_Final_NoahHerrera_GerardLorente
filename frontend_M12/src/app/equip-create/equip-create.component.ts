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
      nom: [null, [Validators.required, Validators.maxLength(16)]],
      colors_representatius: [null, [Validators.required, Validators.maxLength(41)]],
      idioma_equip: [null, [Validators.required, Validators.maxLength(41)]],
      patrocinadors: [null, [Validators.required, Validators.maxLength(51)]],
      data_fundacio: [null, Validators.required],
      entrenador: [null, [Validators.required, Validators.maxLength(16)]],
      logo: [null, Validators.required],
      descripcio: [null, Validators.required, Validators.maxLength(41)],
      actiu: [false],
    });
  }

  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Solo aceptar imágenes
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Només es permeten arxius d\'imatge per al logo.';
        this.selectedFile = null;
        this.myForm.get('logo')?.setValue(null);
        return;
      }
      this.selectedFile = file;
      this.myForm.get('logo')?.setValue(file);
      this.errorMessage = '';
    }
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.errorMessage = 'Si us plau, completa tots els camps obligatoris.';
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.myForm.get('nom')?.value);
    formData.append('colors_representatius', this.myForm.get('colors_representatius')?.value);
    formData.append('idioma_equip', this.myForm.get('idioma_equip')?.value);
    formData.append('patrocinadors', this.myForm.get('patrocinadors')?.value);
    formData.append('data_fundacio', this.myForm.get('data_fundacio')?.value);
    formData.append('entrenador', this.myForm.get('entrenador')?.value);
    formData.append('descripcio', this.myForm.get('descripcio')?.value);
    formData.append('actiu', this.myForm.get('actiu')?.value ? '1' : '0');

    if (this.selectedFile) {
      formData.append('logo', this.selectedFile);
    }

    this.dadesEquipsService.createEquip(formData).subscribe({
      next: () => {
        this.router.navigate(['/equip-list']);
      },
      error: (error) => {
        if (error.status === 500) {
          this.errorMessage = 'Hi ha hagut un error al servidor. Si us plau, torna-ho a intentar més tard.';
        } else {
          this.errorMessage = 'Error en crear l\'equip. Revisa els camps i torna-ho a intentar.';
        }
        console.error('Error al crear el equipo:', error);
      }
    });
  }
}