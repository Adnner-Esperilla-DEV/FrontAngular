import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { AnalisisGeneticoService } from '@features/maintenance/analisisGenetico/services';
import { DatosDto } from '../../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { AnalysisResponse } from '../../models';

@Component({
  selector: 'app-analisis-genetico-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './analisis-genetico-form.component.html',
  styleUrls: ['./analisis-genetico-form.component.scss'],
})
export class AnalisisGeneticoFormComponent {
  @Input() datos: DatosDto = { // Inicializamos con un valor predeterminado
    cadena1: '',
    cadena2: '',
    cadena3: '',
    cadena4: '',
    cadena5: '',
    cadena6: ''
  };// Recibimos los datos desde el componente padre
  result: any;
  loading = false;

  constructor(
    private service: AnalisisGeneticoService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  // analyze() {
  //   console.log('Método analyze ejecutado'); // Verifica que el método se ejecuta
  
  //   this.loading = true;
  
  //   const datosValue: DatosDto = {
  //     cadena1: this.datos.cadena1,
  //     cadena2: this.datos.cadena2,
  //     cadena3: this.datos.cadena3,
  //     cadena4: this.datos.cadena4,
  //     cadena5: this.datos.cadena5,
  //     cadena6: this.datos.cadena6
  //   };
  
  //   // Llamada al servicio para hacer el análisis
  //   this.service.analyzeSNPs(datosValue).subscribe({
  //     next: (response: AnalysisResponse) => {
  //       console.log('Respuesta del servidor:', response);
  //       if (response.success) {
  //         this.result = response.data;
  //         console.log('Datos de resultado asignados:', this.result);
  //         this.cdr.detectChanges(); // Forzamos la detección de cambios
  //         this.showAlert('Análisis completado', 'success');
  //       } else {
  //         this.showAlert(response.error || 'Error desconocido', 'error');
  //       }
  //     },
      
  //     error: (err) => {
  //       console.log('Error en la conexión con el servidor:', err);
  //       this.showAlert('Error en la conexión con el servidor', 'error');
  //     },
  //     complete: () => {
  //       this.loading = false;
  //       this.cdr.detectChanges();
  //     },
  //   });
  // }
  analyze() {
    console.log('Método analyze ejecutado'); // Verifica que el método se ejecuta
  
    // Verifica si todos los campos están llenos
    if (!this.datos.cadena1 || !this.datos.cadena2 || !this.datos.cadena3 || !this.datos.cadena4 || !this.datos.cadena5 || !this.datos.cadena6) {
      this.showAlert('Por favor, complete todos los campos.', 'error');
      return; // Detiene la ejecución si faltan campos
    }
  
    this.loading = true;
  
    const datosValue: DatosDto = {
      cadena1: this.datos.cadena1,
      cadena2: this.datos.cadena2,
      cadena3: this.datos.cadena3,
      cadena4: this.datos.cadena4,
      cadena5: this.datos.cadena5,
      cadena6: this.datos.cadena6
    };
  
    // Llamada al servicio para hacer el análisis
    this.service.analyzeSNPs(datosValue).subscribe({
      next: (response: AnalysisResponse) => {
        console.log('Respuesta del servidor:', response);
        if (response.success) {
          this.result = response.data;
          console.log('Datos de resultado asignados:', this.result);
          this.cdr.detectChanges(); // Forzamos la detección de cambios
          this.showAlert('Análisis completado', 'success');
        } else {
          this.showAlert(response.error || 'Error desconocido', 'error');
        }
      },
      error: (err) => {
        console.log('Error en la conexión con el servidor:', err);
        this.showAlert('Error en la conexión con el servidor', 'error');
      },
      complete: () => {
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
  
  

  // Función que verifica si hay resultados
  hasResults(): boolean {
    console.log('result')
    console.log(this.result);
    // console.log(this.result.porcentaje_ascendencia);

    return this.result;
  }

  private showAlert(message: string, type: 'success' | 'error' = 'success') {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar'
    });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  trackByFn(index: number, item: any): any {
    return index;  // You can also use a unique identifier if available
  }
}
