const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/Pedidos', (req, res) => {
    db.query('select * from Pedidos', (err, results) => {
        if(err) {
             res.status(500).json({message: `Houve um erro ao recuperar os Pedidos: ${JSON.stringify(err)}`});
        }
        res.status(200).json(results)
    })
});

app.get('/Pedidos/:id', (req, res) => {
    const { id } = req.params;
    db.query('select * from Pedidos where id = ?', [id], (err, results) => {
        if(err) {
             res.status(500).json({message: `Houve um erro ao recuperar os Pedidos: ${JSON.stringify(err)}`});
        }
        res.status(200).json(results)
    })
});

app.post('/Pedidos', (req, res) => {
    const { Cliente_Id, Clt_Id, Data_Pedido, Valor_Total, Observacoes } = req.body;
        db.query('INSERT INTO Pedidos (Cliente_Id, Clt_Id, Data_Pedido, Valor_Total, Observacoes) VALUES (?, ?, ?, ?,?)',
        [Cliente_Id, Clt_Id, Data_Pedido, Valor_Total, Observacoes],
        (err, results) => {
            if(err) {
                res.status(500).json({message: `Houve um erro ao cadastrar o Pedido: ${JSON.stringify(err)}`});
            }
            res.status(201).json(results)
    })
});

app.delete('/Pedidos/:id', (req, res) => {
     const { id } = req.params;
     db.query('delete from Pedidos where id = ?', [id], (err, results) => {
        if(err) {
            console.log(`Houve um erro ao deletar o Pedido: ${err}`);
            res.status(500).json({message: `Houve um erro ao deletar o Pedido: ${err}`});
        }
        res.status(200).json({message: `Pedido deletado com sucesso!`});
     });
});

app.put('/Pedidos/:id', (req, res) => {
     const { id } = req.params;
     const { Cliente_Id, Clt_Id, Data_Pedido, Valor_Total, Observacoes} = req.body;
     db.query('update Pedidos set Cliente_Id = ?, Clt_Id = ?, Data_Pedido = ?, Valor_Total = ?, Observacoes = ? where id = ?', [Cliente_Id, Clt_Id, Data_Pedido, Valor_Total, Observacoes, id], (err, results) => {
        if(err) {
            res.status(500).json(`Houve um erro ao atualizar algo da tabela de Pedido`);
        }
        res.status(200).json({message: `Pedido atualizado com sucesso!`});
     });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})