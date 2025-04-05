import { TitleCasePipe } from '@angular/common'
import { AfterViewInit, Component, inject, input, model, output, signal } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { MatIcon } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { ActivatedRoute, Router } from '@angular/router'
import { EditViewModeEnum } from '@shared/constants'
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component'
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive'
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component'
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component'
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'

@Component({
  selector: 'app-custom-layout',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatMenuModule,
    VexBreadcrumbsComponent,
    VexPageLayoutComponent,
    VexPageLayoutContentDirective,
    VexSecondaryToolbarComponent,
    TitleCasePipe,
  ],
  templateUrl: './custom-layout.component.html',
})
export class CustomLayoutComponent implements AfterViewInit {
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  private readonly dialog = inject(MatDialog)

  editViewModeEnum = EditViewModeEnum
  editViewMode = model<EditViewModeEnum>(EditViewModeEnum.VIEW_ONLY)
  customClasses = input<string>('')
  layout = input<'boxed' | 'fullwidth'>('fullwidth')
  title = input<string>('')
  showToolbar = input<boolean>(true)
  showBreadcrumbs = input<boolean>(true)
  showActionButtons = input<boolean>(true)
  urlTree = signal<string[]>([])
  isElementActive = input<boolean>(true)
  saveElement = output()
  deleteElement = output()
  disableElement = output()
  enableElement = output()

  ngAfterViewInit() {
    const titleCasePipe = new TitleCasePipe()
    const urlTree = this.router.url.split('/').slice(1)
    const modifiedUrlTree = urlTree.map<string>(segment => {
      segment = segment.replace('-', ' ')
      segment = titleCasePipe.transform(segment)
      return segment
    })
    this.urlTree.set(modifiedUrlTree)
  }

  onClickList() {
    this.router.navigate(['../../'], { relativeTo: this.route })
  }

  onClickEdit() {
    this.editViewMode.set(EditViewModeEnum.EDIT)
  }

  onClickCreate() {
    this.router.navigate(['../../create'], { relativeTo: this.route })
  }

  onClickDelete() {
    const ModalComponent = ConfirmationDialogComponent
    const dialogRef = this.dialog.open(ModalComponent)
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return

      this.deleteElement.emit()
    })
  }

  onClickDisable() {
    const ModalComponent = ConfirmationDialogComponent
    const dialogRef = this.dialog.open(ModalComponent)
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return

      this.disableElement.emit()
    })
  }

  onClickEnable() {
    const ModalComponent = ConfirmationDialogComponent
    const dialogRef = this.dialog.open(ModalComponent)
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return

      this.enableElement.emit()
    })
  }

  onCancel() {
    if (this.router.url.includes('create')) {
      this.router.navigate(['../'], { relativeTo: this.route })
      return
    }

    this.editViewMode.set(EditViewModeEnum.VIEW_ONLY)
  }
}
