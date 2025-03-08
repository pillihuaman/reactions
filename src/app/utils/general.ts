import { Sort } from '@angular/material/sort';
import { LocaleService } from '../@data/services/locale.service';

export function getMiliseconds() {
  const dt = new Date();
  const dia = dt.getDate().toString().padStart(2, '0');
  const mes = (dt.getMonth() + 1).toString().padStart(2, '0');
  const anio = dt.getFullYear().toString().padStart(4, '0');
  const hora = dt.getHours().toString().padStart(2, '0');
  const min = dt.getMinutes().toString().padStart(2, '0');
  const sec = dt.getSeconds().toString().padStart(2, '0');
  const mil = dt.getMilliseconds().toString().padStart(3, '0');
  const horaInsercion = dia + mes + anio + hora + min + sec + mil;
  return horaInsercion;
}

export function getHash(value: string): number {
  let hash = 5381;
  value = value.toUpperCase();
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) + hash + value.charCodeAt(i);
  }
  return hash;
}

export function requestFilter(request: any): string {
  let api = '';
  Object.keys(request).forEach((key) => {
    const oldVal = request[key];
    const newVal =
      oldVal || oldVal === 0
        ? typeof oldVal === 'string'
          ? oldVal.trim()
          : oldVal
        : null;
    if (newVal || newVal === 0) {
      api += `${key}=${newVal}&`;
    }
  });
  api = api.substr(0, api.length - 1);
  return api;
}

export function setValidOrInvalidColors(items: any[], field: any) {
  items.forEach((tblMaestra) => {
    if (tblMaestra[field] === '0') {
      tblMaestra.settings = {};
      tblMaestra.settings.disableDelete = true;
      tblMaestra.settings.estado = {};
      tblMaestra.settings.estado.color = '#eb5757';
    } else {
      tblMaestra.settings = {};
      tblMaestra.settings.estado = {};
      tblMaestra.settings.estado.color = '#0d88bc';
    }
  });
  return items;
}
