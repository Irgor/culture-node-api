'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Hash = use('Hash');
const Database = use('Database')
const Usuario = use('App/Models/Usuario');

class UsuarioController {
  
  async index () {
    const users = await Usuario.all();
    
    return users;
  }
 
  async userById({request}){
    const id = request.params.id;
    let user = await Usuario.find(id);

    return {user};
  }

  async store ({ request }) {
    let data = request.body;
    data.senhaUsuario = await Hash.make(data.senhaUsuario, );

    let emailExist = await Usuario.findBy('emailusuario', data.emailUsuario);
    
    if(emailExist){
      return { error: 'Email já cadastrado'}
    }

    const user = await Usuario.create(data);

    return user;
  }
  
  async login ({ request }){
    let data = request.body;

    let usuario =  await Database.table('usuario').where('emailusuario', data.emailUsuario).first();

    if(usuario){
      let senhaUsuario = data.senhaUsuario;
      let senhaUsuarioHash = usuario.senhaUsuario;
      
      const isSame = await Hash.verify(senhaUsuario, senhaUsuarioHash)
      
      if(isSame){
        return {login:isSame, usuario};
      }else{
        return {login:'false', error: 'Senha invalido'}
      }
    }
    return {login:'false', error: 'Email invalido'}
    
  }

  async show ({ params, request, response, view }) {
  }
  
  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = UsuarioController
