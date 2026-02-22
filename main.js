document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const resultSection = document.getElementById('result-section');
    const resultContent = document.getElementById('result-content');

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

        // 모든 질문에 답변했는지 확인
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

        // 모든 질문에 답하지 않은 경우 경고
        if (answeredQuestions < 5) {
            alert('모든 질문에 답변해주세요!');
            return;
        }

        // 투자 성향 분석
        let profile = '';
        let description = '';
        let recommendations = [];
        let profileClass = '';

        if (score <= 30) {
            profile = '보수적 (Conservative)';
            profileClass = 'profile-conservative';
            description = '안정성을 최우선으로 생각하는 투자자입니다. 원금 손실의 위험을 최소화하고, 예적금보다 약간 높은 수준의 수익률에 만족하는 경향이 있습니다. 시장 변동성에 민감하게 반응할 수 있으며, 장기적인 관점에서 꾸준한 자산 증식을 목표로 합니다.';
            recommendations = [
                '대형 우량주 (예: 삼성전자, SK하이닉스)',
                '정부 또는 우량 회사 발행 채권',
                '채권형 ETF 또는 혼합형 펀드',
                '고배당주'
            ];
        } else if (score <= 70) {
            profile = '균형적 (Balanced)';
            profileClass = 'profile-balanced';
            description = '안정성과 수익성의 균형을 추구하는 투자자입니다. 어느 정도의 위험을 감수하여 은행 이자 이상의 수익을 기대하지만, 공격적인 투자에는 신중한 태도를 보입니다. 분산 투자를 통해 위험을 관리하고, 장기적인 성장을 목표로 합니다.';
            recommendations = [
                '시장 지수 추종 ETF (예: KODEX 200, TIGER 미국 S&P500)',
                '성장주와 가치주의 혼합 포트폴리오',
                '글로벌 리츠(REITs) ETF',
                '우량 기술주 (예: 네이버, 카카오)'
            ];
        } else {
            profile = '공격적 (Aggressive)';
            profileClass = 'profile-aggressive';
            description = '높은 수익률을 위해 높은 위험을 감수할 준비가 된 투자자입니다. 단기적인 시장 변동성을 기회로 활용할 줄 알며, 자산의 큰 폭 성장을 목표로 합니다. 신기술, 신흥 시장 등 성장 잠재력이 큰 분야에 대한 관심이 많습니다.';
            recommendations = [
                '고성장 기술주 (예: 2차 전지, AI 관련주)',
                '나스닥 100 지수 추종 ETF (예: QQQ)',
                '신흥국 시장 투자 ETF',
                '성장 가능성이 높은 중소형주 또는 스타트업'
            ];
        }

        // 결과 HTML 생성
        let resultHTML = `
            <h3>당신의 투자 성향: <span class="profile-badge ${profileClass}">${profile}</span></h3>
            <p>${description}</p>
            <h3>추천 포트폴리오 예시</h3>
            <ul>
                ${recommendations.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p style="font-size: 0.9em; color: #888; margin-top: 20px;">※ 본 결과는 간단한 설문을 바탕으로 한 참고 자료이며, 실제 투자 결정은 전문가와 상담 후 신중하게 내리셔야 합니다.</p>
        `;

        // 결과 표시
        resultContent.innerHTML = resultHTML;
        resultSection.style.display = 'block';

        // 결과 섹션으로 부드럽게 스크롤
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
