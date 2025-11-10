const fs = require('fs');
const path = 'src/App.tsx';
let text = fs.readFileSync(path, 'utf8');
text += '\n\n' + const handleUnitCardClick = (unit: Unit) => {\n  setSelectedUnit(unit);\n  const firstTopic = unit.topics[0];\n  if (!firstTopic) {\n    return;\n  }\n  setSelectedTopic(firstTopic);\n  const steps = buildStepsForTopic(unit, firstTopic);\n  const initialStep = steps[0];\n  setSelectedStepId(initialStep.id);\n  setCurrentView('step');\n};
fs.writeFileSync(path, text);
