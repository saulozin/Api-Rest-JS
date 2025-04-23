import User from '../models/User';

class UserController {
  //Store or Create
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const {id, nome, email} = novoUser
      return res.json({id, nome, email});
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  //Index
  async index(req, res) {
    try {
      const users = await User.findAll({attributes: ['id', 'nome', 'email']});
      return res.json(users);
    }catch(e){
      return res.json(null);
    }
  }

  //Show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      const {id, nome, email} = user;
      return res.json({id, nome, email});
    }catch(e){
      return res.json(null);
    }
  }

  //Update
  async update(req, res) {
    try {
      /*
      const {id} = req.params;
      if(!id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const user = await User.findByPk(id);
      */

      const user = await User.findByPk(req.userId);
      if(!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await user.update(req.body);
      const {id, nome, email} = novosDados;
      return res.json({id, nome, email});
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  //Delete
  async delete(req, res) {
    try {
      /*
      const {id} = req.params;
      if(!id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const user = await User.findByPk(id);
      */

      const user = await User.findByPk(req.userId);
      if(!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy();

      return res.json(null);
      //const {id, nome, email} = user
      //return res.json({id, nome, email});
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();

/**
 * index > lista todos os usuários > GET
 * create/store > cria um usuário > POST
 * delete > deleta um usuário > DELETE
 * show > mostra um usuário > GET
 * update > atualiza um usuário > PATCH ou PUT
 */
