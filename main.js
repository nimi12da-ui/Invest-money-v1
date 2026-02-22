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
        let bestRecommendation = {};
        let otherOptions = [];
        let profileClass = '';

        if (score <= 30) {
            profile = '보수적 (Conservative)';
            profileClass = 'profile-conservative';
            description = '안정성을 최우선으로 생각하는 투자자입니다. 원금 손실의 위험을 최소화하고, 예적금보다 약간 높은 수준의 수익률에 만족하는 경향이 있습니다.';
            bestRecommendation = {
                title: '대한민국 국고채 10년물',
                ticker: 'KTB10Y',
                details: `
                    <p><b>[기대 수익률]</b> 연 3.0 ~ 3.5%</p>
                    <p><b>[2026년 말 전망]</b> 글로벌 경제의 불확실성이 지속될 가능성이 높아 안전자산으로서의 국채의 매력은 계속 유지될 것입니다. 향후 금리 인하 시기에는 채권 가격 상승으로 인한 추가 자본 차익도 기대할 수 있습니다. 포트폴리오의 안정성을 확보하는 가장 확실한 선택입니다.</p>
                `
            };
            otherOptions = [
                '삼성전자 (Ticker: 005930): 안정적인 대형 우량주',
                '맥쿼리인프라 (Ticker: 088980): 높은 배당률의 인프라 펀드',
                '금 (Gold): 전통적인 인플레이션 헤지 자산'
            ];
        } else if (score <= 70) {
            profile = '균형적 (Balanced)';
            profileClass = 'profile-balanced';
            description = '안정성과 수익성의 균형을 추구하는 투자자입니다. 어느 정도의 위험을 감수하여 은행 이자 이상의 수익을 기대하지만, 공격적인 투자에는 신중한 태도를 보입니다.';
            bestRecommendation = {
                title: 'S&P 500 지수 추종 ETF',
                ticker: 'SPY',
                details: `
                    <p><b>[기대 수익률]</b> 연 8 ~ 12%</p>
                    <p><b>[2026년 말 전망]</b> AI 기술 혁신과 견고한 미국 소비 시장을 바탕으로 장기적인 우상향이 가장 유력한 자산입니다. 2025년 이후 연준의 금리 인하가 본격화되면 기술주 중심의 성장이 가속화될 가능성이 높습니다. 시장 전체에 투자하여 안정적인 장기 성장을 추구하는 최고의 전략입니다.</p>
                `
            };
            otherOptions = [
                '이더리움 (Ticker: ETH): 스마트 컨트랙트 플랫폼의 성장성',
                'TIGER 미국배당다우존스 (Ticker: 360750): 꾸준한 배당 성장',
                '판교/강남 핵심 권역 오피스 빌딩 (리츠 간접투자)'
            ];
        } else {
            profile = '공격적 (Aggressive)';
            profileClass = 'profile-aggressive';
            description = '높은 수익률을 위해 높은 위험을 감수할 준비가 된 투자자입니다. 단기적인 시장 변동성을 기회로 활용하며, 자산의 큰 폭 성장을 목표로 합니다.';
            bestRecommendation = {
                title: '엔비디아 (NVIDIA)',
                ticker: 'NVDA',
                details: `
                    <p><b>[기대 수익률]</b> 연 20% 이상 (높은 변동성 수반)</p>
                    <p><b>[2026년 말 전망]</b> AI 시장의 독점적인 지위를 바탕으로 2026년까지 가장 폭발적인 성장이 기대되는 종목입니다. 데이터센터, 자율주행, AI 소프트웨어 등 모든 미래 산업의 핵심 인프라를 제공하며, 시장의 기대를 뛰어넘는 실적을 계속 발표할 가능성이 높습니다. 높은 위험 속에서 최고의 수익을 추구하는 투자자에게 가장 매력적인 선택입니다.</p>
                `
            };
            otherOptions = [
                '비트코인 (Ticker: BTC): 디지털 금, 높은 변동성의 고수익 자산',
                'SOXL (3배 레버리지 반도체 ETF): 극대화된 수익 추구',
                '베트남/인도 등 신흥국 시장 투자 ETF'
            ];
        }

        let resultHTML = `
            <h3>당신의 투자 성향: <span class="profile-badge ${profileClass}">${profile}</span></h3>
            <p>${description}</p>
            
            <div class="best-rec-card">
                <h4>⭐ 당신을 위한 최고의 투자 전략</h4>
                <p class="rec-title">${bestRecommendation.title} <span class="rec-ticker">(${bestRecommendation.ticker})</span></p>
                <div class="rec-details">${bestRecommendation.details}</div>
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
