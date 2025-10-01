// 主要JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initLanguageSwitcher();
    initNavigation();
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initMobileMenu();
    initCurrentYear();
});

// 语言切换功能
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const body = document.body;
    
    // 从localStorage获取保存的语言设置
    const savedLang = localStorage.getItem('preferred-language') || 'ja';
    setLanguage(savedLang);
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('preferred-language', lang);
        });
    });
}

function setLanguage(lang) {
    const body = document.body;
    const langButtons = document.querySelectorAll('.lang-btn');
    const elements = document.querySelectorAll('[data-zh][data-ja]');
    
    // 更新body的class
    if (lang === 'ja') {
        body.classList.add('ja');
    } else {
        body.classList.remove('ja');
    }
    
    // 更新语言按钮状态
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // 更新页面文本
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // 更新页面标题和meta描述
    updatePageMeta(lang);
}

function updatePageMeta(lang) {
    const titles = {
        zh: '立国志 - 日本国志堂拍卖会·中医养生·留学中介·中日相亲',
        ja: '立国志 - 国志堂オークション·中医養生·留学サポート·中日お見合い'
    };
    
    const descriptions = {
        zh: '立国志旗下日本国志堂拍卖会经营古董、工艺品、钻石等；黑龙江国志堂中医健康养生管理，日本留学劳务中介，中日相亲会服务',
        ja: '立国志傘下の国志堂オークションは骨董品、工芸品、ダイヤモンドなどを扱い、黒竜江国志堂中医健康養生管理、日本留学サポート、中日お見合いサービスを提供'
    };
    
    document.title = titles[lang];
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', descriptions[lang]);
    }
}

// 导航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // 高亮当前导航项
    function highlightNavItem() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', highlightNavItem);
    
    // 初始高亮
    highlightNavItem();
}

// 平滑滚动
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 关闭移动端菜单
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// 移动端菜单
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 点击菜单项时关闭菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // 点击外部区域关闭菜单
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// 表单处理
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 简单的表单验证
            if (!validateForm(data)) {
                return;
            }
            
            // 显示提交状态
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            // 模拟提交（实际项目中应该发送到服务器）
            setTimeout(() => {
                showNotification('消息发送成功！我们会尽快回复您。', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // 实时表单验证
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function validateForm(data) {
    let isValid = true;
    
    // 验证必填字段
    const requiredFields = ['name', 'email', 'message'];
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            showFieldError(field, '此字段为必填项');
            isValid = false;
        }
    });
    
    // 验证邮箱格式
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', '请输入有效的邮箱地址');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(fieldName, '此字段为必填项');
        return false;
    }
    
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        showFieldError(fieldName, '请输入有效的邮箱地址');
        return false;
    }
    
    clearFieldError(fieldName);
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.classList.add('error');
        
        // 移除现有的错误消息
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // 添加新的错误消息
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }
}

function clearFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知系统
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 动画效果
function initAnimations() {
    // 滚动动画观察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.service-card, .news-card, .case-card, .about-content, .contact-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // 添加动画类
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// 数字计数动画
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 30);
    });
}

// 当统计数字进入视口时开始动画
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// 头部滚动效果
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 向下滚动时隐藏头部，向上滚动时显示
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// 初始化头部滚动效果
initHeaderScrollEffect();

// 添加头部滚动样式
const headerStyle = document.createElement('style');
headerStyle.textContent = `
    .header {
        transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444;
    }
    
    .field-error {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    }
`;
document.head.appendChild(headerStyle);

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScrollHandler = debounce(() => {
    // 滚动相关的处理逻辑
}, 16); // 约60fps

window.addEventListener('scroll', optimizedScrollHandler);

// 懒加载图片（如果有的话）
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 初始化懒加载
initLazyLoading();

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    // 可以在这里添加错误报告逻辑
});

// 页面可见性API - 当页面重新可见时刷新数据
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // 页面重新可见时的处理逻辑
        console.log('页面重新可见');
    }
});

// 动态年份功能
function initCurrentYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
}

// 服务详情功能
function openServiceDetail(serviceType) {
    const serviceDetails = {
        auction: {
            title: '日本国志堂拍卖会',
            titleJa: '国志堂オークション',
            image: 'public/images/pmh.jpg',
            description: '国志堂拍卖会专注于古董、工艺品、钻石、金银铜铁摆件器物等精品拍卖，提供专业的鉴定、评估、拍卖服务。我们拥有专业的鉴定团队，确保每一件拍品的真实性和价值。',
            descriptionJa: '国志堂オークションは骨董品、工芸品、ダイヤモンド、金銀銅鉄装飾品などの高級オークションに特化し、専門的な鑑定、評価、オークションサービスを提供しています。',
            features: ['专业鉴定团队', '全球买家网络', '安全交易保障', '专业物流服务'],
            featuresJa: ['専門鑑定チーム', 'グローバルバイヤーネットワーク', '安全取引保証', '専門物流サービス']
        },
        health: {
            title: '中医健康养生',
            titleJa: '中医養生管理',
            image: 'public/images/62464a214ce7f2cc60e2881fe62849666413.jpeg',
            description: '黑龙江国志堂中医健康养生管理有限公司，主营植物多肽压片糖果。产品采用全球诺贝尔奖获得者生命科学技术转化中心联合出品，保险公司承保，品质有保障。',
            descriptionJa: '黒竜江国志堂中医健康養生管理有限公司は、植物ペプチドタブレットを主販しています。製品はノーベル賞受賞者生命科学技術転化センターとの共同製品で、保険会社保証付きです。',
            features: ['诺贝尔技术', '保险承保', '科学配方', '健康保障'],
            featuresJa: ['ノーベル技術', '保険保証', '科学処方', '健康保証']
        },
        study: {
            title: '日本留学·劳务中介',
            titleJa: '日本留学·労務紹介',
            image: 'public/images/roudousha.jpg',
            description: '提供日本留学申请、劳务派遣、签证办理、院校推荐、工作安排等全方位一站式服务。我们拥有丰富的日本教育和就业资源，专业的申请团队，助力顺利赴日留学或工作，实现人生梦想。',
            descriptionJa: '日本留学申請、労務派遣、ビザ手続き、学校推薦、就職サポートなどワンストップサービスを提供。豊富な日本教育·就職リソースと専門的な申請チームで、留学や就職を全面支援し、夢の実現をサポートします。',
            features: ['留学申请服务', '劳务派遣安排', '签证办理指导', '工作生活支持', '全程跟踪服务'],
            featuresJa: ['留学申請サービス', '労務派遣手配', 'ビザ申請指導', '仕事·生活サポート', '全行程フォローサービス']
        },
        matchmaking: {
            title: '中日相亲会',
            titleJa: '中日お見合い',
            image: 'public/images/0A641AE25264637C8DD3DE6553A40A531943AF6F_size1445_w4512_h3008.jpg',
            description: '专业中日跨国婚姻中介服务，为中日单身男女搭建沟通桥梁。我们提供专业的相亲安排、文化交流、语言培训等服务，促进中日友好交流。',
            descriptionJa: '中日国際結婚紹介サービス、中日独身男女の架け橋となります。専門的なお見合いアレンジ、文化交流、言語研修などを提供し、中日友好交流を促進します。',
            features: ['专业匹配服务', '文化交流活动', '语言培训', '婚姻咨询'],
            featuresJa: ['専門マッチングサービス', '文化交流活動', '言語研修', '結婚相談']
        },
        machinery: {
            title: '二手农机买卖',
            titleJa: '中古農機売買',
            image: 'public/images/nongji.jpg',
            description: '提供二手农机设备买卖信息服务，为买卖双方搭建交易平台。我们提供质量保证、售后服务、设备检测等专业服务，确保交易安全可靠。',
            descriptionJa: '中古農機設備売買情報サービス、売買双方の取引プラットフォームを提供。品質保証、アフターサービス、設備検査などの専門サービスで、安全で信頼できる取引を確保します。',
            features: ['质量保证', '专业检测', '售后服务', '交易保障'],
            featuresJa: ['品質保証', '専門検査', 'アフターサービス', '取引保証']
        },
        shopping: {
            title: '日本全品类代购',
            titleJa: '日本全品目代購',
            image: 'public/images/daigou.jpeg',
            description: '提供日本全品类商品代购服务，包括电器、化妆品、服饰、食品等。我们保证正品，价格优惠，快速配送，让您轻松购买日本优质商品。',
            descriptionJa: '日本全カテゴリー商品代購サービス、家電、化粧品、服飾、食品などを提供。正規品保証、お得価格、快速配送で、日本高品質商品を簡単に購入できます。',
            features: ['正品保证', '价格优惠', '快速配送', '专业服务'],
            featuresJa: ['正規品保証', 'お得価格', '快速配送', '専門サービス']
        }
    };

    const service = serviceDetails[serviceType];
    if (service) {
        showServiceModal(service);
    }
}

// 显示服务详情模态框
function showServiceModal(service) {
    const currentLang = document.body.classList.contains('ja') ? 'ja' : 'zh';
    
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeServiceModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${currentLang === 'ja' ? service.titleJa : service.title}</h2>
                <button class="modal-close" onclick="closeServiceModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="service-detail-image">
                    <img src="${service.image || 'public/9735903.jpg'}" alt="${service.title}">
                </div>
                <div class="service-detail-content">
                    <p>${currentLang === 'ja' ? service.descriptionJa : service.description}</p>
                    <div class="service-features">
                        <h3>${currentLang === 'ja' ? 'サービス特徴' : '服务特色'}</h3>
                        <ul>
                            ${(currentLang === 'ja' ? service.featuresJa : service.features).map(feature => 
                                `<li>${feature}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary" onclick="contactService()">
                            ${currentLang === 'ja' ? 'お問い合わせ' : '立即咨询'}
                        </button>
                        <button class="btn btn-secondary" onclick="closeServiceModal()">
                            ${currentLang === 'ja' ? '閉じる' : '关闭'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // 添加模态框样式
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .service-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease-out;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: var(--white);
                border-radius: var(--radius-xl);
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: var(--shadow-xl);
                animation: slideIn 0.3s ease-out;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--spacing-xl);
                border-bottom: 1px solid var(--gray-200);
            }
            
            .modal-header h2 {
                margin: 0;
                color: var(--primary-color);
                font-size: 1.5rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                color: var(--gray-500);
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-close:hover {
                color: var(--gray-700);
            }
            
            .modal-body {
                padding: var(--spacing-xl);
            }
            
            .service-detail-image {
                margin-bottom: var(--spacing-lg);
                border-radius: var(--radius-lg);
                overflow: hidden;
            }
            
            .service-detail-image img {
                width: 100%;
                height: 200px;
                object-fit: cover;
            }
            
            .service-detail-content p {
                color: var(--gray-600);
                line-height: 1.7;
                margin-bottom: var(--spacing-lg);
            }
            
            .service-features h3 {
                color: var(--primary-color);
                margin-bottom: var(--spacing-md);
                font-size: 1.125rem;
            }
            
            .service-features ul {
                list-style: none;
                padding: 0;
                margin-bottom: var(--spacing-xl);
            }
            
            .service-features li {
                padding: var(--spacing-sm) 0;
                color: var(--gray-600);
                position: relative;
                padding-left: var(--spacing-lg);
            }
            
            .service-features li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: var(--success-color);
                font-weight: bold;
            }
            
            .modal-actions {
                display: flex;
                gap: var(--spacing-md);
                justify-content: center;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { 
                    opacity: 0;
                    transform: translateY(-20px) scale(0.95);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    margin: var(--spacing-md);
                }
                
                .modal-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 关闭服务详情模态框
function closeServiceModal() {
    const modal = document.querySelector('.service-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }
}

// 联系服务
function contactService() {
    closeServiceModal();
    // 滚动到联系表单
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = contactSection.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// 发送邮件
function sendEmail() {
    const form = document.getElementById('contact-form');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const message = document.getElementById('message').value;
    
    // 验证表单
    if (!name || !email || !message) {
        alert('请填写必填项！/ 必須項目を入力してください！');
        return;
    }
    
    // 构建邮件内容
    const subject = encodeURIComponent(`来自 ${name} 的咨询`);
    const body = encodeURIComponent(
        `姓名 / お名前: ${name}\n` +
        `邮箱 / メール: ${email}\n` +
        `公司 / 会社: ${company || '未填写'}\n\n` +
        `留言 / メッセージ:\n${message}`
    );
    
    // 打开邮件客户端
    window.location.href = `mailto:hralw111@gmail.com?subject=${subject}&body=${body}`;
    
    // 清空表单
    setTimeout(() => {
        form.reset();
    }, 500);
}

// 导出函数供其他脚本使用
window.LiguozhiApp = {
    setLanguage,
    showNotification,
    validateForm,
    debounce,
    initCurrentYear,
    openServiceDetail,
    closeServiceModal,
    contactService,
    sendEmail
};
