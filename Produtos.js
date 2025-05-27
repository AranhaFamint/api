const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/Produtos', (req, res) => {
    db.query('select * from Produtos', (err, results) => {
        if(err) {
             res.status(500).json({message: `Houve um erro ao recuperar os Produtos: ${JSON.stringify(err)}`});
        }
        res.status(200).json(results)
    })
});

app.get('/Produtos/:id', (req, res) => {
    const { id } = req.params;
    db.query('select * from Produtos where id = ?', [id], (err, results) => {
        if(err) {
             res.status(500).json({message: `Houve um erro ao recuperar os Produtos: ${JSON.stringify(err)}`});
        }
        res.status(200).json(results)
    })
});

app.post('/Produtos', (req, res) => {
    const { Nome, Descricao, Preco, Categoria, Estoque } = req.body;
        db.query('INSERT INTO Produtos (Nome, Descricao, Preco, Categoria, Estoque) VALUES (?, ?, ?, ?, ?)',
        [Nome, Descricao, Preco, Categoria, Estoque],
        (err, results) => {
            if(err) {
                res.status(500).json({message: `Houve um erro ao cadastrar o Produto: ${JSON.stringify(err)}`});
            }
            res.status(201).json(results)
    })
});

app.delete('/Produtos/:id', (req, res) => {
     const { id } = req.params;
     db.query('delete from Produtos where id = ?', [id], (err, results) => {
        if(err) {
            console.log(`Houve um erro ao deletar o Produto: ${err}`);
            res.status(500).json({message: `Houve um erro ao deletar o Produto: ${err}`});
        }
        res.status(200).json({message: `Produto deletado com sucesso!`});
     });
});

app.put('/Produtos/:id', (req, res) => {
     const { id } = req.params;
     const { Nome, Descricao, Preco, Categoria, Estoque} = req.body;
     db.query('update Produtos set Nome = ?, Descricao = ?, Preco = ?, Categoria = ?, Estoque = ? where id = ?', [Nome, Descricao, Preco, Categoria, Estoque, id], (err, results) => {
        if(err) {
            res.status(500).json(`Houve um erro ao atualizar algo da tabela de Produto`);
        }
        res.status(200).json({message: `Produto atualizado com sucesso!`});
     });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})