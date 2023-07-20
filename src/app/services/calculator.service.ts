import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericRepositoryService } from './generic-repository.service';
import { GetArticuloAllDto } from '../models/calculator/get-list-articulo-dto';
import { GetSimuladorPedidoDto } from '../models/calculator/get-simulador-pedido-dto';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService extends GenericRepositoryService {
  private urlAddress?: string;
  private controller: string = '';

  constructor(http: HttpClient) {
    super(http);
    const {
      urlAddress,
      controllers: { calculator },
    } = environment.api;
    this.urlAddress = urlAddress ? urlAddress : '';
    this.controller = calculator;
  }

  GetArticuloAll(filter: string) {
    return this.get<GetArticuloAllDto>(
      `${this.urlAddress}${this.controller}/GetArticuloAll/${filter}`,
    );
  }

  GetPedidoAll() {
    return this.get<GetSimuladorPedidoDto[]>(`${this.urlAddress}${this.controller}/GetPedidoAll`);
  }
  GetPedidoById(id: number) {
    return this.get<GetSimuladorPedidoDto>(`${this.urlAddress}${this.controller}/GetPedidoById/${id}`);
  }
  AddOrEditPedido(model: GetSimuladorPedidoDto) {
    return this.post<boolean>(`${this.urlAddress}${this.controller}/AddOrEditPedido`, model);
  }
}
