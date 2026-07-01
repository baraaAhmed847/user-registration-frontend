import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import './Login.css';

function ForgotPassword() {
    const navigate = useNavigate();
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
            const res = await fetch('https://user-registration-frontend-production.up.railway.app/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'حصل خطأ، حاول مرة تانية');
                return;
            }

            setSuccess('تم إرسال رابط إعادة التعيين، تحقق من بريدك الإلكتروني');
            console.log(data.reset_link);
        } catch (err) {
            setError('تعذر الاتصال بالسيرفر');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Landing-body">
            <div className="bg-container"></div>

            <div className="top-logo">
                <div className="logo-icon"></div>
                <span className="logo-text">My App</span>
            </div>

            <div className="main-wrapper">
                <div className="login-card">
                    <h1 className="app-title">نسيت كلمة المرور؟</h1>
                    <p className="app-description">
                        اكتب بريدك الإلكتروني وهنبعتلك رابط لإعادة تعيين كلمة المرور.
                    </p>

                    <form onSubmit={handleSubmit} className="login-form">
                        <input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                            required
                        />

                        {error && <p className="error-text">{error}</p>}
                        {success && <p className="success-text">{success}</p>}

                        <div className="login-buttons">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate('/login')}
                            >
                                رجوع لتسجيل الدخول
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;