'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/main-teste', 'TesteController.index');

Route.get('/eventos', 'EventoController.index');

Route.group(() => {
  Route.get('', 'EventoController.index');
  Route.get('/:id', 'EventoController.eventoById');
  Route.get('/:type/:param', 'EventoController.eventoBy')

  Route.post('', 'EventoController.store')
}).prefix('eventos')
