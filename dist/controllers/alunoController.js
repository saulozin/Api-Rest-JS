"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class AlunoController {
  //Store or Create
  async store(req, res) {
    try {
      const novoAluno = await _Aluno2.default.create(req.body);
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
      const alunos = await _Aluno2.default.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
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

      const aluno = await _Aluno2.default.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
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

      const aluno = await _Aluno2.default.findByPk(req.params.id);


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

      const aluno = await _Aluno2.default.findByPk(id);


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

exports. default = new AlunoController();
