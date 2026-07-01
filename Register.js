import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
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
            const response = await api.post('/register', formData);
            localStorage.setItem('token', response.data.token || '');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'حصل خطأ، حاول مرة تانية');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>إنشاء حساب جديد</h2>

                {error && <p style={styles.error}>{error}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="الاسم"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                />
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
                <input
                    type="password"
                    name="confirm_password"
                    placeholder="تأكيد كلمة المرور"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'جاري الإنشاء...' : 'إنشاء حساب'}
                </button>

                <p style={styles.linkText}>
                    عندك حساب بالفعل؟ <Link to="/login">سجّل دخول</Link>
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
        fontFamily: 'Arial, sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '320px',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        marginBottom: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '14px',
    },
    button: {
        padding: '12px',
        backgroundColor: '#2563eb',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '13px',
        textAlign: 'center',
        marginBottom: '10px',
    },
    linkText: {
        marginTop: '15px',
        textAlign: 'center',
        fontSize: '13px',
    },
};

export default Register;