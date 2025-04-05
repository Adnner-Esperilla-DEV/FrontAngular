import { AfterViewInit, Component, effect, ElementRef, inject, OnDestroy, signal, viewChild } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { CustomDateInputComponent, CustomLayoutComponent } from '@shared/components'
import { DateUtil } from '@shared/utils'
import { Subscription } from 'rxjs'
import { DailyPlanningListComponent } from '../daily-planning-list/daily-planning-list.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { EditViewModeEnum } from '@shared/constants'

@Component({
  selector: 'app-daily-planning-form',
  standalone: true,
  imports: [
    CustomLayoutComponent,
    CustomDateInputComponent,
    DailyPlanningListComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './daily-planning-form.component.html'
})
export class DailyPlanningFormComponent implements AfterViewInit, OnDestroy {
  private readonly fb = inject(FormBuilder)

  editViewModeEnum = EditViewModeEnum
  editViewMode = signal<EditViewModeEnum>(EditViewModeEnum.EDIT)
  formSubscription: Subscription | null = null
  form = this.fb.group({
    date: ['', [Validators.required]],
  })
  date = signal<string>('')
  isFullscreen = signal<boolean>(!!document.fullscreenElement)
  fullscreenElement = viewChild<ElementRef>('fullscreenElement')

  private isFullscreenEffect = effect(() => {
    const isFullscreen = this.isFullscreen()
    const fullscreenElement = this.fullscreenElement()?.nativeElement as HTMLElement
    if (isFullscreen) {
      fullscreenElement.requestFullscreen()
      return
    }
    document.fullscreenElement && document.exitFullscreen()
  })

  ngAfterViewInit() {
    this.formSubscription = this.form.valueChanges.subscribe(() => {
      this.date.set(DateUtil.toString(this.form.get('date')?.value))
    })
  }

  ngOnDestroy() {
    this.formSubscription?.unsubscribe()
  }

  onToggleFullScreen() {
    this.isFullscreen.update(cur => !cur)
  }
}
