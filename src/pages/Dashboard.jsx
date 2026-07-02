import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import api from '../api';

function Dashboard() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        api.get('/profile')
            .then((res) => setUserName(res.data.name || ''))
            .catch(() => { });
    }, []);

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (err) { }

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