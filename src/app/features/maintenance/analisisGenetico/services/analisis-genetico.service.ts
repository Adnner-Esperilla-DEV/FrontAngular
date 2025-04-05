import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { AnalysisResponse, DatosDto} from '../models'
import { ApiService } from '@core/api/services/api.service'
import { environment } from '@environments/environment'
import { Observable, timeout } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AnalisisGeneticoService {

    private readonly api = inject(ApiService)
    private url = 'shared/suffix_tree_nodes'
    private readonly API_BASE_URL = `${environment.apiBaseUrl}/`
    create(bank: DatosDto) {
      return this.api.post(this.url, bank)
    }
    private apiUrl = `${this.API_BASE_URL}v1/suffix_tree_nodes/`;

    constructor(private http: HttpClient) { }
  
    analyzeSNPs(data: DatosDto): Observable<AnalysisResponse> {
      return this.http.post<AnalysisResponse>(this.apiUrl, data);
    }
  }
