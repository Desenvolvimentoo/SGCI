import React, { useState, useEffect } from 'react';
import './style_login.css';
import sgci from './img/SGCI.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const loginTime = localStorage.getItem('loginTime');

        if (isLoggedIn && loginTime) {
            const currentTime = new Date().getTime();
            const oneHour =  60 * 60 * 1000;

            if (currentTime - loginTime > oneHour) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('loginTime');
                localStorage.removeItem('matricula');
                localStorage.removeItem('nome');
                setMessage('Sessão expirada. Faça login novamente.');
            } else {
                navigate('/home');
            }
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://192.168.156.17:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matricula, senha })
            });
        
            const data = await response.json();
            console.log(data); 
    
            if (data.success) {
                setMessage('Logado com sucesso'); 
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('matricula', matricula);
                localStorage.setItem('nome', data.nome);
                localStorage.setItem('loginTime', new Date().getTime()); 
    
                const setorResponse = await fetch('http://192.168.156.17:3001/getSetor', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ matricula })
                });
                const setorData = await setorResponse.json();
    
                if (setorData.setor) {
                    localStorage.setItem('setor', setorData.setor); 
                } else {
                    setMessage('Setor não encontrado');
                }
    
                navigate('/home', { replace: true });
    
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } else {
                setMessage('Matrícula ou senha incorreta');
            }
        } catch (error) {
            setMessage('Erro ao tentar logar');
        }
    };
    
    const handleNavigateToRegister = () => {
        navigate('/cadastrarUsuario'); 
    };

    return (
    <div className="login-page">
        <div className="container-login">
            <div className='logo-content'>
                <img src={sgci} alt="SGCI Logo" />
            </div>
            <div className='container-box'>
                <div className='form-box'>
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className='input-box'>
                            <span>Usuário</span>
                            <input 
                                type='number' 
                                placeholder='Digite sua matrícula...' 
                                value={matricula} 
                                onChange={(e) => setMatricula(e.target.value)} 
                            />
                        </div>
                        <div className='input-box'>
                            <span>Senha</span>
                            <input 
                                type='password' 
                                placeholder='Digite sua senha...' 
                                value={senha} 
                                onChange={(e) => setSenha(e.target.value)} 
                            />
                        </div>
                        <button type="submit">Entrar</button>
                    </form>
                    {message && <p>{message}</p>} 
                </div>
                <div className='register-box'>
                    <button onClick={handleNavigateToRegister} className="register-link">Cadastrar Usuário</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Login;
