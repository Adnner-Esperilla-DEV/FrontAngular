import { HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { ApiService } from '@core/api/services/api.service'
import { DailyPlanningDto } from '../models'

@Injectable({
  providedIn: 'root'
})
export class DailyPlanningService {
  private readonly api = inject(ApiService)
  private url = 'report/dailyplanning'

  getAll(params?: HttpParams) {
    return this.api.getAll<DailyPlanningDto>(`${this.url}`, params)
  }
}
