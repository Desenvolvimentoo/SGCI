import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fotoLar from './img/logo_lar.png';
import voltar from './img/voltar.png';

const FormParadas = () => {
    const api = 'http://192.168.156.17:3001';
    const [tags, setTags] = useState([]);
    const currentYear = new Date().getFullYear();
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
    const [filteredTags, setFilteredTags] = useState([]);
    const [searchTag, setSearchTag] = useState('');

    

    useEffect(() => {
        axios.get(api + '/tags')
            .then(response => {
                if (Array.isArray(response.data)) {
                    const validTags = response.data.filter(tag => tag !== null && tag !== undefined);
                    const sortedTags = validTags.sort((a, b) =>
                        a.toString().localeCompare(b.toString(), 'pt-BR', { sensitivity: 'base' })
                    );
                    setTags(sortedTags);
                    setFilteredTags(sortedTags);
                } else {
                    console.error('Resposta inesperada:', response.data);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar tags:', error);
            });
    }, []);
    
    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTag(searchValue);
        setFilteredTags(tags.filter(tag => tag.toLowerCase().includes(searchValue)));
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
    
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
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

        const yearDataInicial = new Date(data_inicial).getFullYear();
        const yearDataFinal = new Date(data_final).getFullYear();
    
        if (yearDataInicial !== currentYear || yearDataFinal !== currentYear) {
            alert(`As datas devem estar no ano de ${currentYear}.`);
            return;
        }

        if (
            !setor || !consequencia || !turno || !tag || !data_inicial || !data_final ||
            !hora_inicial || !hora_final || !observacoes || !nome || !matricula || !responsavel
        ) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const dataInicialFormatada = new Date(data_inicial).toISOString().split('T')[0]; 
        const dataFinalFormatada = new Date(data_final).toISOString().split('T')[0]; 
    
        const formDataFormatada = {
            ...formData,
            data_inicial: dataInicialFormatada,
            data_final: dataFinalFormatada,
        };
    
        axios.post(api + '/paradas', formDataFormatada)
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
    
    const handleFocus = () => {
        document.querySelector('.options-container').style.display = 'block';
    };
    
    const handleBlur = () => {
        setTimeout(() => {
            document.querySelector('.options-container').style.display = 'none';
        }, 200); 
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
                            <input type="text" name="nome" readOnly value={formData.nome} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="matricula">Matricula</label>
                            <input type="number" name="matricula" readOnly value={formData.matricula} onChange={handleChange} />
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
                                <option value="Expedição">Expedição</option>
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
                            <div className="custom-select">
                            <input 
                                type="text" 
                                placeholder="Selecione uma tag..." 
                                value={searchTag} 
                                onChange={handleSearchChange} 
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className="search-input"
                            />

                                <div className="options-container">
                                    {filteredTags.map((tag, index) => (
                                        <div 
                                            key={index} 
                                            className="option-item" 
                                            onClick={() => {
                                                setFormData({ ...formData, tag });
                                                setSearchTag(tag);
                                            }}
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
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
