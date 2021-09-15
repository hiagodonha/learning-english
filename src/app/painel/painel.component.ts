import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frase.mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase!: Frase

  public progresso: number = 0;

  public tentativas: number = 3;

  @Output() public encerrarJogo = new EventEmitter();

  constructor() {
    this.atualizaRodada();
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtBr == this.resposta) {
      alert('A traducao esta correta!')

      //trocar a pergunta da rodada
      this.rodada++

      //progresso
      this.progresso = this.progresso + (100 / this.frases.length);


      if (this.rodada === 4) {
        this.encerrarJogo.emit('vitoria');
        alert('Concluiu as traduções com sucesso!')
      }

      //atualiza o objeto rodadaFrase
      this.atualizaRodada();

    } else {
      this.tentativas--;

      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota');
        alert("YOUR LOSE!")
      }
      alert('A traducao esta errada!')
    }
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = ''
  }


}
