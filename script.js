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
    if (processInstagramEmbeds()) return;
    const intervalId = setInterval(() => {
        if (processInstagramEmbeds()) {
            clearInterval(intervalId);
        }
    }, 400);
    setTimeout(() => clearInterval(intervalId), 8000);
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

// =============================================
// HTML 다운로드 기능
// =============================================
var downloadBtn = document.getElementById('download-html-btn');
if (downloadBtn) {
    downloadBtn.onclick = async function() {
        var btn = this;
        btn.innerHTML = '⏳ 준비 중...';
        btn.disabled = true;

        try {
            // 1. CSS 가져오기
            var css = await (await fetch('style.css')).text();

            // 2. HTML 복제 및 수정
            var temp = document.body.cloneNode(true);
            temp.querySelector('.download-section')?.remove();
            
            // fade-in 요소들 모두 visible 처리
            temp.querySelectorAll('.fade-in').forEach(function(el) {
                el.classList.add('visible');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
            
            // 히어로 요소들도 보이게 처리
            var heroTitle = temp.querySelector('.hero-title');
            if (heroTitle) { heroTitle.style.opacity = '1'; heroTitle.style.transform = 'translateY(0)'; }
            var heroTagline = temp.querySelector('.hero-tagline');
            if (heroTagline) { heroTagline.style.opacity = '1'; }

            // 3. HTML 생성
            var html = '<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>이난주 포트폴리오</title><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet"><style>' + css + '</style></head><body>' + temp.innerHTML + '</body></html>';

            // 4. 다운로드
            var a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([html], {type:'text/html;charset=utf-8'}));
            a.download = '이난주_포트폴리오.html';
            a.click();

            btn.innerHTML = '✅ 완료!';
            setTimeout(function() { btn.innerHTML = '포트폴리오 HTML 다운로드'; btn.disabled = false; }, 2000);
        } catch (error) {
            console.error('다운로드 오류:', error);
            alert('오류: ' + error.message);
            btn.innerHTML = '포트폴리오 HTML 다운로드';
            btn.disabled = false;
        }
    };
}
