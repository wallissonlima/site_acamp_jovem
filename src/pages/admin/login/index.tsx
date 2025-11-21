import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context, CustomButton, FromCotainer } from "./styles";
import logo from "../../../assets/logo1.png";
import uri_header from '../../../config/uri_header.json';

interface iUser {
    email: string;
    password: string;
}

export const LoginAdmin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<iUser>({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    // Recupera login salvo (lembrar-me)
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        const storedRememberMe = localStorage.getItem('rememberMe') === 'true';

        if (storedRememberMe) {
            setUser({ email: storedEmail || '', password: storedPassword || '' });
        }
    }, []);

    // Config API
    const ax = axios.create({
        baseURL: import.meta.env.VITE_APP_BASEAPI_URL
    });

    // LOGIN
    const _logIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const login = await ax.post('/auth/login', user, { headers: uri_header });
            console.log("RETORNO API:", login.data);
            if (login.data) {
                const token = login.data.access_token;
                const adminData = login.data.user;  // <- precisa vir da API

                // salva token
                localStorage.setItem('access_token', token);

                // salva infos do admin
                localStorage.setItem('admin', JSON.stringify(adminData));

                toast.success('Login realizado com sucesso!', { autoClose: 1000 });

                setUser({ email: '', password: '' });

                // Redireciona para o Dashboard
                navigate('/admin/dashboard', { replace: true });
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                toast.error('Email ou senha incorretos.');
            } else {
                toast.error('Erro ao tentar realizar login.');
            }
        }
    };

    return (
        <Context>
            <FromCotainer>
                <img src={logo} alt="Logo" />

                <form onSubmit={_logIn}>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        required
                        autoComplete="email"
                    />

                    <div style={{ position: "relative", width: "100%" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Senha"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            required
                            autoComplete="current-password"
                        />

                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "16px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                            }}
                        >
                            👁
                        </span>
                    </div>

                    <CustomButton>
                        <button type="submit">Entrar</button>
                    </CustomButton>
                </form>
            </FromCotainer>
        </Context>
    );
};
