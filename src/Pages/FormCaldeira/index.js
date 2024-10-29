import React, { useState, useEffect } from 'react';
import './style.css';
import logo_lar from './img/logo_lar.png';
import voltar from './img/voltar.png';

const FormCaldeira = () => {
  const api = 'http://192.168.156.17:3001';
  const [mensagem, setMensagem] = useState(''); 
  const [formData, setFormData] = useState({
    data: '',
    producao_energia: '',
    producao_vapor: '',
    consumo_vapor_turbina: '',
    consumo_energia_operacional: '',
    consumo_vapor_operacional: '',
    consumo_energia_picador: '',
    observacoes: '',
    nome: '',
    matricula: '',
    responsavel: '',
    turno: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação: Verifica se todos os campos estão preenchidos
    const {
      data,
      producao_energia,
      producao_vapor,
      consumo_vapor_turbina,
      consumo_energia_operacional,
      consumo_vapor_operacional,
      consumo_energia_picador,
      observacoes,
      nome,
      matricula,
      responsavel,
      turno
    } = formData;

    if (
      !nome ||
      !data ||
      !producao_energia ||
      !producao_vapor ||
      !consumo_vapor_turbina ||
      !consumo_energia_operacional ||
      !consumo_vapor_operacional ||
      !consumo_energia_picador ||
      !observacoes ||
      !matricula ||
      !responsavel ||
      !turno
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(api+'/registro-producao-caldeira', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensagem('Registro de produção da caldeira enviado com sucesso!');
        setFormData({
          data: '',
          producao_energia: '',
          producao_vapor: '',
          consumo_vapor_turbina: '',
          consumo_energia_operacional: '',
          consumo_vapor_operacional: '',
          consumo_energia_picador: '',
          observacoes: '',
          responsavel: '',
          turno: ''
        });
      } else {
        alert('Erro ao enviar os dados');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <button className="voltar-button" onClick={() => window.history.back()}>
          <img src={voltar} alt='Voltar' className='voltar' />
        </button>
        <img src={logo_lar} alt="Logo" className="logo" /> 
        <h2>Registro de produção da Caldeira</h2>

        <form onSubmit={handleSubmit}>
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
                  onChange={handleChange} >
                  <option value=''>Selecionar</option>
                  <option value='A'>A</option>
                  <option value='B'>B</option>
                  <option value='C'>C</option>
                  </select>
              </div>
          </div>
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
            </div>
            <div className="form-pair">
          <div className="form-group">
            <label htmlFor="producao_energia">Produção de Energia (KW)</label>
            <input type="number" id="producao_energia" value={formData.producao_energia} onChange={handleChange} min="0" step="any" />
          </div>

          <div className="form-group">
            <label htmlFor="producao_vapor">Produção de Vapor (Kg)</label>
            <input type="number" id="producao_vapor" value={formData.producao_vapor} onChange={handleChange} min="0" step="any" />
          </div>
          </div>
          <div className="form-pair">
          <div className="form-group">
            <label htmlFor="consumo_vapor_turbina">Consumo de Vapor Turbina (Kg)</label>
            <input type="number" id="consumo_vapor_turbina" value={formData.consumo_vapor_turbina} onChange={handleChange} min="0" step="any" />
          </div>

          <div className="form-group">
            <label htmlFor="consumo_energia_operacional">Consumo Energia Operacional (KW)</label>
            <input type="number" id="consumo_energia_operacional" value={formData.consumo_energia_operacional} onChange={handleChange} min="0" step="any" />
          </div>
          </div>
          <div className="form-pair">
          <div className="form-group">
            <label htmlFor="consumo_vapor_operacional">Consumo de Vapor Operacional (Kg)</label>
            <input type="number" id="consumo_vapor_operacional" value={formData.consumo_vapor_operacional} onChange={handleChange} min="0" step="any" />
          </div>

          <div className="form-group">
            <label htmlFor="consumo_energia_picador">Consumo de Energia Picador (KW)</label>
            <input type="number" id="consumo_energia_picador" value={formData.consumo_energia_picador} onChange={handleChange} min="0" step="any" />
          </div>
          </div>
          <div className="form-pair">


          <div className="form-group">
            <label htmlFor="responsavel">Responsável pelo Turno</label>
            <input type="text" id="responsavel" value={formData.responsavel} onChange={handleChange} />
          </div>
          </div>
          <div className="obs-group">
            <label htmlFor="observacoes">Observações</label>
            <textarea id="observacoes" value={formData.observacoes} onChange={handleChange} rows="4"></textarea>
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

export default FormCaldeira;
