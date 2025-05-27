const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/clientes', (req, res) => {
    db.query('select * from clientes', (err, results) => {
        if(err) {
             res.status(500).json({message: `Houve um erro ao recuperar os clientes: ${JSON.stringify(err)}`});
        }
        res.status(200).json(results)
    })
});

app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    db.query('select * from clientes where id = ?', [id], (err, results) => {
        if(err) {
             res.status(500).json({message: `Houve um erro ao recuperar os clientes: ${JSON.stringify(err)}`});
        }
        res.status(200).json(results)
    })
});

app.post('/clientes', (req, res) => {
    const { Nome_Completo, Cpf, Telefone } = req.body;
        db.query('INSERT INTO clientes (Nome_Completo, Cpf, Telefone) VALUES (?, ?, ?)',
        [Nome_Completo, Cpf, Telefone],
        (err, results) => {
            if(err) {
                res.status(500).json({message: `Houve um erro ao cadastrar o cliente: ${JSON.stringify(err)}`});
            }
            res.status(201).json({message: 'Cliente cadastrado com sucesso!'});
        
    })
});

app.delete('/clientes/:id', (req, res) => {
     const { id } = req.params;
     db.query('delete from clientes where id = ?', [id], (err, results) => {
        if(err) {
            console.log(`Houve um erro ao deletar o cliente: ${err}`);
            res.status(500).json({message: `Houve um erro ao deletar o cliente: ${err}`});
        }
        res.status(200).json({message: `Cliente deletado com sucesso!`});
     });
});

app.put('/clientes/:id', (req, res) => {
     const { id } = req.params;
     const { Nome_Completo, Cpf, Telefone} = req.body;
     db.query('update clientes set Nome_Completo = ?, Cpf = ?, Telefone = ? where id = ?', [Nome_Completo, Cpf, Telefone, id], (err, results) => {
        if(err) {
            res.status(500).json(`Houve um erro ao atualizar algo da tabela de clientes`);
        }
        res.status(200).json({message: `Cliente atualizado com sucesso!`});
     });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})