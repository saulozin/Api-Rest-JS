import Aluno from '../models/Aluno';
import Photo from '../models/Photo';

class AlunoController {
  //Store or Create
  async store(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);
      const {id, nome, sobrenome, email, idade, peso, altura} = novoAluno
      return res.json({id, nome, sobrenome, email, idade, peso, altura});
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  //Index
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url', 'filename'],
        },
      });
      return res.json(alunos);
    }catch(e){
      return res.json(null);
    }
  }

  //Show
  async show(req, res) {
    try {

      if(!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const aluno = await Aluno.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url', 'filename'],
        },
      });

      if(!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      return res.json(aluno);
    }catch(e){
      if(!req.params.id) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
    }
  }

  //Update
  async update(req, res) {
    try {

      if(!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const aluno = await Aluno.findByPk(req.params.id);


      //const aluno = await Aluno.findByPk(req.userId);
      if(!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      const novosDados = await aluno.update(req.body);
      const {id, nome, sobrenome, email, idade, altura, peso} = novosDados;
      return res.json({id, nome, sobrenome, email, idade, altura, peso});
    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  //Delete
  async delete(req, res) {
    try {

      const {id} = req.params;
      if(!id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const aluno = await Aluno.findByPk(id);


      //const aluno = await Aluno.findByPk(req.userId);
      if(!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      await aluno.destroy();

      return res.json({ deletado: true });
      //const {id, nome, sobrenome, email, idade, altura, peso} = user
      //return res.json({id, nome, sobrenome, email, idade, altura, peso});
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

}

export default new AlunoController();
