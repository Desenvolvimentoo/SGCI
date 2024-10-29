import React, { useState, useEffect } from 'react';
import './style.css';
import logo_lar from './img/logo_lar.png';
import voltar from './img/voltar.png';

const FormBiodiesel = () => {
    const api = 'http://192.168.156.17:3001';

    const [formData, setFormData] = useState({
        data: '', 
        turno: '', 
        nome: '',
        matricula: '',
        responsavel: '',
        observacoes: '',
        tanque_920A: '',
        tanque_921A: '',
        tanque_921B: '',
        tanque_922AS: '',
        tanque_922AC: '',
        tanque_922CL: '',
        tanque_922AF: '',
        tanque_922SC: '',
        tanque_922OI: '',
        tanque_922OI2: '',
        tanque_922A: '',
        tanque_923A: '',
        tanque_923B: '',
        tanque_923C: '',
        tanque_924A: '',
        tanque_925C: '',
        tanque_926A: '',
        tanque_926B: '',
        tanque_926D: '',
        tanque_926E: '',
        tanque_926F: '',
        tanque_926C: '',
        tanque_927A: '',
        tanque_927C: '',
        tanque_929B: '',
        tanque_929C: '',
        tanque_929D: '',
        tanque_931A: ''
    });
    

    const [mensagem, setMensagem] = useState(''); 

    
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
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(api + '/registro-producao-biodiesel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMensagem('Registro de produção de biodiesel enviado com sucesso!');
                setFormData({
                    data: '', 
                    turno: '', 
                    nome: formData.nome,
                    matricula: formData.matricula,
                    responsavel: '',
                    observacoes: '',
                    tanque_920A: '',
                    tanque_921A: '',
                    tanque_921B: '',
                    tanque_922AS: '',
                    tanque_922AC: '',
                    tanque_922CL: '',
                    tanque_922AF: '',
                    tanque_922SC: '',
                    tanque_922OI: '',
                    tanque_922OI2: '',
                    tanque_922A: '',
                    tanque_923A: '',
                    tanque_923B: '',
                    tanque_923C: '',
                    tanque_924A: '',
                    tanque_925C: '',
                    tanque_926A: '',
                    tanque_926B: '',
                    tanque_926D: '',
                    tanque_926E: '',
                    tanque_926F: '',
                    tanque_926C: '',
                    tanque_927A: '',
                    tanque_927C: '',
                    tanque_929B: '',
                    tanque_929C: '',
                    tanque_929D: '',
                    tanque_931A: ''
                });
            } else {
                setMensagem('Erro ao enviar registro de produção de biodiesel.');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            setMensagem('Erro ao enviar dados.');
        }
    };

    return (
        <div>
            <div className="form-container">
                <button className="voltar-button" onClick={() => window.history.back()}>
                    <img src={voltar} alt='Voltar' className='voltar' />
                </button>
                <img src={logo_lar} alt="Logo" className="logo" /> 
                <h2>Registro de produção do Biodiesel</h2>

                <form onSubmit={handleSubmit}>
                <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="data">Data</label>
                            <input 
                                type="date" 
                                name="data" 
                                value={formData.data} 
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
                            <label htmlFor="tanque_920A">920-A</label>
                            <input 
                                type="number" 
                                name="tanque_920A" 
                                value={formData.tanque_920A} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_921A">921-A</label>
                            <input 
                                type="number" 
                                name="tanque_921A" 
                                value={formData.tanque_921A} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="tanque_921B">921-B</label>
                            <input 
                                type="number" 
                                name="tanque_921B" 
                                value={formData.tanque_921B} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_922AS">922-AS</label>
                            <input 
                                type="number" 
                                name="tanque_922AS" 
                                value={formData.tanque_922AS} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="tanque_922AC">922-AC</label>
                            <input 
                                type="number" 
                                name="tanque_922AC" 
                                value={formData.tanque_922AC} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_922CL">922-CL</label>
                            <input 
                                type="number" 
                                name="tanque_922CL" 
                                value={formData.tanque_922CL} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="tanque_922AF">922-AF</label>
                            <input 
                                type="number" 
                                name="tanque_922AF" 
                                value={formData.tanque_922AF} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_922SC">922-SC</label>
                            <input 
                                type="number" 
                                name="tanque_922SC" 
                                value={formData.tanque_922SC} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="tanque_922OI">922-OI</label>
                            <input 
                                type="number" 
                                name="tanque_922OI" 
                                value={formData.tanque_922OI} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_922OI2">922-OI-2</label>
                            <input 
                                type="number" 
                                name="tanque_922OI2" 
                                value={formData.tanque_922OI2} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="tanque_922A">922-A</label>
                            <input 
                                type="number" 
                                name="tanque_922A" 
                                value={formData.tanque_922A} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_923A">923-A</label>
                            <input 
                                type="number" 
                                name="tanque_923A" 
                                value={formData.tanque_923A} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="tanque_923B">923-B</label>
                            <input 
                                type="number" 
                                name="tanque_923B" 
                                value={formData.tanque_923B} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_923C">923-C</label>
                            <input 
                                type="number" 
                                name="tanque_923C" 
                                value={formData.tanque_923C} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="tanque_924A">924-A</label>
                            <input 
                                type="number" 
                                name="tanque_924A" 
                                value={formData.tanque_924A} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_925C">925-C</label>
                            <input 
                                type="number" 
                                name="tanque_925C" 
                                value={formData.tanque_925C} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="tanque_926A">926-A</label>
                            <input 
                                type="number" 
                                name="tanque_926A" 
                                value={formData.tanque_926A} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_926B">926-B</label>
                            <input 
                                type="number" 
                                name="tanque_926B" 
                                value={formData.tanque_926B} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="tanque_926D">926-D</label>
                            <input 
                                type="number" 
                                name="tanque_926D" 
                                value={formData.tanque_926D} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_926E">926-E</label>
                            <input 
                                type="number" 
                                name="tanque_926E" 
                                value={formData.tanque_926E} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="tanque_926F">926-F</label>
                            <input 
                                type="number" 
                                name="tanque_926F" 
                                value={formData.tanque_926F} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_926C">926-C</label>
                            <input 
                                type="number" 
                                name="tanque_926C" 
                                value={formData.tanque_926C} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="tanque_927A">927-A</label>
                            <input 
                                type="number" 
                                name="tanque_927A" 
                                value={formData.tanque_927A} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_927C">927-C</label>
                            <input 
                                type="number" 
                                name="tanque_927C" 
                                value={formData.tanque_927C} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="tanque_929B">929-B</label>
                            <input 
                                type="number" 
                                name="tanque_929B" 
                                value={formData.tanque_929B} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_929C">929-C</label>
                            <input 
                                type="number" 
                                name="tanque_929C" 
                                value={formData.tanque_929C} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-pair">
                        <div className="form-group">
                            <label htmlFor="tanque_929D">929-D</label>
                            <input 
                                type="number" 
                                name="tanque_929D" 
                                value={formData.tanque_929D} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanque_931A">931-A</label>
                            <input 
                                type="number" 
                                name="tanque_931A" 
                                value={formData.tanque_931A} 
                                onChange={handleChange} 
                            />
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

export default FormBiodiesel;
