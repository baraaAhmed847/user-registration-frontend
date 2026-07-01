import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import './Login.css';

function EditProfile() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('https://user-registration-frontend-production.up.railway.app/api/profile', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setName(data.name || '');
                setEmail(data.email || '');
            })
            .catch(() => setError('تعذر تحميل بيانات الملف الشخصي'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('https://user-registration-frontend-production.up.railway.app/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'حدث خطأ...');
                return;
            }

            setSuccess('تم تحديث بياناتك بنجاح');
        } catch (err) {
            setError('تعذر الاتصال بالسيرفر');
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
                    <h1 className="app-title">تعديل الملف الشخصي</h1>
                    <p className="app-description">
                        قم بتحديث بياناتك الشخصية هنا والحفاظ على معلوماتك محدثة.
                    </p>

                    <form onSubmit={handleSubmit} className="login-form">
                        <input
                            type="text"
                            placeholder="الاسم"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="login-input"
                            required
                        />
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
                            <button type="submit" className="btn btn-primary">
                                حفظ التعديلات
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate('/dashboard')}
                            >
                                رجوع للوحة التحكم
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;