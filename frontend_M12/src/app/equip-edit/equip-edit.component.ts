import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesEquipsService } from '../services/dades-equips.service';

@Component({
  selector: 'app-equip-edit',
  templateUrl: './equip-edit.component.html',
  styleUrls: ['./equip-edit.component.css'],
  standalone: false
})
export class EquipEditComponent implements OnInit {
  myForm: FormGroup;
  errorMessage: string | null = null;
  id: string | null | undefined;
  selectedFile: File | null = null;
  imatgeActual: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dadesEquipsService: DadesEquipsService
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
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
      guanyador: [false]
    });

    if (this.id) {
      this.dadesEquipsService.getEquip(this.id).subscribe({
        next: (data) => {
          this.imatgeActual = data.body?.logo || '';
          this.myForm.patchValue({
            nom: data.body?.nom || '',
            colors_representatius: data.body?.colors_representatius || '',
            idioma_equip: data.body?.idioma_equip || '',
            patrocinadors: data.body?.patrocinadors || '',
            data_fundacio: data.body?.data_fundacio || '',
            entrenador: data.body?.entrenador || '',
            logo: this.imatgeActual,
            descripcio: data.body?.descripcio || '',
            actiu: data.body?.actiu || false,
            guanyador: data.body?.guanyador || false
          });
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error al carregar l\'equip:', error);
        }
      });
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.myForm.patchValue({ logo: this.selectedFile ? this.selectedFile.name : this.imatgeActual });
    }
  }

  onSubmit(): void {
    if (this.id) {
      const formData = new FormData();
      formData.append('nom', this.myForm.get('nom')?.value);
      formData.append('colors_representatius', this.myForm.get('colors_representatius')?.value);
      formData.append('idioma_equip', this.myForm.get('idioma_equip')?.value);
      formData.append('patrocinadors', this.myForm.get('patrocinadors')?.value);
      formData.append('data_fundacio', this.myForm.get('data_fundacio')?.value);
      formData.append('entrenador', this.myForm.get('entrenador')?.value);
      formData.append('descripcio', this.myForm.get('descripcio')?.value);
      formData.append('actiu', this.myForm.get('actiu')?.value);
      formData.append('guanyador', this.myForm.get('guanyador')?.value);

      if (this.selectedFile) {
        formData.append('logo', this.selectedFile);
      } else {
        formData.append('logo', this.imatgeActual);
      }

      this.dadesEquipsService.updateEquip(this.id, formData).subscribe({
        next: () => {
          this.router.navigate(['/equip-list']);
        },
        error: (error) => {
          this.errorMessage = 'Error en actualitzar l\'equip. Si us plau, torna-ho a intentar.';
          console.error('Error en actualitzar l\'equip:', error);
        }
      });
    }
  }
}