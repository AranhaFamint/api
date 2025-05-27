const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/Pedido_Itens', (req, res) => {
    db.query('select * from Pedido_Itens', (err, results) => {
        if(err) {
             res.status(500).json({message: `Houve um erro ao recuperar os itens do pedido: ${JSON.stringify(err)}`});
        }
        res.status(200).json(results)
    })
});

app.get('/Pedido_Itens/:id', (req, res) => {
    const { id } = req.params;
    db.query('select * from Pedido_Itens where id = ?', [id], (err, results) => {
        if(err) {
             res.status(500).json({message: `Houve um erro ao recuperar os itens do Pedido: ${JSON.stringify(err)}`});
        }
        res.status(200).json(results)
    })
});

app.post('/Pedido_Itens', (req, res) => {
    const { Pedido_Id, Produto_Id, Quantidade, Preco_Unitario } = req.body;
        db.query('INSERT INTO Pedido_Itens (Pedido_Id, Produto_Id, Quantidade, Preco_Unitario) VALUES (?, ?, ?, ?)',
        [Pedido_Id, Produto_Id, Quantidade, Preco_Unitario],
        (err, results) => {
            if(err) {
                res.status(500).json({message: `Houve um erro ao cadastrar os itens do Pedido: ${JSON.stringify(err)}`});
            }
            res.status(201).json(results)
    })
});

app.delete('/Pedido_Itens/:id', (req, res) => {
     const { id } = req.params;
     db.query('delete from Pedido_Itens where id = ?', [id], (err, results) => {
        if(err) {
            console.log(`Houve um erro ao deletar os itens do Pedido: ${err}`);
            res.status(500).json({message: `Houve um erro ao deletar os itens do Pedido: ${err}`});
        }
        res.status(200).json({message: `Itens deletado com sucesso!`});
     });
});

app.put('/Pedido_Itens/:id', (req, res) => {
     const { id } = req.params;
     const { Pedido_Id, Produto_Id, Quantidade, Preco_Unitario} = req.body;
     db.query('update Pedido_Itens set Pedido_Id = ?, Produto_Id = ?, Quantidade = ?, Preco_Unitario = ? where id = ?', [Pedido_Id, Produto_Id, Quantidade, Preco_Unitario, id], (err, results) => {
        if(err) {
            res.status(500).json(`Houve um erro ao atualizar algo da tabela de Pedido`);
        }
        res.status(200).json({message: `Pedido atualizado com sucesso!`});
     });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})