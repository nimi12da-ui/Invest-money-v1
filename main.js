document.addEventListener('DOMContentLoaded', () => {
    const surveyForm = document.getElementById('survey-form');
    const resultContainer = document.getElementById('result-container');
    const analysisResult = document.getElementById('analysis-result');
    const recommendation = document.getElementById('recommendation');

    surveyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const age = document.getElementById('age').value;
        const investmentGoal = document.getElementById('investment-goal').value;
        const investmentHorizon = document.getElementById('investment-horizon').value;
        const investmentKnowledge = document.getElementById('investment-knowledge').value;
        const riskTolerance1 = document.querySelector('input[name="risk-tolerance-1"]:checked').value;
        const riskTolerance2 = document.querySelector('input[name="risk-tolerance-2"]:checked').value;
        const investmentStyle = document.getElementById('investment-style').value;

        // --- Investment Propensity Analysis ---
        let score = 0;

        // Age
        if (age === '20s' || age === '30s') score += 10;
        else if (age === '40s') score += 5;

        // Investment Horizon
        if (investmentHorizon === 'long-term') score += 20;
        else if (investmentHorizon === 'mid-term') score += 10;

        // Investment Knowledge
        if (investmentKnowledge === 'advanced') score += 15;
        else if (investmentKnowledge === 'intermediate') score += 10;

        // Risk Tolerance 1
        if (riskTolerance1 === 'buy') score += 25;
        else if (riskTolerance1 === 'hold') score += 15;
        else if (riskTolerance1 === 'sell') score -= 10; // Penalty for selling

        // Risk Tolerance 2
        if (riskTolerance2 === 'high') score += 20;
        else if (riskTolerance2 === 'medium') score += 10;

        // Investment Style
        if (investmentStyle === 'aggressive') score += 10;
        else if (investmentStyle === 'moderate') score += 5;

        // --- Determine Investment Propensity and Recommendations ---
        let analysis = '';
        let portfolio = '';

        if (score >= 70) {
            analysis = `
                <p><strong>투자 성향:</strong> 공격 투자형</p>
                <p>총점: ${score}점</p>
                <p>귀하는 높은 수준의 위험을 감수하고서라도 높은 수익을 추구하는 <strong>공격 투자형</strong> 투자자입니다. 시장 변동성에 대한 이해도가 높고, 손실 발생 시에도 추가 매수를 고려할 만큼 대담한 투자 성향을 보입니다. 장기적인 관점에서 자산 증대를 목표로 하는 경향이 있습니다.</p>
            `;
            portfolio = `
                <ul>
                    <li><strong>성장주 (60%):</strong> 기술주, 바이오주 등 고성장 예상 종목</li>
                    <li><strong>가치주 (20%):</strong> 저평가된 우량 기업 주식</li>
                    <li><strong>신흥국 주식 (15%):</strong> 높은 성장 잠재력을 지닌 신흥 시장 투자</li>
                    <li><strong>현금 (5%):</strong> 유동성 확보</li>
                </ul>
            `;
        } else if (score >= 40) {
            analysis = `
                <p><strong>투자 성향:</strong> 중립 투자형</p>
                <p>총점: ${score}점</p>
                <p>귀하는 안정성과 수익성의 균형을 추구하는 <strong>중립 투자형</strong> 투자자입니다. 어느 정도의 위험은 감수하지만, 원금 손실 가능성에는 신중한 태도를 보입니다. 중장기적인 관점에서 꾸준한 자산 증식을 목표로 합니다.</p>
            `;
            portfolio = `
                <ul>
                    <li><strong>가치주 (40%):</strong> 안정적인 우량 기업 주식</li>
                    <li><strong>배당주 (30%):</strong> 꾸준한 현금 흐름을 제공하는 배당주</li>
                    <li><strong>채권 (20%):</strong> 안정적인 국공채 또는 우량 회사채</li>
                    <li><strong>현금 (10%):</strong> 유동성 및 기회비용 확보</li>
                </ul>
            `;
        } else {
            analysis = `
                <p><strong>투자 성향:</strong> 안정 추구형</p>
                <p>총점: ${score}점</p>
                <p>귀하는 원금 보장을 최우선으로 생각하는 <strong>안정 추구형</strong> 투자자입니다. 시장 변동성에 민감하며, 손실 회피 성향이 강합니다. 단기적인 투자보다는 장기적인 안정성을 선호하는 경향이 있습니다.</p>
            `;
            portfolio = `
                <ul>
                    <li><strong>국공채 (50%):</strong> 정부가 보증하는 가장 안전한 자산</li>
                    <li><strong>우량 회사채 (30%):</strong> 신용도가 높은 기업의 채권</li>
                    <li><strong>예금 (20%):</strong> 원금 보장 및 유동성 확보</li>
                </ul>
            `;
        }

        // Display results
        analysisResult.innerHTML = analysis;
        recommendation.innerHTML = portfolio;
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    });
});
