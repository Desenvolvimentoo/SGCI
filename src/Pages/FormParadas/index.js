import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fotoLar from './img/logo_lar.png';
import voltar from './img/voltar.png';

const FormParadas = () => {
    const api = 'http://192.168.156.17:3001';
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({
        setor: '',
        consequencia: '',
        turno: '',
        tag: '',
        data_inicial: '',
        data_final: '',
        hora_inicial: '',
        hora_final: '',
        observacoes: '',
        nome: '',           
        matricula: '',      
        responsavel: '',    
    });

    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        axios.get(api+'/tags')
            .then(response => {
                setTags(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar tags:', error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação: Verifica se todos os campos estão preenchidos
        const {
            setor,
            consequencia,
            turno,
            tag,
            data_inicial,
            data_final,
            hora_inicial,
            hora_final,
            observacoes,
            nome,
            matricula,
            responsavel
        } = formData;

        if (
            !setor || !consequencia || !turno || !tag || !data_inicial || !data_final || 
            !hora_inicial || !hora_final || !observacoes || !nome || !matricula || !responsavel
        ) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        axios.post(api+'/paradas', formData)
            .then(response => {
                console.log('Dados salvos com sucesso:', response.data);
                setFormData({
                    setor: '',
                    consequencia: '',
                    turno: '',
                    tag: '',
                    data_inicial: '',
                    data_final: '',
                    hora_inicial: '',
                    hora_final: '',
                    observacoes: '',
                    nome: '',           
                    matricula: '',      
                    responsavel: ''  
                });
                setSuccessMessage('Dados inseridos com sucesso!');
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch(error => {
                console.error('Erro ao salvar dados:', error);
            });
    };

    return (
        <div>
            <div className="form-container">
                <button className="voltar-button" onClick={() => window.history.back()}>
                    <img src={voltar} alt='Voltar' className='voltar' />
                </button>
                <img src={fotoLar} alt="Logo" className="logo" />
                <h2>Paradas de Produção</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="matricula">Matricula</label>
                            <input type="number" name="matricula" value={formData.matricula} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="setor">Setor</label>
                            <select name="setor" value={formData.setor} onChange={handleChange}>
                                <option value="">Selecionar</option>
                                <option value="Esmagamento">Esmagamento</option>
                                <option value="Biodiesel">Biodiesel</option>
                                <option value="Caldeira">Caldeira</option>
                                <option value="Cogeração">Cogeração</option>
                                <option value="Operacional">Operacional</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="consequencia">Consequência</label>
                            <select name="consequencia" value={formData.consequencia} onChange={handleChange}>
                                <option value="">Selecionar</option>
                                <option value="Parada de Produção">Parada de Produção</option>
                                <option value="Redução de Produção">Redução de Produção</option>
                                <option value="Parada de Máquina">Parada de Máquina</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="turno">Turno</label>
                            <select name="turno" value={formData.turno} onChange={handleChange}>
                                <option value="">Selecionar</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="tag">TAG</label>
                            <select name="tag" value={formData.tag} onChange={handleChange}>
                                <option value="">Selecionar</option>
                                {tags.map((tag, index) => (
                                    <option key={index} value={tag}>{tag}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="data_inicial">Data Inicial</label>
                            <input type="date" name="data_inicial" value={formData.data_inicial} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="data_final">Data Final</label>
                            <input type="date" name="data_final" value={formData.data_final} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="hora_inicial">Hora Inicial</label>
                            <input type="time" name="hora_inicial" value={formData.hora_inicial} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="hora_final">Hora Final</label>
                            <input type="time" name="hora_final" value={formData.hora_final} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="responsavel">Responsável</label>
                            <select name="responsavel" value={formData.responsavel} onChange={handleChange}>
                                <option value="">Selecionar</option>
                                <option value="automacao">Automação</option>
                                <option value="biomassa">Biomassa</option>
                                <option value="caldeira">Caldeira</option>
                                <option value="cogeracao">Cogeração</option>
                                <option value="eletrica">Elétrica</option>
                                <option value="instrumentacao">Instrumentação</option>
                                <option value="mecanica">Mecânica</option>
                                <option value="operacao">Operação</option>
                                <option value="ParadaProgramada">Parada Programada</option>
                                <option value="ProducaoEsmagamento">Producao/Esmagamento</option>
                                <option value="ti">TI</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="obs-group">
                        <label htmlFor="observacoes">Observações</label>
                        <textarea name="observacoes" rows="4" value={formData.observacoes} onChange={handleChange}></textarea>
                    </div>

                    <div className="buttons">
                        <button type="submit">Salvar</button>
                    </div>
                </form>
                {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
        </div>
    );
};

export default FormParadas;
