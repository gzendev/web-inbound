import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { CommonRestService } from "@app/services/common-rest.service";
import { ConfigurationEmailService } from "@app/services/configuration-email.service";
import { Constants } from "@app/utils/constants";
import { AlertService } from "@app/services/alert.service";
import { BaseComponent } from "../base.component";
import { Concesionario, ConcesionariosEmail } from "@app/models/concesionariosEmail.model";
import { EmailListComponent } from "./email/email-list/email-list.component";
import { BocaEntrega } from "@app/models/bocaEntrega.model";

@Component({
  selector: "app-configuration",
  templateUrl: "./configuration.component.html",
  styleUrls: ["./configuration.component.css"],
})
export class ConfigurationComponent extends BaseComponent implements OnInit {
  idClient: string;
  idConcesionaria: string;
  codigoBocaEntrega: string;
  currentConcesionaria:Concesionario;
  currentBocaEntrada:BocaEntrega;
  emailsConcesionaria: Array<string>;
  emailsBocas: Array<string>;
  clients: Array<ConcesionariosEmail>;
  bocas: Array<BocaEntrega>;

  @ViewChild('emailConcesionariaComponent') concesionariaComponent:EmailListComponent;
  @ViewChild('emailBocaEntregaComponent') emailBocaEntregaComponent:EmailListComponent;

  protected getFunctionId(): string {
    return "";
  }

  constructor(
    protected commonRestService: CommonRestService,
    protected router: Router,
    private configurationEmailService : ConfigurationEmailService,
    private alertService: AlertService
  ) {
    super(commonRestService, router);
    this.breadcrumb = [Constants.CONFIGURATION_BREADCRUMB];
    this.idClient = null;
    this.idConcesionaria = null;
    this.codigoBocaEntrega = null;
    this.emailsConcesionaria = [];
    this.emailsBocas = [];
    this.clients = [];
    this.bocas = [];
  }

  addEmailBoca(newItem: string) {
    this.emailsBocas.push(newItem);
    this.guardarEmailsBocaEntrada();
  }

  updateEmailBoca(item: { id: number; email: string }) {
    this.emailsBocas[item.id] = item.email;
    this.guardarEmailsBocaEntrada();
  }

  deleteEmailBoca(id: number) {
    this.emailsBocas.splice(id, 1);
    this.guardarEmailsBocaEntrada();
  }

  addEmailConsecionaria(newItem: string) {
    this.emailsConcesionaria.push(newItem);
    this.guardarEmailsConsecionaria();
  }

  updateEmailConsecionaria(item: { id: number; email: string }) {
    this.emailsConcesionaria[item.id] = item.email;
    this.guardarEmailsConsecionaria();
  }

  deleteEmailConsecionaria(id: number) {
    this.emailsConcesionaria.splice(id, 1);
    this.guardarEmailsConsecionaria();
  }

  selectConcesionaria(conce:Concesionario) {
    let client = this.clients.find((client) => client.codigoCliente === conce.codigoCliente);
    let concesionaria = client.concesionarios.find(
      (concesionaria) => concesionaria.codigoConcesionario == conce.codigoConcesionario
    );
    this.idClient = conce.codigoCliente;
    this.idConcesionaria = conce.codigoConcesionario;
    this.currentConcesionaria = concesionaria;
    this.emailsConcesionaria = concesionaria.emails;
    this.concesionariaComponent.resetField();
    this.resetBoca();
    this.emailBocaEntregaComponent.resetField();
    this.configurationEmailService.getBocasEmails(this.currentConcesionaria.codigoPais,this.currentConcesionaria.codigoCliente,this.currentConcesionaria.codigoConcesionario).subscribe(
      (recovery) => {
        if (recovery.hasError) {
          this.alertService.danger(recovery.message);
        } else {
          this.bocas = recovery.response;
          console.log(this.clients);
        }
      },
      (err) => {
        this.alertService.danger(err);
      }
    );
  }

  selectBoca(bocaEntrada: BocaEntrega) {
    this.emailBocaEntregaComponent.resetField();
    this.codigoBocaEntrega = bocaEntrada.codigoBocaEntrega;
    this.currentBocaEntrada = bocaEntrada;
    this.emailsBocas = this.bocas.find((boca) => boca.codigoBocaEntrega === bocaEntrada.codigoBocaEntrega).emails;
  }

  guardarEmailsConsecionaria() {
    this.configurationEmailService.changeConcesionarioEmail(this.currentConcesionaria).subscribe(
      (recovery) => {
        if (recovery.hasError) {
          this.alertService.danger(recovery.message);
        } else {
          this.alertService.success("Lista de Email Actualizada.");
        }
      },
      (err) => {
        this.alertService.danger(err);
      }
    );
  }
  guardarEmailsBocaEntrada() {
    this.configurationEmailService.changeBocaEmail(this.currentBocaEntrada).subscribe(
      (recovery) => {
        if (recovery.hasError) {
          this.alertService.danger(recovery.message);
        } else {
          this.alertService.success("Lista de Email Actualizada.");
        }
      },
      (err) => {
        this.alertService.danger(err);
      }
    );
  }

  resetConcesionaria() {
    this.idClient = null;
    this.idConcesionaria = null;
    this.currentConcesionaria = null;
    this.emailsConcesionaria = [];
    this.resetBoca();
  }

  resetBoca() {
    this.codigoBocaEntrega = 'none';
    this.currentBocaEntrada =null;
    this.emailsBocas = [];
  }

  loadClientesAndConcesionarias(){
    this.configurationEmailService.getConcesionariosEmails().subscribe(
      (recovery) => {
        if (recovery.hasError) {
          this.alertService.danger(recovery.message);
        } else {
          this.clients = recovery.response;
          console.log(this.clients);
        }
      },
      (err) => {
        this.alertService.danger(err);
      }
    );
  }

  ngOnInit(): void {
    this.loadClientesAndConcesionarias();
  }
}
