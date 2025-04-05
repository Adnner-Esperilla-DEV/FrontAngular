import { DailyPlanningDataDto } from './daily-planning-data.dto'

export interface DailyPlanningDto {
  date: string
  planning: number
  execution: number
  difference: number
  data: DailyPlanningDataDto[]
}