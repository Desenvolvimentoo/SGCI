import './style.css';
import logo_lar from './img/logo_lar.png';
import voltar from './img/voltar.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

const FormEsmagamento = () => {
    const api = 'http://192.168.156.17:3001';
    const [formData, setFormData] = useState({
        data: '',
        turno: '',
        usuario: '',
        matricula: '',
        producao_balanca_fluxo: '',
        producao_estimada: '',
        oleo_extracao: '',
        tanque_a_hexano: '',
        tanque_b_hexano: '',
        tanque_c_hexano: '',
        consumo_hexano: '',
        vapor_consumido_preparacao: '',
        vapor_consumido_extracao: '',
        responsavel_turno: '',
        observacoes: ''
    });

    useEffect(() => {
        const usuario = localStorage.getItem('nome');
        const matricula = localStorage.getItem('matricula');

    
        if (usuario && matricula) {
            setFormData((prevData) => ({
                ...prevData,
                usuario,
                matricula,
            }));
        }
    }, []);

    // Função para atualizar o estado com os valores dos inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Função para enviar o formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(api+'/registro-producao-esmagamento', formData);
            if (response.status === 201) {
                alert('Registro de produção inserido com sucesso!');
                // Limpar os campos do formulário após a inserção
                setFormData({
                    data: '',
                    turno: '',
                    usuario: '',
                    matricula: '',
                    producao_balanca_fluxo: '',
                    producao_estimada: '',
                    oleo_extracao: '',
                    tanque_a_hexano: '',
                    tanque_b_hexano: '',
                    tanque_c_hexano: '',
                    consumo_hexano: '',
                    vapor_consumido_preparacao: '',
                    vapor_consumido_extracao: '',
                    responsavel_turno: '',
                    observacoes: ''
                });
            }
        } catch (err) {
            console.error('Erro ao inserir registro:', err);
            alert('Erro ao inserir registro. Tente novamente.');
        }
    };

    return (
        <div>
            <div className="form-container">
                <button className="voltar-button" onClick={() => window.history.back()}>
                    <img src={voltar} alt='Voltar' className='voltar' />
                </button>
                <img src={logo_lar} alt="Logo" className="logo" /> 
                <h2>Registro de produção do Esmagamento</h2>

                <form onSubmit={handleSubmit} >
                <div className="form-pair">
              <div className="form-group">
                  <label htmlFor="data">Data</label>
                  <input 
                      type="date" 
                      id="data" 
                      name='data'
                      value={formData.data}
                      onChange={handleChange}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="turno">Turno</label>
                  <select  
                  id="turno"
                  name='turno'
                  value={formData.turno}
                  onChange={handleChange}
                >
                  <option value=''>Selecionar</option>
                  <option value='A'>A</option>
                  <option value='B'>B</option>
                  <option value='C'>C</option>
                  </select>
              </div>
          </div>
          <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="usuario">Usuário</label>
                            <input 
                                type="text" 
                                name="usuario" 
                                value={formData.usuario}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="matricula">Matrícula</label>
                            <input 
                                type="text" 
                                name="matricula" 
                                value={formData.matricula}
                                readOnly
                            />
                        </div>
                    </div>
                <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="producao_balanca_fluxo">Produção Balança de Fluxo (Kg)</label>
                            <input 
                                type="number" 
                                name="producao_balanca_fluxo" 
                                value={formData.producao_balanca_fluxo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="producao_estimada">Produção Estimada (Kg)</label>
                            <input 
                                type="number" 
                                name="producao_estimada" 
                                value={formData.producao_estimada}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="oleo_extracao">Óleo Extração (m³)</label>
                            <input 
                                type="number" 
                                name="oleo_extracao" 
                                value={formData.oleo_extracao}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_a_hexano">Tanque A Hexano (cm)</label>
                            <input 
                                type="number" 
                                name="tanque_a_hexano" 
                                value={formData.tanque_a_hexano}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                                <label htmlFor="tanque_b_hexano">Tanque B Hexano (cm)</label>
                                <input 
                                    type="number" 
                                    name="tanque_b_hexano"
                                    value={formData.tanque_b_hexano}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tanque_c_hexano">Tanque C Hexano (cm)</label>
                                <input 
                                    type="number" 
                                    name="tanque_c_hexano"
                                    value={formData.tanque_c_hexano}
                                    onChange={handleChange}
                                />
                            </div>
                    </div>
                    <div className="form-pair">
                    <div className="form-group">
                            <label htmlFor="consumo_hexano">Consumo de Hexano (l)</label>
                            <input 
                                type="number" 
                                name="consumo_hexano" 
                                value={formData.consumo_hexano}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vapor_consumido_preparacao">Vapor Consumido Preparação</label>
                            <input 
                                type="number" 
                                name="vapor_consumido_preparacao" 
                                value={formData.vapor_consumido_preparacao}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                            <label htmlFor="vapor_consumido_extracao">Consumo de Consumido Extração</label>
                            <input 
                                type="number" 
                                name="vapor_consumido_extracao" 
                                value={formData.vapor_consumido_extracao}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                        <label htmlFor="responsavel_turno">Responsável pelo Turno</label>
                        <input 
                            type="text" 
                            name="responsavel_turno"
                            value={formData.responsavel_turno}
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
                </form>
            </div>
        </div>
    );
};

export default FormEsmagamento;
