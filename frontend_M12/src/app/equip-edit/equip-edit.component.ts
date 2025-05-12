import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      nom: [null],
      colors_representatius: [null],
      idioma_equip: [null],
      patrocinadors: [null],
      data_fundacio: [null],
      entrenador: [null],
      logo: [null],
      descripcio: [null],
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
      console.log('Archivo seleccionado:', this.selectedFile); // Verifica el archivo seleccionado

      // Add a null check for selectedFile
      if (this.selectedFile) {
        this.myForm.patchValue({ logo: this.selectedFile.name });
      }
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
      formData.append('actiu', this.myForm.get('actiu')?.value ? '1' : '0');

      if (this.selectedFile) {
        formData.append('logo', this.selectedFile);
      } else {
        formData.append('logo', this.imatgeActual);
      }

      // Verifica el contenido de FormData
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      this.dadesEquipsService.updateEquip(this.id, formData).subscribe({
        next: () => {
          // Realiza una petición adicional para obtener los datos actualizados del equipo
          this.dadesEquipsService.getEquip(this.id).subscribe({
            next: (data) => {
              this.imatgeActual = data.body?.logo || ''; // Actualiza la imagen actual
              console.log('Imagen actualizada:', this.imatgeActual);
              this.router.navigate(['/equip-list']); // Navega después de actualizar
            },
            error: (error) => {
              console.error('Error al obtener los datos actualizados del equipo:', error);
            }
          });
        },
        error: (error) => {
          this.errorMessage = 'Error en actualitzar l\'equip. Si us plau, torna-ho a intentar.';
          console.error('Error en actualitzar l\'equip:', error);
        }
      });
    }
  }
}