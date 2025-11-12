import {consulta as da} from '../connection/connexPostgres.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {OAuth2Client} from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const login = async (datos, respuesta, next) => {
  const {operacion,user,pass,new_pass} = datos.query

  if (operacion === 'G' && !pass) return respuesta.status(400).json({error: 'datos incompletos'});

  if(operacion === 'G' && user && pass){
    let ticket;
    try {
      ticket = await googleClient.verifyIdToken({
        idToken: pass,
        audience: process.env.GOOGLE_CLIENT_ID
      });
    } catch (e) {
      return res.status(401).json({ error: 'Token de Google inválido' });
    }

    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;
    const picture = payload.picture;

    user = `${email}|${name}|${picture}`;
    pass = googleId;
  }

  let hash = pass && operacion !='G'? crypto.createHash('sha256').update(pass).digest('hex') : null;
  let new_hash = new_pass ? crypto.createHash('sha256').update(new_pass).digest('hex') : null;

  const ip = datos.headers['x-forwarded-for'] || datos.socket.remoteAddress || null;
  let q =`select * from seguridad.pr_login ('${operacion}','${user}','${hash || pass}','${new_hash}','${ip}');`;
  let newToken = null;
  // let ip = null;
  try {
    // console.log(crypto.createHash('sha256').update(`${789456}#${'LIMS'}*`).digest('hex'))
    const consulta = await da(q);
    console.log("del login", consulta);
    if(consulta[0]){
      newToken = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60*60*8),cnx: consulta[0].id_con,id_rol: consulta[0].id_rol,id_usuario: consulta[0].id_usuario,cuenta:user, rol:consulta[0].rol}, process.env.TOKEN_PWD);
    }else{
      return respuesta.status(401).json({error: 'Usuario o contraseña incorrectos'});
    }
    respuesta.status(200).send({newToken,ip});
  } catch (error) {
    next(error)
  }
}