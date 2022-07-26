const router = require('express').Router();
const Aluno = require("../models/aluno");

router.get("/unico/:id", async(req, res) => {
    try {
        console.log(req.params.id);
       const alunos = await Aluno.find({_id: req.params.id});
       return res.status(200).json(alunos);
    } catch (e) {
        return res.status(400).json({error: "Não foi possivel" + e})
    }
});

router.get("/todos", async(req, res) => {
    try {
       const alunos = await Aluno.find();
       return res.status(200).json(alunos);
    } catch (e) {
        return res.status(400).json({error: "Não foi possivel" + e})
    }
});

router.post("/cadastro", async(req,res) =>{
    try {
        const nome = req.body.nome;
        const idade = req.body.idade;
        const profissao = req.body.profissao;

        if (nome == null || idade == null || profissao == null) {
            return res.status(400).json({error: "preencha tudo"})
        }

        const aluno = new Aluno({
            nome: nome,
            idade: idade,
            profissao: profissao,
        })

        const newAluno = await aluno.save();

        return res.status(200).json(newAluno);

    } catch (e) {
        return res.status(400).json({error: "Não foi possivel" + e})
    }
});

module.exports = router;