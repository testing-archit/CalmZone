document.getElementById('mood-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const mood = document.getElementById('mood').value;
    const thoughts = document.getElementById('thoughts').value;
    const energyLevel = document.getElementById('energy-level').value;
    const stressLevel = document.getElementById('stress-level').value;
    const gratitude = document.getElementById('gratitude').value;
    const sleepQuality = document.getElementById('sleep-quality').value;
    const socialInteraction = document.getElementById('social-interaction').value;
    const physicalActivity = document.getElementById('physical-activity').value;
    const nutrition = document.getElementById('nutrition').value;
    const selfCare = document.getElementById('self-care').value;
    const stressTriggers = document.getElementById('stress-triggers').value;

    const reportContent = `
        Mood: ${mood}<br>
        Thoughts: ${thoughts}<br>
        Energy Level: ${energyLevel}<br>
        Stress Level: ${stressLevel}<br>
        Gratitude: ${gratitude}<br>
        Sleep Quality: ${sleepQuality}<br>
        Social Interaction: ${socialInteraction}<br>
        Physical Activity: ${physicalActivity}<br>
        Nutrition: ${nutrition}<br>
        Self-Care Activities: ${selfCare}<br>
        Stress Triggers: ${stressTriggers}
    `;

    document.getElementById('report-content').innerHTML = reportContent;
    document.getElementById('report').style.display = 'block';
});
