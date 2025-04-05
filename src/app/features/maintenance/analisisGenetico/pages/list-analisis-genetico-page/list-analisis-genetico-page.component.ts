import { Component, signal } from '@angular/core';
import { CustomLayoutComponent } from '@shared/components';
import { AnalisisGeneticoFormComponent } from '../../components/analisis-genetico-form/analisis-genetico-form.component';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DatosDto } from '../../models';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-list-analisis-genetico-page',
  standalone: true,
  imports: [CustomLayoutComponent, AnalisisGeneticoFormComponent, MatCardContent, MatCard],
  templateUrl: './list-analisis-genetico-page.component.html',
  styleUrl: './list-analisis-genetico-page.component.scss'
})
export class ListAnalisisGeneticoPageComponent {
  // Cambiar 'initialData' para que sea un objeto, no una función
  initialData: DatosDto = {
    cadena1: '',
    cadena2: '',
    cadena3: '',
    cadena4: '',
    cadena5: '',
    cadena6: ''
  };
}
