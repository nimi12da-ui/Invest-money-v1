document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const resultSection = document.getElementById('result-section');
    const resultContent = document.getElementById('result-content');

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(quizForm);
        let score = 0;
        let answeredQuestions = 0;

        for (let i = 1; i <= 5; i++) {
            const value = formData.get(`q${i}`);
            if (value) {
                score += parseInt(value, 10);
                answeredQuestions++;
            }
        }

        if (answeredQuestions < 5) {
            alert('모든 질문에 답변해주세요!');
            return;
        }

        let profile = '';
        let description = '';
        let bestRecommendation = { title: '', reason: '' };
        let otherOptions = [];
        let profileClass = '';

        if (score <= 30) {
            profile = '보수적 (Conservative)';
            profileClass = 'profile-conservative';
            description = '안정성을 최우선으로 생각하는 투자자입니다. 원금 손실의 위험을 최소화하고, 예적금보다 약간 높은 수준의 수익률에 만족하는 경향이 있습니다.';
            bestRecommendation = {
                title: '국채 또는 최상위 신용등급 회사채',
                reason: '가장 낮은 위험도를 가진 자산으로, 국가나 신용도가 매우 높은 기업이 발행하여 원금과 이자의 안정성이 보장됩니다. 시장 변동성 속에서 자산을 안전하게 지키는 최고의 선택입니다.'
            };
            otherOptions = [
                '안정적인 고배당주 (예: 금융주, 통신주)',
                '금/은 등 귀금속 (전통적인 안전 자산)',
                '부동산 리츠(REITs) 중 안정적인 임대 수익형'
            ];
        } else if (score <= 70) {
            profile = '균형적 (Balanced)';
            profileClass = 'profile-balanced';
            description = '안정성과 수익성의 균형을 추구하는 투자자입니다. 어느 정도의 위험을 감수하여 은행 이자 이상의 수익을 기대하지만, 공격적인 투자에는 신중한 태도를 보입니다.';
            bestRecommendation = {
                title: '주요 시장 지수 추종 ETF (S&P 500, KOSPI 200 등)',
                reason: '단 하나의 종목으로 시장 전체에 분산 투자하는 효과를 누릴 수 있습니다. 안정적인 장기 성장과 위험 관리를 동시에 추구하는 가장 합리적인 방법입니다.'
            };
            otherOptions = [
                '글로벌 우량주와 채권 혼합 포트폴리오',
                '안정적 수익의 상업용 부동산',
                '이더리움 (상대적으로 안정성이 검증된 암호화폐)'
            ];
        } else {
            profile = '공격적 (Aggressive)';
            profileClass = 'profile-aggressive';
            description = '높은 수익률을 위해 높은 위험을 감수할 준비가 된 투자자입니다. 단기적인 시장 변동성을 기회로 활용하며, 자산의 큰 폭 성장을 목표로 합니다.';
            bestRecommendation = {
                title: '나스닥 100 지수 추종 ETF (기술주 중심)',
                reason: '글로벌 혁신을 주도하는 기술 기업들에 집중 투자하여, 시장 평균을 뛰어넘는 폭발적인 성장을 기대할 수 있는 가장 효과적인 수단입니다.'
            };
            otherOptions = [
                '유망 섹터의 성장주 (AI, 바이오, 신재생에너지)',
                '비트코인 (고위험 고수익 대표 암호화폐)',
                '개발도상국 또는 신흥시장 주식형 펀드'
            ];
        }

        let resultHTML = `
            <h3>당신의 투자 성향: <span class="profile-badge ${profileClass}">${profile}</span></h3>
            <p>${description}</p>
            
            <div class="best-rec-card">
                <h4>⭐ 당신을 위한 최고의 투자 전략</h4>
                <p class="rec-title">${bestRecommendation.title}</p>
                <p class="rec-reason"><b>이유:</b> ${bestRecommendation.reason}</p>
            </div>

            <h3>추가적으로 고려할 수 있는 자산군</h3>
            <ul>
                ${otherOptions.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p class="disclaimer">※ 본 결과는 참고 자료이며, 실제 투자 결정은 전문가와 상담 후 신중하게 내리셔야 합니다.</p>
        `;

        resultContent.innerHTML = resultHTML;
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
