import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Dashboard() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:5000/api/profile', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setUserName(data.name || ''))
            .catch(() => { });
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');

        try {
            await fetch('http://localhost:5000/api/logout', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (err) {
            // حتى لو فشل النداء، هنمسح التوكن ونخرج المستخدم
        }

        localStorage.removeItem('token');
        navigate('/login');
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
                    <h1 className="app-title">لوحة التحكم</h1>
                    <p className="app-description">
                        {userName ? `أهلاً بك ${userName}!` : 'أهلاً بك!'} تم تسجيل دخولك بنجاح. من هنا تقدر تدير حسابك
                        وتتابع نشاطك على التطبيق.
                    </p>

                    <div className="button-container">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/edit-profile')}
                        >
                            تعديل الملف الشخصي
                        </button>
                        <button className="btn btn-secondary" onClick={handleLogout}>
                            تسجيل الخروج
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;