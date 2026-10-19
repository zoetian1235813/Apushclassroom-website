import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
async function loadTS(path) {
  const { outputText } = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const { nextCheckpoint } = await loadTS('src/utils/checkpointScheduler.ts');
const { buildStepsForTopic } = await loadTS('src/utils/lessonUtils.ts');
const { unit1ExitTickets } = await loadTS('src/data/unit1ExitTickets.ts');
const checks=[{id:'first',timestamp:55},{id:'second',timestamp:188}];
test('playback crossing triggers once, before threshold does not',()=>{
  assert.equal(nextCheckpoint(checks,new Set(),0,54),undefined);
  assert.equal(nextCheckpoint(checks,new Set(),54,55)?.id,'first');
  assert.equal(nextCheckpoint(checks,new Set(['first']),54,56),undefined);
});
test('rewind and a seek across multiple checkpoints do not create a popup backlog',()=>{
  assert.equal(nextCheckpoint(checks,new Set(),190,20),undefined);
  assert.equal(nextCheckpoint(checks,new Set(),0,200)?.id,'second');
  assert.equal(nextCheckpoint(checks,new Set(),200,201),undefined);
});
test('invalid time is ignored and later checkpoints still work after earlier dismissal',()=>{
  assert.equal(nextCheckpoint(checks,new Set(),0,NaN),undefined);
  assert.equal(nextCheckpoint(checks,new Set(['first']),187,189)?.id,'second');
});
test('all six U1 lessons have two valid checkpoints and matching exit tickets',()=>{
  const ids=new Set();
  for(let i=1;i<=6;i++) {
    const id=`1.${i}`;
    for(const region of ['china','overseas']) {
      const step=buildStepsForTopic({id:1},{id},region)[0];
      assert.equal(step.videoChecks.length,2);
      assert.ok(step.videoEmbedUrl.startsWith('https://'));
      for(const check of step.videoChecks) {
        assert.ok(check.choices.some(choice=>choice.id===check.correctChoiceId));
        assert.ok(check.timestamp>0);
        if(region==='overseas'){ assert.ok(!ids.has(check.id));ids.add(check.id); }
      }
    }
    assert.ok(unit1ExitTickets[id].prompt && unit1ExitTickets[id].sample);
  }
});
