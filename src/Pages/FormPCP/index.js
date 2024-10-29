import React, { useState, useEffect } from 'react';
import './style.css';
import logo_lar from './img/logo_lar.png';
import voltar from './img/voltar.png';

const FormPCP = () => {
    const api = 'http://192.168.156.17:3001';
    const [mensagem, setMensagem] = useState(''); 
    const [formData, setFormData] = useState({
        data: '',
        nome: '',           
        matricula: '',
        farelo_45: '',
        farelo_46: '',
        farelo_48: '',
        casca: '',
        oleo_degomado: '',
        producao_oleo: '',
        farelo_balanco: '',
        casca_balanco: '',
        soja_corrigida: '',
        umidade_usada: '',
        rendimento_oleo: '',
        rendimento_farelo: '',
        rendimento_casca: '',
        responsavel_sicop: '',
        observacoes: ''
    });

    

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Atualiza o estado do campo atual
        setFormData(prevData => {
            const updatedData = {
                ...prevData,
                [name]: value
            };

            // Cálculo automático dos rendimentos
            if (updatedData.soja_corrigida) {
                if (updatedData.farelo_balanco) {
                    updatedData.rendimento_farelo = ((updatedData.farelo_balanco / updatedData.soja_corrigida) * 100).toFixed(2);
                }
                if (updatedData.producao_oleo) {
                    updatedData.rendimento_oleo = ((updatedData.producao_oleo / updatedData.soja_corrigida) * 100).toFixed(2);
                }
                if (updatedData.casca_balanco) {
                    updatedData.rendimento_casca = ((updatedData.casca_balanco / updatedData.soja_corrigida) * 100).toFixed(2);
                }
            }

            return updatedData;
        });
    };

    // Carrega nome e matrícula do localStorage ao iniciar
    useEffect(() => {
        const nome = localStorage.getItem('nome');
        const matricula = localStorage.getItem('matricula');
    
        if (nome && matricula) {
            setFormData((prevData) => ({
                ...prevData,
                nome,
                matricula,
            }));
        }
    }, []);

    // Envia o formulário para o backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(api+'/registro-embarque-pcp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setMensagem('Embarques enviados com sucesso!');
                setFormData({ 
                    data: '',
                    nome: formData.nome,
                    matricula: formData.matricula,
                    farelo_45: '',
                    farelo_46: '',
                    farelo_48: '',
                    casca: '',
                    oleo_degomado: '',
                    producao_oleo: '',
                    farelo_balanco: '',
                    casca_balanco: '',
                    soja_corrigida: '',
                    umidade_usada: '',
                    rendimento_oleo: '',
                    rendimento_farelo: '',
                    rendimento_casca: '',
                    responsavel_sicop: '',
                    observacoes: ''
                });
            } else {
                setMensagem('Erro ao inserir Registro');
            }
        } catch (err) {
            console.error('Erro ao enviar dados:', err);
            setMensagem('Erro ao enviar dados!');
        }
    };

    return (
        <div>
            <div className="form-container">
                <button className="voltar-button" onClick={() => window.history.back()}>
                    <img src={voltar} alt='Voltar' className='voltar' />
                </button>
                <img src={logo_lar} alt="Logo" className="logo" /> 
                <h2>Embarque de Produtos</h2>

                <form onSubmit={handleSubmit}>
                <div className="form-pair">
                    <div className="form-group">
                        <label htmlFor="data">Data</label>
                        <input 
                            type="date" 
                            name="data" 
                            value={formData.data} onChange={handleChange}
                        />
                    </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input 
                                type="text" 
                                name="nome" 
                                readOnly value={formData.nome} onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="matricula">Matrícula</label>
                            <input 
                                type="number" 
                                name="matricula" 
                                readOnly value={formData.matricula} onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="farelo_45">Farelo 45%</label>
                            <input 
                                type="number" 
                                name="farelo_45" 
                                value={formData.farelo_45} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="farelo_46">Farelo 46%</label>
                            <input 
                                type="number" 
                                name="farelo_46" 
                                value={formData.farelo_46} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="farelo_48">Farelo 48%</label>
                            <input 
                                type="number" 
                                name="farelo_48" 
                                value={formData.farelo_48} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="casca">Casca</label>
                            <input 
                                type="number" 
                                name="casca" 
                                value={formData.casca} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="oleo_degomado">Óleo Degomado</label>
                            <input 
                                type="number" 
                                name="oleo_degomado" 
                                value={formData.oleo_degomado} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                    <div className="form-group">
                            <label htmlFor="producao_oleo">Produção de Óleo po Medição de TQ</label>
                            <input 
                                type="number" 
                                name="producao_oleo" 
                                value={formData.producao_oleo} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="farelo_balanco">Produção de Farelo por Balanço de Massa</label>
                            <input 
                                type="number" 
                                name="farelo_balanco" 
                                value={formData.farelo_balanco} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="casca_balanco">Produção de Casca por Balanço de Massa</label>
                            <input 
                                type="number" 
                                name="casca_balanco" 
                                value={formData.casca_balanco} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="soja_corrigida">Soja Processada Corrigida</label>
                            <input 
                                type="number" 
                                name="soja_corrigida" 
                                value={formData.soja_corrigida} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="umidade_usada">Umidade Usada Para Correção da Soja</label>
                        <input 
                            type="number" 
                            name="umidade_usada" 
                            value={formData.umidade_usada} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="rendimento_oleo">Rendimento Óleo</label>
                            <input 
                                type="number" 
                                name="rendimento_oleo" 
                                value={formData.rendimento_oleo} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rendimento_farelo">Rendimento Farelo</label>
                            <input 
                                type="number" 
                                name="rendimento_farelo" 
                                value={formData.rendimento_farelo} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rendimento_casca">Rendimento Casca</label>
                            <input 
                                type="number" 
                                name="rendimento_casca" 
                                value={formData.rendimento_casca} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="responsavel_sicop">Responsável pelo Lançamento no Sicop</label>
                        <input 
                            type="text" 
                            name="responsavel_sicop" 
                            value={formData.responsavel_sicop} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="obs-group">
                        <label htmlFor="observacoes">Observações</label>
                        <textarea 
                            name="observacoes" 
                            value={formData.observacoes} 
                            onChange={handleChange} 
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="buttons">
                        <button type="submit">Salvar</button>
                    </div>
                    {mensagem && (
                        <div className="mensagem">
                            {mensagem}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default FormPCP;
