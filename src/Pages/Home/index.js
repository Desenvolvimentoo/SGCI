import parada from './img/parada.png';
import lar from './img/logo-lar.png';
import caldeira from './img/caldeira.png';
import picador from './img/picador-de-madeira.png';
import tanque from './img/tanque.png';
import analises from './img/analise.png';
import pcp from './img/pcp.png';
import esmagamento from './img/esmagamento.png';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './stilo.css';

const Home = () => {
    const [nome, setNome] = useState('');
    const [setor, setSetor] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const nomeUsuario = localStorage.getItem('nome');
        const usuarioSetor = localStorage.getItem('setor');
        if (nomeUsuario) {
            const primeiroNome = nomeUsuario.split(' ')[0]; 
            setNome(primeiroNome);
        }
        if (usuarioSetor) {
            setSetor(usuarioSetor); 
        }
    }, []);

    function redirect(url) {
        window.location.href = url;
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('setor');
        navigate('/');
    };

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    const checkAccess = (allowedSector) => {

        if (allowedSector.split("||").includes(setor)) {
            return true;
        } else {
            setShowError(true);
            setTimeout(() => setShowError(false), 5000); 
            return false;
        }
    };

    return (
        <div className="sgci">
            {showError && (
                <div className="error-message">
                    Infelizmente esse recurso não está liberado para seu usuário,<br></br> contate o setor de desenvolvimento da UIS-2.
                </div>
            )}

            <div className="user-info">
                {nome && <span className="user-name">Bem-vindo(a), {nome}</span>}
            </div>
            <div className="title-container">
                <h1 className="title">Formulários Registro de Produção</h1>
            </div>

            <div className="form">
                <div className="icon-container">
                    <div 
                        className="button Caldeira" 
                        onClick={() => checkAccess("1165||0000") && redirect('/FormCaldeira')}
                    >
                        <img src={caldeira} alt="Produção Caldeira" className="button-image" />
                    </div>
                    <p>Produção Caldeira</p>
                </div>

                <div className="icon-container">
                    <div 
                        className="button iStop" 
                        onClick={() => checkAccess("1164||0000") && redirect('/FormBiodiesel')}
                    >
                        <img src={tanque} alt="Produção Biodiesel" className="button-image" />
                    </div>
                    <p>Produção Biodiesel</p>
                </div>

                <div className="icon-container">
                    <div 
                        className="button iStop" 
                        onClick={() => checkAccess("1169||0000") && redirect('/FormCavaco')}
                    >
                        <img src={picador} alt="Produção Cavaco" className="button-image" />
                    </div>
                    <p>Produção Cavaco</p>
                </div>

                <div className="icon-container">
                    <div 
                        className="button iStop" 
                        onClick={() => checkAccess("1158||0000") && redirect('/FormEsmagamento')}
                    >
                        <img src={esmagamento} alt="Produção Esmagamento" className="button-image" />
                    </div>
                    <p>Produção Esmagamento</p>
                </div>

                <div className="icon-container">
                    <div 
                        className="button iStop" 
                        onClick={() => checkAccess("1166||0000") && redirect('/FormCQ')}
                    >
                        <img src={analises} alt="Análises CQ" className="button-image" />
                    </div>
                    <p>Análises CQ</p>
                </div>

                <div className="icon-container">
                    <div 
                        className="button iStop" 
                        onClick={() => checkAccess("1161||0000") && redirect('/FormPCP')}
                    >
                        <img src={pcp} alt="Planejamento e Controle de Produção" className="button-image" />
                    </div>
                    <p>Embarques (PCP)</p>
                </div>
                <div className="icon-container">
                    <div 
                        className="button iStop" 
                        onClick={() => redirect('/iStop')}
                    >
                        <img src={parada} alt="Paradas de Produção" className="button-image" />
                    </div>
                    <p>Paradas de Produção</p>
                </div>

                <div className="logo-container">
                    <img src={lar} alt="Logo Lar" className="lar-logo" />
                </div>
            </div>

            <button className="logout-button" onClick={handleLogout}>Sair</button>
        </div>
    );
};

export default Home;
