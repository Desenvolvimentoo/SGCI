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
    database: 'Forms',
    options: {
        encrypt: false,
        enableArithAbort: true
    }
};

app.post('/paradas', async (req, res) => {
    const { setor, consequencia, turno, tag, data_inicial, data_final, hora_inicial, hora_final, observacoes, nome, matricula, responsavel } = req.body;

    try {
        await sql.connect(sqlConfig);
        const result = await sql.query`INSERT INTO Paradas.dbo.fatoParadas 
        (Setor, Turno, VerificadoPor, DataInicio, HoraInicio, DataFinal, HoraFinal, Responsavel, TAG, Descricao, Nome, Matricula, Consequencia)
        VALUES (${setor}, ${turno}, ${null}, ${data_inicial}, ${hora_inicial}, ${data_final}, ${hora_final}, ${responsavel}, ${tag}, ${observacoes}, ${nome}, ${matricula}, ${consequencia})`;
        
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

app.post('/registro-producao-cavaco', async (req, res) => {
    const {
        data,
        consumo_cavaco,
        consumo_bagaco,
        consumo_residuo,
        lenha_utilizada,
        cavaco_produzido,
        consumo_energia_cavaco,
        outros_custos,
        observacoes,
        matricula,
        responsavel,
        turno
    } = req.body;

    try {
        await sql.connect(sqlConfig);
        const result = await sql.query`INSERT INTO Forms.dbo.registro_producao_cavaco 
        (data, consumo_cavaco_kg, consumo_bagaco_kg, consumo_residuo_kg, lenha_utilizada_t, cavaco_produzido_t, consumo_energia_kw, outros_custos_rs, observacoes, matricula, responsavel_turno, turno)
        VALUES (${data}, ${consumo_cavaco}, ${consumo_bagaco}, ${consumo_residuo}, ${lenha_utilizada}, ${cavaco_produzido}, ${consumo_energia_cavaco}, ${outros_custos}, ${observacoes}, ${matricula}, ${responsavel}, ${turno})`;
        
        res.status(201).send('Registro de produção inserido com sucesso');
    } catch (err) {
        console.error('Erro ao inserir dados:', err); 
        res.status(500).send('Erro ao inserir dados');
    } finally {
        sql.close();
    }
});

app.post('/registro-producao-caldeira', async (req, res) => {
    const {
        data,
        producao_energia,
        producao_vapor,
        consumo_vapor_turbina,
        consumo_energia_operacional,
        consumo_vapor_operacional,
        consumo_energia_picador,
        observacoes,
        matricula,
        responsavel,
        turno
    } = req.body;

    try {
        await sql.connect(sqlConfig);
        const result = await sql.query`INSERT INTO Forms.dbo.registro_producao_caldeira 
        (data, producao_energia_kw, producao_vapor_kg, consumo_vapor_turbina_kg, consumo_energia_operacional_kw, consumo_vapor_operacional_kg, consumo_energia_picador_kw, observacoes, matricula, responsavel_turno, turno)
        VALUES (${data}, ${producao_energia}, ${producao_vapor}, ${consumo_vapor_turbina}, ${consumo_energia_operacional}, ${consumo_vapor_operacional}, ${consumo_energia_picador}, ${observacoes}, ${matricula}, ${responsavel}, ${turno})`;
        
        res.status(201).send('Registro de produção da caldeira inserido com sucesso');
    } catch (err) {
        console.error('Erro ao inserir dados:', err); 
        res.status(500).send('Erro ao inserir dados');
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
