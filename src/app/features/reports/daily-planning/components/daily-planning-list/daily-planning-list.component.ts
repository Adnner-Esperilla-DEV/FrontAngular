import { DatePipe } from '@angular/common'
import { HttpParams } from '@angular/common/http'
import { Component, computed, effect, inject, input, output, signal, untracked } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CustomInputComponent, CustomTableComponent } from '@shared/components'
import { CustomBehaviourEnum } from '@shared/constants'
import { Paginator } from '@shared/models'
import { TableColumn } from '@vex/interfaces/table-column.interface'
import { DailyPlanningService } from '../../services'
import { DailyPlanningDataDto, DailyPlanningDto } from '../../models'

@Component({
  selector: 'app-daily-planning-list',
  standalone: true,
  imports: [
    CustomInputComponent,
    CustomTableComponent,
    DatePipe,
  ],
  templateUrl: './daily-planning-list.component.html'
})
export class DailyPlanningListComponent {
  private readonly dailyPlanningService = inject(DailyPlanningService)
  private readonly snackbar = inject(MatSnackBar)

  title = 'Planificación diaria'
  columns: TableColumn<DailyPlanningDataDto>[] = [
    {
      label: 'Serv',
      property: 'code',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    {
      label: 'C',
      property: 'planning',
      type: 'text',
      visible: true,
    },
    {
      label: 'Carga',
      property: 'container',
      type: 'text',
      visible: true,
    },
    {
      label: 'G',
      property: 'execution',
      type: 'text',
      visible: true,
    },
    {
      label: 'Cliente',
      property: 'customer',
      type: 'text',
      visible: true,
    },
    {
      label: 'Tramo',
      property: 'segmentDescription',
      type: 'text',
      visible: true,
    },
    {
      label: 'I/E',
      property: 'inpExp',
      type: 'text',
      visible: true,
    },
    {
      label: 'FP',
      property: 'ownerExecution',
      type: 'text',
      visible: true,
    },
  ]
  paginator = signal<Paginator>({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  })
  date = input<string>('')
  days = signal<number>(3)
  dailyPlanning = signal<DailyPlanningDto[]>([])
  tableWidth = computed<string>(() => `calc((100% - (16px * ${this.dailyPlanning().length - 1})) / ${this.dailyPlanning().length})`)
  getSelectedBehaviour = input<CustomBehaviourEnum>(CustomBehaviourEnum.CHANGE_BEHAVIOUR)
  getSelected = output<DailyPlanningDataDto>()
  createBehaviour = input<CustomBehaviourEnum>(CustomBehaviourEnum.CHANGE_BEHAVIOUR)

  private getAllEffect = effect(() => {
    if (!this.date()) return

    untracked(() => this.getAll())
  })

  getAll() {
    const paginator = this.paginator()
    const params = new HttpParams()
      .set('page', paginator.currentPage)
      .set('pageSize', paginator.pageSize)
      .set('desc_cons', this.date())
      .set('days', this.days())

    this.dailyPlanningService.getAll(params).subscribe({
      next: ({ data }) => {
        this.dailyPlanning.set(data.results)
        this.paginator.set({
          currentPage: data.pageNumber,
          pageSize: data.pageSize,
          totalCount: data.totalCount,
          totalPages: data.totalPages,
        })
      },
    })
  }
}
