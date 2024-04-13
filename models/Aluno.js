const mongoose = require('mongoose')

const schema = mongoose.Schema({
    nome: String,
    turna: {
        type: String,
        enum: ["A", "B", "C", "D", "E"]
    },
    notas: [{
        type: Number,
        min: [0, 'Não pode haver nota menor 0'],
        max: [10, 'Não pode haver nota mai or 10'],
    }], 
    
    media: Number
})

const Aluno = mongoose.model('Aluno', schema)

module.exports = Aluno