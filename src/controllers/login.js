import {consulta as da} from '../connection/connexPostgres.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {OAuth2Client} from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const login = async (datos, respuesta, next) => {
  let {operacion,user,password,new_pass} = datos.query

  if (operacion === 'G' && !password) return respuesta.status(400).json({message: 'datos incompletos'});

  if(operacion === 'G' && user && password){
    let ticket;
    try {
      ticket = await googleClient.verifyIdToken({
        idToken: user,
        audience: process.env.GOOGLE_CLIENT_ID
      });
    } catch (e) {
      return res.status(401).json({ message: 'Token de Google inválido' });
    }
    console.log("ticket", ticket);
    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;
    const picture = payload.picture;

    user = `${email}|${name}|${picture}`;
    password = googleId;
  }

  let hash = password && operacion !='G'? crypto.createHash('sha256').update(password).digest('hex') : null;
  let new_hash = new_pass ? crypto.createHash('sha256').update(new_pass).digest('hex') : null;

  const ip = datos.headers['x-forwarded-for'] || datos.socket.remoteAddress || null;
  let q =`select * from seguridad.pr_login ('${operacion}','${user}','${hash || password}','${new_hash}','${ip}');`;
  let newToken = null;
  // let ip = null;
  try {
    // console.log(crypto.createHash('sha256').update(`${789456}#${'LIMS'}*`).digest('hex'))
    const consulta = await da(q);
    console.log("del login", consulta);
    if(consulta[0]){
      newToken = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60*60*8),cnx: consulta[0].id_con,id_rol: consulta[0].id_rol,id_usuario: consulta[0].id_usuario,cuenta:user, rol:consulta[0].rol,usuario:consulta[0].usuario}, process.env.TOKEN_PWD);
    }else{
      return respuesta.status(401).json({message: 'Usuario o contraseña incorrectos'});
    }
    respuesta.status(200).send({newToken,ip});
  } catch (error) {
    next(error)
  }
}

export const signUp   = async  (datos, respuesta, next) => {
  let {nombre,cuenta,password,tipo_acceso,datos_cuenta} = datos.query;

  try {
    if(!nombre || !cuenta || !password) throw new Error("Faltan datos obligatorios");
    let hash = crypto.createHash('sha256').update(password).digest('hex');

    let q = `select * from seguridad.pra_crud_usuario('I',0,'${nombre}','${cuenta}','${hash}','${tipo_acceso}','${datos_cuenta}',1,'PENDIENTE');`;

    const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

    const consulta = await da(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};