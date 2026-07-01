import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/login', formData);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'حصل خطأ، حاول مرة تانية');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>تسجيل الدخول</h2>
                <p style={styles.subtitle}>أهلاً بعودتك! سجّل دخولك ببريدك الإلكتروني وكلمة المرور للوصول إلى حسابك.</p>

                {error && <p style={styles.error}>{error}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="البريد الإلكتروني"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="كلمة المرور"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                />

                <p style={styles.forgotText}>
                    <Link to="/forgot-password" style={styles.link}>نسيت كلمة المرور؟</Link>
                </p>

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
                </button>

                <p style={styles.linkText}>
                    مفيش حساب؟ <Link to="/register" style={styles.link}>أنشئ واحد</Link>
                </p>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: "'Tajawal', 'Cairo', sans-serif",
        background: 'linear-gradient(135deg, #4c40f8, #9513e0)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '380px',
        padding: '40px',
        backgroundColor: '#fff',
        borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '8px',
        fontSize: '1.8rem',
        color: '#1e3a8a',
        fontWeight: '800',
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        fontSize: '0.9rem',
        marginBottom: '24px',
        lineHeight: '1.5',
    },
    input: {
        padding: '16px 20px',
        marginBottom: '16px',
        borderRadius: '50px',
        border: '1px solid #ddd',
        fontSize: '15px',
        fontFamily: "'Tajawal', 'Cairo', sans-serif",
        outline: 'none',
        textAlign: 'right',
        direction: 'rtl',
    },
    forgotText: {
        textAlign: 'left',
        marginBottom: '16px',
        fontSize: '13px',
    },
    button: {
        padding: '16px',
        backgroundColor: '#1e3a8a',
        color: '#fff',
        border: 'none',
        borderRadius: '50px',
        fontWeight: 'bold',
        fontSize: '15px',
        cursor: 'pointer',
        fontFamily: "'Tajawal', 'Cairo', sans-serif",
    },
    error: {
        color: 'red',
        fontSize: '13px',
        textAlign: 'center',
        marginBottom: '10px',
    },
    linkText: {
        marginTop: '18px',
        textAlign: 'center',
        fontSize: '13px',
    },
    link: {
        color: '#1e3a8a',
        fontWeight: 'bold',
        textDecoration: 'none',
    },
};

export default Login;