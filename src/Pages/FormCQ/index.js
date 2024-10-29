import React, { useState, useEffect } from 'react';
import './style.css';
import logo_lar from './img/logo_lar.png';
import voltar from './img/voltar.png';

const FormCQ = () => {
    const api = 'http://192.168.156.17:3001';
    const [mensagem, setMensagem] = useState(''); 
    const [formData, setFormData] = useState({
        nome: '',
        matricula: '',
        turno: '',
        acidez_923a: '',
        saboes_923a: '',
        peroxido_923a: '',
        umidade_923a: '',
        clorofila_923a: '',
        acidez_923b: '',
        saboes_923b: '',
        peroxido_923b: '',
        umidade_923b: '',
        clorofila_923b: '',
        acidez_923c: '',
        saboes_923c: '',
        peroxido_923c: '',
        umidade_923c: '',
        clorofila_923c: '',
        proteina_soja: '',
        proteina_bruta_farelo: '',
        proteina_bruta_casca: '',
        proteina_soluvel_farelo: '',
        oleo_soja: '',
        oleo_farelo: '',
        oleo_casca: '',
        oleo_farelo_lex: '',
        umidade_soja: '',
        umidade_farelo: '',
        umidade_casca: '',
        urease_farelo: '',
        responsavel: '',
        observacoes: ''
    });

    const limparCampos = () =>{
        setFormData({
            nome: '',
            matricula: '',
            turno: '',
            acidez_923a: '',
            saboes_923a: '',
            peroxido_923a: '',
            umidade_922a: '',
            clorofila_923a: '',
            acidez_923b: '',
            saboes_923b: '',
            peroxido_923b: '',
            umidade_923b: '',
            clorofila_923b: '',
            acidez_923c: '',
            saboes_923c: '',
            peroxido_923c: '',
            umidade_923c: '',
            clorofila_923c: '',
            proteina_soja: '',
            proteina_bruta_farelo: '',
            proteina_bruta_casca: '',
            proteina_soluvel_farelo: '',
            oleo_soja: '',
            oleo_farelo: '',
            oleo_casca: '',
            oleo_farelo_lex: '',
            umidade_soja: '',
            umidade_farelo: '',
            umidade_casca: '',
            urease_farelo: '',
            responsavel: '',
            observacoes: ''
        });
    }

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const responseCQ = await fetch(api + '/registro-analise-cq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: new Date().toISOString().split('T')[0],
                    turno: formData.turno,
                    observacao: formData.observacoes,
                    responsavel_turno: formData.responsavel
                })
            });
    
            if (!responseCQ.ok) {
                const errorText = await responseCQ.text();
                throw new Error(`Erro ao inserir dados em registro_analise_cq: ${errorText}`);
            }
    
            const data = await responseCQ.json();
            const id_cq = data.id_cq;
            
            await fetch(api+'/tq-923a', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_cq,
                    acidez: formData.acidez_923a,
                    saboes: formData.saboes_923a,
                    peroxido: formData.peroxido_923a,
                    umidade: formData.umidade_923a,
                    clorofila: formData.clorofila_923a
                })
            });

            await fetch(api+'/tq-923b', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_cq,
                    acidez: formData.acidez_923b,
                    saboes: formData.saboes_923b,
                    peroxido: formData.peroxido_923b,
                    umidade: formData.umidade_923b,
                    clorofila: formData.clorofila_923b
                })
            });

            await fetch(api+'/tq-923c', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_cq,
                    acidez: formData.acidez_923c,
                    saboes: formData.saboes_923c,
                    peroxido: formData.peroxido_923c,
                    umidade: formData.umidade_923c,
                    clorofila: formData.clorofila_923c
                })
            });

            await fetch(api+'/qualidade-processo-24h', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_cq,
                    proteina_soja: parseFloat(formData.proteina_soja) || 0,
                    proteina_bruta_farelo: parseFloat(formData.proteina_bruta_farelo) || 0,
                    proteina_bruta_casca: parseFloat(formData.proteina_bruta_casca) || 0,
                    proteina_soluvel_farelo: parseFloat(formData.proteina_soluvel_farelo) || 0,
                    oleo_soja: parseFloat(formData.oleo_soja) || 0,
                    oleo_farelo: parseFloat(formData.oleo_farelo) || 0,
                    oleo_casca: parseFloat(formData.oleo_casca) || 0,
                    oleo_farelo_lex: parseFloat(formData.oleo_farelo_lex) || 0,
                    umidade_soja: parseFloat(formData.umidade_soja) || 0,
                    umidade_farelo: parseFloat(formData.umidade_farelo) || 0,
                    umidade_casca: parseFloat(formData.umidade_casca) || 0,
                    urease_farelo: parseFloat(formData.urease_farelo) || 0
                })
                
            });
            limparCampos()
            setMensagem('Análises CQ enviados com sucesso!');
        } catch (error) {
            console.error('Erro ao inserir dados:', error);
            setMensagem('Erro ao enviar dados!');
        }
    };
    return (
        <div className="form-container">
            <button className="voltar-button" onClick={() => window.history.back()}>
                <img src={voltar} alt="Voltar" className="voltar" />
            </button>
            <img src={logo_lar} alt="Logo" className="logo" />
            <h2 className="form-title">Análises CQ</h2>
            <form className="form-content" onSubmit={handleSubmit}>
                <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="nome">Usuário</label>
                            <input 
                                type="text" 
                                name="nome" 
                                readOnly
                                value={formData.nome} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="matricula">Matrícula</label>
                            <input 
                                type="number" 
                                name="matricula" 
                                readOnly
                                value={formData.matricula} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="turno">Turno</label>
                            <select  
                            name='turno'
                            value={formData.turno}                         
                            onChange={handleChange} >
                            <option value=''>Selecionar</option>
                            <option value='A'>A</option>
                            <option value='B'>B</option>
                            <option value='C'>C</option>
                            </select>
                        </div>
                    </div>
                    <div className="section">
                    <h3>Qualidade TQ 923A</h3>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="acidez_923a">Acidez</label>
                            <input 
                                type="number" 
                                name="acidez_923a" 
                                value={formData.acidez_923a} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="saboes_923a">Sabões</label>
                            <input 
                                type="number" 
                                name="saboes_923a" 
                                value={formData.saboes_923a} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="peroxido_923a">Peróxido</label>
                            <input 
                                type="number" 
                                name="peroxido_923a" 
                                value={formData.peroxido_923a} 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="umidade_923a">Umidade</label>
                            <input 
                                type="number" 
                                name="umidade_923a" 
                                value={formData.umidade_923a} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="clorofila_923a">Clorofila</label>
                            <input 
                                type="number" 
                                name="clorofila_923a" 
                                value={formData.clorofila_923a} 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                    <div className="section">
                        <h3>Qualidade TQ 923B</h3>
                        <div className="form-pair">
                            <div className="form-group">
                                <label htmlFor="acidez_923b">Acidez</label>
                                <input 
                                    type="number" 
                                    name="acidez_923b" 
                                    value={formData.acidez_923b} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="saboes_923b">Sabões</label>
                                <input 
                                    type="number" 
                                    name="saboes_923b" 
                                    value={formData.saboes_923b} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="peroxido_923b">Peróxido</label>
                                <input 
                                    type="number" 
                                    name="peroxido_923b" 
                                    value={formData.peroxido_923b} 
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-pair">
                            <div className="form-group">
                                <label htmlFor="umidade_923b">Umidade</label>
                                <input 
                                    type="number" 
                                    name="umidade_923b" 
                                    value={formData.umidade_923b} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="clorofila_923b">Clorofila</label>
                                <input 
                                    type="number" 
                                    name="clorofila_923b"
                                    value={formData.clorofila_923b} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                </div>
                <div className="section">
                    <h3>Qualidade TQ 923C</h3>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="acidez_923c">Acidez</label>
                            <input 
                                type="number" 
                                name="acidez_923c" 
                                value={formData.acidez_923c} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="saboes_923c">Sabões</label>
                            <input 
                                type="number" 
                                name="saboes_923c" 
                                value={formData.saboes_923c} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="peroxido_923c">Peróxido</label>
                            <input 
                                type="number" 
                                name="peroxido_923c" 
                                value={formData.peroxido_923c} 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="umidade_923c">Umidade</label>
                            <input 
                                type="number" 
                                name="umidade_923c" 
                                value={formData.umidade_923c} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="clorofila_923c">Clorofila</label>
                            <input 
                                type="number" 
                                name="clorofila_923c" 
                                value={formData.clorofila_923c} 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <h3>Qualidade do Processo - 24h</h3>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="proteina_soja">Proteína de Soja</label>
                            <input 
                                type="number" 
                                name="proteina_soja" 
                                value={formData.proteina_soja} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="proteina_bruta_farelo">Proteína Bruta de Farelo</label>
                            <input 
                                type="number" 
                                name="proteina_bruta_farelo" 
                                value={formData.proteina_bruta_farelo} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="proteina_bruta_casca">Proteína Bruta de Casca</label>
                            <input 
                                type="number" 
                                name="proteina_bruta_casca" 
                                value={formData.proteina_bruta_casca} 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="proteina_soluvel_farelo">Proteína Solúvel de Farelo</label>
                            <input 
                                type="number" 
                                name="proteina_soluvel_farelo" 
                                value={formData.proteina_soluvel_farelo} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="oleo_soja">Óleo na Soja</label>
                            <input 
                                type="number" 
                                name="oleo_soja" 
                                value={formData.oleo_soja} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="oleo_farelo">Óleo no Farelo</label>
                            <input 
                                type="number" 
                                name="oleo_farelo" 
                                value={formData.oleo_farelo} 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="oleo_casca">Óleo na Casca</label>
                            <input 
                                type="number" 
                                name="oleo_casca" 
                                value={formData.oleo_casca} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="oleo_farelo_lex">Óleo no Farelo Lex</label>
                            <input 
                                type="number" 
                                name="oleo_farelo_lex" 
                                value={formData.oleo_farelo_lex} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="umidade_soja">Umidade na Soja</label>
                            <input 
                                type="number" 
                                name="umidade_soja" 
                                value={formData.umidade_soja} 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="umidade_farelo">Umidade no Farelo</label>
                            <input 
                                type="number" 
                                name="umidade_farelo" 
                                value={formData.umidade_farelo} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="umidade_casca">Umidade na Casca</label>
                            <input 
                                type="number" 
                                name="umidade_casca" 
                                value={formData.umidade_casca} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="urease_farelo">Urease no Farelo</label>
                            <input 
                                type="number" 
                                name="urease_farelo" 
                                value={formData.urease_farelo} 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                        <label htmlFor="responsavel">Responsável pelo Turno</label>
                        <input 
                            type="text" 
                            name="responsavel"  
                            value={formData.responsavel} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="obs-group">
                        <label htmlFor="observacoes">Observações</label>
                        <textarea 
                            name="observacoes" 
                            rows="4"
                            value={formData.observacoes} 
                            onChange={handleChange}
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
    );
};

export default FormCQ;

