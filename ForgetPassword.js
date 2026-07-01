import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email) {
            setError('من فضلك اكتب بريدك الإلكتروني');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/forgot-password', { email });
            setSuccess('تم إرسال رابط إعادة التعيين، تحقق من الـ Terminal');
            console.log(response.data.reset_link);
        } catch (err) {
            setError(err.response?.data?.error || 'حصل خطأ، حاول مرة تانية');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>نسيت كلمة المرور؟</h2>
                <p style={styles.subtitle}>
                    اكتب بريدك الإلكتروني وهنبعتلك رابط لإعادة تعيين كلمة المرور.
                </p>

                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}

                <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
                </button>

                <p style={styles.linkText}>
                    <Link to="/login" style={styles.link}>رجوع لتسجيل الدخول</Link>
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
        background: 'linear-gradient(135deg, #f6d365, #fda085)',
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
    success: {
        color: 'green',
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

export default ForgotPassword;