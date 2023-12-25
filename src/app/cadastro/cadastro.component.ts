import { Router } from '@angular/router';
import { Component, NgModuleDecorator, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router, private cepService: ConsultaCepService) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm): void {
    if (form.valid) {
      this.router.navigate(['./sucesso'])
    } else {
      alert('Formulario inválido')
    }
      console.log(form);
  }

  consultaCep(ev: any, form: NgForm): void {
    const cep = ev.target.value;

    if (cep !== '') {
      this.cepService.getConsultaCep(cep).subscribe(resultado => {
        this.populandoEndereco(resultado, form);
      })
    } 
  }

  populandoEndereco(dados: any, form: NgForm) {
    form.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    })
  }
}
