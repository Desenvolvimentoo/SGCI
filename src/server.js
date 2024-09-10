const express = require('express');
const sql = require('mssql');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); 

const sqlConfig = {
    user: 'DesenvolvimentoLar',
    password: 'LarDB842',
    server: '192.168.176.19',
    database: 'Paradas',
    options: {
        encrypt: false,
        enableArithAbort: true
    }
};

app.post('/paradas', async (req, res) => {
    const { setor, consequencia, turno, tag, data_inicial, data_final, hora_inicial, hora_final, observacoes } = req.body;

    try {
        await sql.connect(sqlConfig);
        const result = await sql.query`INSERT INTO Forms.dbo.paradas_producao (setor, consequencia, turno, tag, data_inicial, data_final, hora_inicial, hora_final, observacoes)
                                       VALUES (${setor}, ${consequencia}, ${turno}, ${tag}, ${data_inicial}, ${data_final}, ${hora_inicial}, ${hora_final}, ${observacoes})`;

        res.status(201).send('Dados inseridos com sucesso');
    } catch (err) {
        console.error('Erro ao inserir dados:', err); 
        res.status(500).send('Erro ao inserir dados');
    } finally {
        sql.close();
    }
});



app.get('/tags', async (req, res) => {
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query('SELECT TAG FROM dbo.dimMaquina');
        
        res.json(result.recordset.map(row => row.TAG));
    } catch (err) {
        console.error('Erro ao buscar tags:', err);
        res.status(500).send('Erro ao buscar tags');
    } finally {
        sql.close();
    }
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
