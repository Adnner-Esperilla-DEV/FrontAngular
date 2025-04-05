import { Component } from '@angular/core'
import { DailyPlanningFormComponent } from '../../components'

@Component({
  selector: 'app-report-daily-planning-page',
  standalone: true,
  imports: [
    DailyPlanningFormComponent,
  ],
  templateUrl: './report-daily-planning-page.component.html'
})
export class ReportDailyPlanningPageComponent { }
