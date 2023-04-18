import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-email-list",
  templateUrl: "./email-list.component.html",
  styleUrls: ["./email-list.component.css"],
})
export class EmailListComponent implements OnInit {
  @Input() emails: Array<string>;
  @Input() disabled: boolean;
  idEditing: number;
  isEdit: boolean;
  currentEmail: string;
  emailPattern: string;
  @Output() addEmail = new EventEmitter<string>();
  @Output() updateEmail = new EventEmitter<{ id: number; email: string }>();
  @Output() deleteEmail = new EventEmitter<number>();

  constructor() { }

  resetField() {
    this.idEditing = null;
    this.isEdit = false;
    this.currentEmail = "";
    this.disabled = false;
    // this.emails = new Array<string>();
  }

  agregar() {
    console.log(this.currentEmail);
    if (this.existEmail(this.currentEmail)) {
      alert("el email existe");
    } else {
      this.addEmail.emit(this.currentEmail);
    }
    this.resetField();
  }

  editar() {
    console.log(this.currentEmail);
    this.updateEmail.emit({ id: this.idEditing, email: this.currentEmail });
    this.resetField();
    this.isEdit = false;
  }

  actionEditar(email: string) {
    this.idEditing = this.emails.indexOf(email);
    this.currentEmail = email;
    this.isEdit = true;
  }

  existEmail(email: string) {
    return this.emails.indexOf(email) != -1;
  }

  eliminar(index: number) {
    this.deleteEmail.emit(index);
  }

  cancelar() {
    this.resetField();
  }

  ngOnInit() {
    this.isEdit = false;
    this.currentEmail = "";
    this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  }
}
