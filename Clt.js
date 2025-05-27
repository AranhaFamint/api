const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/Clt', (req, res) => {
    db.query('select * from Clt', (err, results) => {
        if(err) {
             res.status(500).json({message: `Houve um erro ao recuperar os Clts: ${JSON.stringfy(err)}`});
        }
        res.status(200).json(results)
    })
});

app.get('/Clt/:id', (req, res) => {
    const { id } = req.params;
    db.query('select * from Clt where id = ?', [id], (err, results) => {
        if(err) {
             res.status(500).json({message: `Houve um erro ao recuperar os Clts: ${JSON.stringify(err)}`});
        }
        res.status(200).json(results)
    })
});

app.post('/Clt', (req, res) => {
    const { Nome_Completo, Email, Senha, Cargo, Data_Cadastro, Ativo } = req.body;
        db.query('INSERT INTO Clt (Nome_Completo, Email, Senha, Cargo, Data_Cadastro, Ativo) VALUES (?, ?, ?, ?, ?, ?)',
        [Nome_Completo, Email, Senha, Cargo, Data_Cadastro, Ativo],
        (err, results) => {
            if(err) {
                res.status(500).json({message: `Houve um erro ao cadastrar o Clt: ${JSON.stringify(err)}`});
            }
            res.status(201).json(results)
    })
});

app.delete('/Clt/:id', (req, res) => {
     const { id } = req.params;
     db.query('delete from Clt where id = ?', [id], (err, results) => {
        if(err) {
            console.log(`Houve um erro ao deletar o Clt: ${err}`);
            res.status(500).json({message: `Houve um erro ao deletar o Clt: ${err}`});
        }
        res.status(200).json({message: `Clt deletado com sucesso!`});
     });
});

app.put('/Clt/:id', (req, res) => {
     const { id } = req.params;
     const { Nome_Completo, Email, Senha, Cargo, Data_Cadastro, Ativo} = req.body;
     db.query('update Clt set Nome_Completo = ?, Email = ?, Senha = ?, Cargo = ?, Data_Cadastro = ?, Ativo = ? where id = ?', [Nome_Completo, Email, Senha, Cargo, Data_Cadastro, Ativo, id], (err, results) => {
        if(err) {
            res.status(500).json(`Houve um erro ao atualizar algo da tabela de Clt`);
        }
        res.status(200).json({message: `Clt atualizado com sucesso!`});
     });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})