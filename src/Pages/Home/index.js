import lar_florestal from './img/lar-florestal.png';
import logistica_interna from './img/logisticaInterna.png';
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

    useEffect(() => {
        const nomeUsuario = localStorage.getItem('nome');
        if (nomeUsuario) {
            const primeiroNome = nomeUsuario.split(' ')[0]; 
            setNome(primeiroNome);
        }
    }, []);
    
    function redirect(url) {
        window.location.href = url;
    }

    function executeInstaller() {
        const installerPath = "C:\\Users\\LAR\\Downloads\\Oda\\SGCI\\logistica\\Setup Logística 1.1.exe";
        window.location.href = installerPath;
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    };

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);


    return (
        <div className="sgci">
            <div className="user-info">
                {nome && <span className="user-name">Bem-vindo(a), {nome}</span>}
            </div>
            <div className="title-container">
                <h1 className="title">Sistema de gerenciamento do complexo Industrial</h1>
            </div>

            <div className="form">
                <div className="icon-container">
                    <div className="button LarFlorestal" onClick={() => redirect('http://192.168.156.17:3000/home')}>
                        <img src={lar_florestal} alt="Lar Florestal" className="button-image" />
                    </div>
                    <p>Lar Florestal</p>
                </div>
                <div className="icon-container">
                    <div className="button LogisticaInterna" onClick={executeInstaller}>
                        <img src={logistica_interna} alt="Logística Interna" className="button-image" />
                    </div>
                    <p>Logística Interna</p>
                </div>
                <div className="icon-container">
                    <div className="button iStop" onClick={() => redirect('/iStop')}>
                        <img src={parada} alt="Paradas" className="button-image" />
                    </div>
                    <p>iStop</p>
                </div>
                <div className="icon-container">
                    <div className="button Caldeira" onClick={() => redirect('/FormCaldeira')}>
                        <img src={caldeira} alt="Produção Caldeira" className="button-image" />
                    </div>
                    <p>Produção Caldeira</p>
                </div>
                <div className="icon-container">
                <div className="button iStop" onClick={() => redirect('/FormEsmagamento')}>
                            <img src={esmagamento} alt="Planejamento e Controle de Produção" className="button-image" />
                    </div>
                    <p>Produção Esmagamento</p>
                </div>
                <div className="icon-container">
                    <div className="button iStop" onClick={() => redirect('/FormBiodiesel')}>
                        <img src={tanque} alt="Produção Biodiesel" className="button-image" />
                    </div>
                    <p>Produção Biodiesel</p>
                </div>
                <div className="icon-container">
                    <div className="button iStop" onClick={() => redirect('/FormCQ')}>
                            <img src={analises} alt="Analises CQ" className="button-image" />
                    </div>
                    <p>Análises CQ</p>
                </div>

                <div className="icon-container">
                    <div className="button iStop" onClick={() => redirect('/FormCavaco')}>
                        <img src={picador} alt="Produção Cavaco" className="button-image" />
                    </div>
                    <p>Produção Cavaco</p>
                </div>


                <div className="icon-container">
                <div className="button iStop" onClick={() => redirect('/FormPCP')}>
                            <img src={pcp} alt="Planejamento e Controle de Produção" className="button-image" />
                    </div>
                    <p>Embarques (PCP)</p>
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
