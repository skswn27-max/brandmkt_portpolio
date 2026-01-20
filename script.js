// =============================================
// Brand Maker 포트폴리오 - JavaScript
// =============================================

// 모바일 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// 메뉴 클릭 시 닫기
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// 스크롤 시 네비게이션 스타일 변경
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 인스타그램 임베드 렌더링 보장
const processInstagramEmbeds = () => {
    if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
        window.instgrm.Embeds.process();
        return true;
    }
    return false;
};

const ensureInstagramEmbeds = () => {
    // 즉시 시도
    if (processInstagramEmbeds()) return;
    
    // 반복 시도 (더 자주, 더 오래)
    let attempts = 0;
    const maxAttempts = 30;
    const intervalId = setInterval(() => {
        attempts++;
        if (processInstagramEmbeds() || attempts >= maxAttempts) {
            clearInterval(intervalId);
        }
    }, 300);
    
    // 페이지 로드 완료 후 추가 시도
    window.addEventListener('load', () => {
        setTimeout(processInstagramEmbeds, 500);
        setTimeout(processInstagramEmbeds, 1500);
        setTimeout(processInstagramEmbeds, 3000);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const instagramScript = document.querySelector('script[data-instgrm-embed]');
    if (instagramScript) {
        instagramScript.addEventListener('load', ensureInstagramEmbeds, { once: true });
    }
    ensureInstagramEmbeds();
});

// 스크롤 애니메이션 (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 애니메이션 적용할 요소들
document.querySelectorAll('.project-item, .capability-item, .skill-block, .stat-item, .contact-link').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// CSS에 fade-in 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .fade-in:nth-child(1) { transition-delay: 0s; }
    .fade-in:nth-child(2) { transition-delay: 0.1s; }
    .fade-in:nth-child(3) { transition-delay: 0.2s; }
    .fade-in:nth-child(4) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 히어로 타이틀 글자 애니메이션 효과 (선택사항)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
}

// 태그라인 애니메이션
const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
    heroTagline.style.opacity = '0';
    
    setTimeout(() => {
        heroTagline.style.transition = 'opacity 1s ease';
        heroTagline.style.opacity = '1';
    }, 800);
}

