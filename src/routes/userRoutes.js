import {Router} from 'express';
import userController from '../controllers/userController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

//router.get('/', userController.index); //Obs: Geralmente não deveria existir essa rota em uma aplicação real
//router.get('/:id', userController.show); //Obs: Geralmente não deveria existir essa rota em uma aplicação real

router.post('/', loginRequired, userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;

/**
 * index > lista todos os usuários > GET
 * create/store > cria um usuário > POST
 * delete > deleta um usuário > DELETE
 * show > mostra um usuário > GET
 * update > atualiza um usuário > PATCH ou PUT
 */
