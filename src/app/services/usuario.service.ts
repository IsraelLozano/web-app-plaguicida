import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../libs/services/session.service';
import { AddOrEditUsuarioPaisDto } from '../models/seguridad/AddOrEditUsuarioPaisDto';
import { IGetUsuarioPaisDto } from '../models/seguridad/IGetUsuarioPaisDto';
import { ILoginDto } from '../models/seguridad/ILoginDto';
import { AddOrEditUserDto, IUsersDto } from '../models/seguridad/IUsersDto';
import { DialogService } from '../shared/dialog/dialog.service';
import { GetDataUserDto } from '../shared/menu-items/GetDtoUser';
import { GenericRepositoryService } from './generic-repository.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends GenericRepositoryService {
  public usuario: GetDataUserDto = {} as GetDataUserDto;
  private urlAddressSeguridad?: string;
  private controller: string = '';

  constructor(
    http: HttpClient,
    private dialogService: DialogService,
    private _sessionService: SessionService,
  ) {
    super(http);
    const {
      urlAddressSeguridad,
      controllers: { seguridad },
    } = environment.api;
    this.urlAddressSeguridad = urlAddressSeguridad ? urlAddressSeguridad : '';
    this.controller = seguridad;
  }

  GetUsers() {
    return this.get<IUsersDto[]>(`${this.urlAddressSeguridad}${this.controller}/users`);
  }

  AddOrEditUser(model: AddOrEditUserDto) {
    return this.post<AddOrEditUserDto[]>(
      `${this.urlAddressSeguridad}${this.controller}/CreateOrUpdateUsuario`,
      model,
    );
  }

  AddOrEditUsuarioPais(model: AddOrEditUsuarioPaisDto[]) {
    return this.post<AddOrEditUsuarioPaisDto[]>(
      `${this.urlAddressSeguridad}${this.controller}/CreateOrUpdateUsuarioPais`,
      model,
    );
  }

  GetListUsuarioPaisByIdUsuario(idUsuario: number) {
    return this.get<IGetUsuarioPaisDto[]>(
      `${this.urlAddressSeguridad}${this.controller}/usuarioPais/${idUsuario}`,
    );
  }

  GetLoginOAUth(codigo: string, clave: string, idPais: number) {
    return this.get<ILoginDto>(
      `${this.urlAddressSeguridad}${this.controller}/oauth-login/${codigo}/${clave}/${idPais}`,
    ).pipe(
      map((resp) => {
        const dataUser = JSON.stringify(resp);
        this._sessionService.create(dataUser);
        return resp;
      }),
    );
  }

  async GetForgotPassword(email: string, codigo: string) {
    return await this.get<ILoginDto>(
      `${this.urlAddressSeguridad}${this.controller}/${email}/${codigo}`,
    ).toPromise();
  }

  /************************************************************* */
}
