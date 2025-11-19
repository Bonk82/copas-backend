import {consulta as da} from '../connection/connexPostgres.js'

//equipo
export const listarEquipo  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from juego.equipo c where c.activo=1`;
  if(opcion != 'T') q = `select * from juego.equipo c where c.activo=1 and ${opcion} = '${id}';`;

  try {
    const consulta = await da(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudEquipo   = async  (datos, respuesta, next) => {
  const {operacion,id_equipo,codigo,region,nombre,grupo,torneo,nivel} = datos.query;

  let q = `select * from juego.pra_crud_equipo('${operacion}',${id_equipo},'${codigo}','${region}','${nombre}','${grupo}','${torneo}',${nivel});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//partido
export const listarPartido  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from juego.partido c where c.activo=1`;
  if(opcion != 'T') q = `select * from juego.partido c where c.activo=1 and ${opcion} = '${id}';`;
  
  try {
    const consulta = await da(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudPartido   = async  (datos, respuesta, next) => {
  const {operacion,id_partido,torneo,fid_equipoa,fid_equipob,fecha,scorea,scoreb,finalizado} = datos.query;

  let q = `select * from juego.pra_crud_partido('${operacion}',${id_partido},'${torneo}',${fid_equipoa},${fid_equipob},'${fecha}',${scorea},${scoreb},'${finalizado}');`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//apuesta
export const listarApuesta  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from juego.apuesta c where c.activo=1`;
  if(opcion != 'T') q = `select * from juego.apuesta c where c.activo=1 and ${opcion} = '${id}';`;
  
  try {
    const consulta = await da(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudApuesta   = async  (datos, respuesta, next) => {
  const {operacion,id_apuesta,fid_usuario,fid_partido,scorea,scoreb,puntaje} = datos.query;

  let q = `select * from juego.pra_crud_apuesta('${operacion}',${id_apuesta},${fid_usuario},${fid_partido},${scorea},${scoreb},${puntaje});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};
