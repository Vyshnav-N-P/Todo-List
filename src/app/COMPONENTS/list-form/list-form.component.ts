  import { Component, Output ,EventEmitter,inject, TemplateRef, Input } from '@angular/core';
  import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-list-form',
    templateUrl: './list-form.component.html',
    styleUrl: './list-form.component.scss'
  })
  export class ListFormComponent {
  public type='';
  @Input() isTask:boolean | undefined;
  @Output() public sendData=new EventEmitter<string>()
  onCreate(){
    this.sendData.emit(this.type);
    console.log("FROM "+this.type);
    this.type='';
    
  }
  onCancel(){
    this.type='';
    this.sendData.emit(this.type);
  }
  private modalService = inject(NgbModal);
    closeResult = '';

    open(content: TemplateRef<any>) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          if (result === 'Save click') {
            this.onCreate();
          } else {
            this.onCancel();
          }
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
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
