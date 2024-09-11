import React, { useState } from 'react';
import './style_login.css';
import sgci from './img/SGCI.png';
import { useNavigate } from 'react-router-dom';

const CadastrarUsuario = () => {
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaAcesso, setSenhaAcesso] = useState(''); 
    const [senhaCorreta, setSenhaCorreta] = useState(false); 
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(''); 
    
        try {
            const response = await fetch('http://192.168.156.17:3001/cadastrar-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    matricula,
                    senha
                }),
            });
    
            if (response.status === 201) {
                setMessage('Usuário cadastrado com sucesso!');
                navigate('/login', { replace: true });
                setNome('');
                setMatricula('');
                setSenha('');
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Erro ao cadastrar usuário');
            }
        } catch (error) {
            setMessage('Erro ao conectar com o servidor');
            console.error('Erro:', error);
        }
    };

    const verificarSenhaAcesso = (e) => {
        e.preventDefault();
        if (senhaAcesso === '#D3s3nv0lv1m3nt0') {
            setSenhaCorreta(true); 
            setMessage('');
        } else {
            setMessage('Senha de acesso incorreta!');
        }
    };
    
    return (
    <div className="login-page">
        <div className="container-login">
            <div className='logo-content'>
                <img src={sgci} alt="SGCI Logo" />
            </div>
            <div className='container-box'>
                <div className='form-box'>
                    {!senhaCorreta && ( 
                        <>
                            <h2>Acesso ao Cadastro</h2>
                            <form onSubmit={verificarSenhaAcesso}>
                                <div className='input-box'>
                                    <span>Senha de Acesso</span>
                                    <input 
                                        type='password' 
                                        placeholder='Digite a senha de acesso...' 
                                        value={senhaAcesso} 
                                        onChange={(e) => setSenhaAcesso(e.target.value)} 
                                    />
                                </div>
                                <button type="submit">Verificar</button>
                            </form>
                        </>
                    )}
                    {message && <p>{message}</p>} 
                    {senhaCorreta && ( 
                        <div className='form-box'>
                            <h2>Cadastrar Usuário</h2>
                            <form onSubmit={handleRegister}>
                                <div className='input-box'>
                                    <span>Nome</span>
                                    <input 
                                        type='text' 
                                        placeholder='Digite seu nome...' 
                                        value={nome} 
                                        onChange={(e) => setNome(e.target.value)} 
                                    />
                                </div>
                                <div className='input-box'>
                                    <span>Matrícula</span>
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
                                <button type="submit">Cadastrar</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
    );
}

export default CadastrarUsuario;
