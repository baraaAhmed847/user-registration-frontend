import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Landing.css';
import './Login.css';

function ResetPassword() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('كلمتا المرور غير متطابقتين');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('https://user-registration-frontend-production.up.railway.app/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    new_password: newPassword,
                    confirm_new_password: confirmPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'حصل خطأ، حاول مرة تانية');
                return;
            }

            setSuccess('تم تغيير كلمة المرور بنجاح');
            setTimeout(() => navigate('/login'), 2000);
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
                    <h1 className="app-title">تعيين كلمة مرور جديدة</h1>
                    <p className="app-description">
                        اكتب كلمة المرور الجديدة وتأكيدها، وهنحدّثها ليك فوراً.
                    </p>

                    <form onSubmit={handleSubmit} className="login-form">
                        <input
                            type="password"
                            placeholder="كلمة المرور الجديدة"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="login-input"
                            required
                        />
                        <input
                            type="password"
                            placeholder="تأكيد كلمة المرور الجديدة"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                {loading ? 'جاري الحفظ...' : 'حفظ كلمة المرور الجديدة'}
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

export default ResetPassword;