import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles.css';
import logoCadastro from '../../assets/cadastro.png';
import { FiUserX, FiXCircle, FiEdit } from "react-icons/fi";
import api from '../../services/api';

export default function Alunos() {
    const [nome, setNome] = useState('');
    const [alunos, setAlunos] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        api.get('/api/alunos', authorization).then(
            response => {
                setAlunos(response.data);
            }
        ).catch(error => {
            alert('Erro ao buscar alunos, tente novamente mais tarde.');
            console.error('Erro ao buscar alunos:', error);
        });
    }, [token]); // Dependência com o token

    async function logout() {
        try {
            localStorage.clear();
            navigate('/');
        } catch (err) {
            alert('Não foi possível fazer o logout ' + err);
        }
    }

    function editAluno(id) {
        try {
            navigate(`/aluno/novo/${id}`);
        } catch (error) {
            alert('Não foi possível editar o aluno');
        }
    }

    return (
        <div className="aluno-container">
            <header>
                <img src={logoCadastro} alt='Cadastro' />
                <span>Bem vindo, <strong>{email}</strong></span>
                <Link className="button" to="/aluno/novo/0">Novo Aluno</Link>

                <button onClick={logout} type="button">
                    <FiXCircle size={35} color="#17202a" />
                </button>
            </header>
            <form>
                <input 
                    type='text' 
                    placeholder='Nome' 
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <button type="submit" className="button">
                    Filtrar aluno por nome (parcial)
                </button>
            </form>
            <h1>Relação de Alunos</h1>
            <ul>
                {alunos.map(aluno => (
                    <li key={aluno.id}>
                        <b>Nome:</b>{aluno.nome}<br /><br />
                        <b>Email:</b>{aluno.email}<br /><br />
                        <b>Idade:</b>{aluno.idade}<br /><br />
                        <button onClick={() => editAluno(aluno.id)} type="button">
                            <FiEdit size="25" color="#17202a" />
                        </button>

                        <button type="button">
                            <FiUserX size="25" color="#17202a" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
