import React, { useState } from 'react';
import './style.css';
import logo_lar from './img/logo_lar.png';
import voltar from './img/voltar.png';

const FormCavaco = () => {
  const api = 'http://192.168.156.17:3001';

  const [formData, setFormData] = useState({
    data: '',
    consumo_cavaco: "",
    consumo_bagaco: "",
    consumo_residuo: "",
    lenha_utilizada: "",
    cavaco_produzido: "",
    consumo_energia_cavaco: "",
    outros_custos: "",
    observacoes: '',
    matricula: '',
    responsavel: '',
    turno: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos
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
    } = formData;

    if (
      !data || !consumo_cavaco || !consumo_bagaco || !consumo_residuo ||
      !lenha_utilizada || !cavaco_produzido || !consumo_energia_cavaco ||
      !outros_custos || !observacoes || !matricula || !responsavel || !turno
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(api + '/registro-producao-cavaco', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Dados inseridos com sucesso');
        setFormData({
          data: '',
          consumo_cavaco: "",
          consumo_bagaco: "",
          consumo_residuo: "",
          lenha_utilizada: "",
          cavaco_produzido: "",
          consumo_energia_cavaco: "",
          outros_custos: "",
          observacoes: '',
          matricula: '',
          responsavel: '',
          turno: ''
        });
      } else {
        alert('Erro ao inserir dados');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao inserir dados');
    }
  };

  return (
    <div>
      <div className="form-container">
        <button className="voltar-button" onClick={() => window.history.back()}>
          <img src={voltar} alt='Voltar' className='voltar' />
        </button>
        <img src={logo_lar} alt="Logo" className="logo" /> 
        <h2>Registro de Produção de Cavaco</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="data">Data</label>
            <input type="date" id="data" value={formData.data} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="consumo_cavaco">Consumo de Cavaco (Kg)</label>
            <input type="number" id="consumo_cavaco" value={formData.consumo_cavaco} onChange={handleChange} min="0" step="any" />
          </div>

          <div className="form-group">
            <label htmlFor="consumo_bagaco">Consumo de Bagaço (Kg)</label>
            <input type="number" id="consumo_bagaco" value={formData.consumo_bagaco} onChange={handleChange} min="0" step="any" />
          </div>

          <div className="form-group">
            <label htmlFor="consumo_residuo">Consumo de Resíduo (Kg)</label>
            <input type="number" id="consumo_residuo" value={formData.consumo_residuo} onChange={handleChange} min="0" step="any" />
          </div>

          <div className="form-group">
            <label htmlFor="lenha_utilizada">Lenha Utilizada (t)</label>
            <input type="number" id="lenha_utilizada" value={formData.lenha_utilizada} onChange={handleChange} min="0" step="any" />
          </div>

          <div className="form-group">
            <label htmlFor="cavaco_produzido">Cavaco Produzido (t)</label>
            <input type="number" id="cavaco_produzido" value={formData.cavaco_produzido} onChange={handleChange} min="0" step="any" />
          </div>

          <div className="form-group">
            <label htmlFor="consumo_energia_cavaco">Consumo de energia (Kw)</label>
            <input type="number" id="consumo_energia_cavaco" value={formData.consumo_energia_cavaco} onChange={handleChange} min="0" step="any" />
          </div>

          <div className="form-group">
            <label htmlFor="outros_custos">Outros Custos (R$)</label>
            <input type="number" id="outros_custos" value={formData.outros_custos} onChange={handleChange} min="0" step="any" />
          </div>

          <div className="obs-group">
            <label htmlFor="observacoes">Observações</label>
            <textarea id="observacoes" value={formData.observacoes} onChange={handleChange} rows="4"></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="matricula">Matrícula</label>
            <input type="number" id="matricula" value={formData.matricula} onChange={handleChange} min="0" step="1" />
          </div>

          <div className="form-group">
            <label htmlFor="responsavel">Responsável pelo Turno</label>
            <input type="text" id="responsavel" value={formData.responsavel} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="turno">Turno</label>
            <select id="turno" value={formData.turno} onChange={handleChange}>
              <option value="">Selecionar</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div className="buttons">
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCavaco;
