
import {consulta as da} from '../connection/connexPostgres.js'
import crypto from 'crypto'


//usuarios
export const listarUsuarios  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select u.*,r.nombre rol from seguridad.usuario u
    left join seguridad.rol r on r.id_rol =u.fid_rol
    order by u.cuenta`;
  if(opcion != 'T') q = `select u.*,r.nombre rol from seguridad.usuario u
    left join seguridad.rol r on r.id_rol =u.fid_rol
    order by u.cuenta where ${opcion} = '${id}' order by u.cuenta;`;

  try {
    const consulta = await da(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudUsuario   = async  (datos, respuesta, next) => {
  let {operacion,id_usuario,nombre,cuenta,pass,tipo_acceso,datos_cuenta,fid_rol,estado} = datos.query;

  try {
    if(!nombre || !cuenta || !pass) throw new Error("Faltan datos obligatorios");
    let hash = null
    if(pass && ['I','CP'].includes(operacion)) hash = crypto.createHash('sha256').update(pass).digest('hex');

    let q = `select * from seguridad.pra_crud_usuario('${operacion}',${id_usuario},'${nombre}','${cuenta}','${hash}','${tipo_acceso}','${datos_cuenta}',${fid_rol || 1},'${estado}');`;

    const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

    const consulta = await da(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//clasificador
export const listarClasificador  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from seguridad.clasificador c where c.activo = 1;`;
  if(opcion != 'T') q = `select * from seguridad.clasificador c where c.activo = 1 and ${opcion} = '${id}';`;

  try {
    const consulta = await da(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudClasificador   = async  (datos, respuesta, next) => {
  const {operacion,id_clasificador,grupo,orden,nombre,sub_grupo} = datos.query;

  let q = `select * from seguridad.pra_crud_clasificador('${operacion}',${id_clasificador},'${grupo}',${orden},'${nombre}','${sub_grupo}');`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//rol_menu
export const listarMenu = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from seguridad.rol_menu rm`;
  if(opcion != 'T') q = `select * from seguridad.rol_menu rm where ${opcion} = '${id}';`;
  if(opcion == 'ROL') q = `select m.id_menu,m.descripcion,m.ruta,m.nivel from seguridad.rol_menu rm
      join seguridad.menu m on rm.fid_menu = m.id_menu where rm.fid_rol =${id};`;

  try {
    const consulta = await da(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//roles
export const listarRoles  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from seguridad.rol r`;
  if(opcion != 'T') q = `select * from seguridad.rol r where ${opcion} = '${id}';`;

  try {
    const consulta = await da(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//obtener IP
export const obtenerIP  = async  (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    respuesta.status(200).json({ip});
  } catch (error) {
    next(error)
  }
};