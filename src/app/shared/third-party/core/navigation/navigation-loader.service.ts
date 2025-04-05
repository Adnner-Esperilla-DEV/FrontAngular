import { Injectable } from '@angular/core'
import { VexLayoutService } from '@vex/services/vex-layout.service'
import { NavigationItem } from './navigation-item.interface'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NavigationLoaderService {
  private readonly _items: BehaviorSubject<NavigationItem[]> = new BehaviorSubject<NavigationItem[]>([])

  get items$(): Observable<NavigationItem[]> {
    return this._items.asObservable()
  }

  constructor(private readonly layoutService: VexLayoutService) {
    this.loadNavigation()
  }

  loadNavigation(): void {
    this._items.next([
      // {
      //   type: 'dropdown',
      //   label: 'Modulo',
      //   icon: 'mat:business_center',
      //   children: [
      //     {
      //       type: 'link',
      //       label: 'Bancos',
      //       route: '/maintenance/banks',
      //     },
      //     {
      //       type: 'link',
      //       label: 'Tipos de Gravedad',
      //       route: '/maintenance/tipo-gravedades',
      //     },
      //   ],
      // },
      // {
      //   type: 'dropdown',
      //   label: 'SIS',
      //   icon: 'mat:business_center',
      //   children: [
      //     {
      //       type: 'link',
      //       label: 'Consolidados',
      //       route: '/sis/consolidados',
      //     },
      //   ],
      // },
      {
        type: 'dropdown',
        label: 'UTEC',
        icon: 'mat:business_center',
        children: [
          {
            type: 'link',
            label: 'Analisis Genetico',
            route: '/utec/analisis-genetico',
          },
        ],
      },
    ])
  }
}
