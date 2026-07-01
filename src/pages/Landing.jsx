import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="Landing-body" dir="rtl">

            {/* حاوية الخلفية المصورة مع تأثير الـ Blur */}
            <div className="bg-container"></div>

            {/* اللوجو في الزاوية العلوية اليسرى */}
            <div className="top-logo">
                <div className="logo-icon"></div>
                <span className="logo-text">My App</span>
            </div>

            {/* الكارد الرئيسي في نص الشاشة */}
            <div className="main-wrapper">
                <div className="login-card">
                    {/* اسم التطبيق */}
                    <h1 className="app-title">My App</h1>

                    {/* النص الوصفي */}
                    <p className="app-description">
                        مرحباً بك مجدداً! يسعدنا انضمامك إلينا.
                        <br />
                        سجّل دخولك الآن للوصول إلى حسابك والاستمتاع بكافة الميزات، أو قم بإنشاء حساب جديد إذا كنت مستخدماً جديداً.
                    </p>

                    {/* الأزرار */}
                    <div className="button-container">
                        <button className="btn btn-secondary" onClick={() => navigate('/login')}>
                            تسجيل الدخول
                        </button>
                        <button className="btn btn-primary" onClick={() => navigate('/register')}>
                            إنشاء حساب
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Landing;