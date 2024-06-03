import {
  Component,
  inject,
  TemplateRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrl: './editmodal.component.scss',
})
export class EditmodalComponent {
  private modalService = inject(NgbModal);
  closeResult = '';
  name = '';
  @Input() isTask: boolean = false;
  @Output() public newName = new EventEmitter<string>();

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          if (result === 'Save click') {
            this.newName.emit(this.name);
            this.name = '';
          } else {
            this.name = '';
          }

          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
