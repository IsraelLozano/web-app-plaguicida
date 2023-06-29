import { Injectable } from '@angular/core';
import { GenericRepositoryService } from './generic-repository.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteService extends GenericRepositoryService {
  urlAddress: string;
  controller: string;

  constructor(
    http: HttpClient,
  ) {
    super(http);
    const {
      urlAddress,
      controllers: { reporte },
    } = environment.api;
    this.urlAddress = urlAddress ? urlAddress : '';
    this.controller = reporte;
  }

  public GetExcelCalculatorById(
    id: number,
  ) {
    const param = {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    };
    return this.getDownload(
      `${this.urlAddress}${this.controller}/GetExcelCalculatorById/${id}`,
      param,
    );
    }
}
