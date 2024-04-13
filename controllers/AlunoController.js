const { json } = require("express");
const Aluno = require("../models/Aluno")

const AlunoController = {
    getAll: async (req, res) => {
        const filtros = {}
        const campos = Object.keys(Aluno.schema.paths)

        for(let campo in req.query){
            if(campos.includes(campo)){
                filtros[campo] = {$regex: new RegExp(req.query[campo], 'i') }
            }
        }

        res.json(await Aluno.find(filtros))
    },
    get: async (req, res) => {
        try {
            res.json(await Aluno.findById(req.params.id))
        } catch (error) {
            res.status(404).json({error: 'Registro não encontrado'})
        }
    },
    getAprovados: async (req, res) =>{
        res.json(await Aluno.find({media :{$gte: 7}} ))
    },
    getReprovados: async (req, res) =>{
        res.json(await Aluno.find({media :{$lt: 5}} ))
    },
    getRecuperacao: async (req, res) =>{
        res.json(await Aluno.find({media :{$gte: 7, $lt: 5}} ))
    },
    create: async (req, res) => {
        try {

            let soma = 0
            const alunos = req.body
            for(let n of req.body.notas){
                soma +=n
            }

            const media = soma / notas.length

            alunos.media = media


            res.json(await Aluno.create(alunos))
        } catch (error) {
            res.status(400).json(error)
        }
    },
    update: async (req, res) => {
        try {
            res.json(await Aluno.updateMany({turma: "E"}, {turma: "B"}))
        } catch (error) {
            res.status(404).json({error: 'Registro não encontrado'})
        }
    },
    delete: async (req, res) => {
        try {
            res.json(await Aluno.deleteMany({nome : "Teste"}))
        } catch (error) {
            res.status(404).json({error: 'Registro não encontrado'})
        }
    },
}

module.exports = AlunoController 