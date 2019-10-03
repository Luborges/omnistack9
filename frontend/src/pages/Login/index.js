import React, {useState} from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState('');

    async function handleSubmit(evt){
        evt.preventDefault();

        const response = await api.post('/sessions', {email});
        const { _id } = response.data;

        localStorage.setItem('user', _id);

        history.push('/dashboard');
    }
    return(
        <>
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos para sua empresa</strong>
            </p>

            <form onSubmit={handleSubmit}>
            <label for='email'>E-MAIL</label>
            <input type='email' id='email' placeholder="Seu e-mail" 
                value={email}
                onChange={evt => setEmail(evt.target.value)} />
            <button className='btn' type='submit'>Entrar</button>
            </form>
        </>
    )
}