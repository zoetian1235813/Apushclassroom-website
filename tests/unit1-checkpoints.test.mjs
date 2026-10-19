import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
async function loadTS(path) {
  const { outputText } = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const { nextCheckpoint } = await loadTS('src/utils/checkpointScheduler.ts');
const { unit1Checks } = await loadTS('src/data/unit1VideoChecks.ts');
const { unit1ExitTickets } = await loadTS('src/data/unit1ExitTickets.ts');
const checks=[{id:'first',timestamp:55},{id:'second',timestamp:188}];
test('playback crossing triggers once, before threshold does not',()=>{
  assert.equal(nextCheckpoint(checks,new Set(),0,54),undefined);
  assert.equal(nextCheckpoint(checks,new Set(),54,55)?.id,'first');
  assert.equal(nextCheckpoint(checks,new Set(['first']),54,56),undefined);
});
test('seeking forward cannot skip required checkpoints',()=>{
  assert.equal(nextCheckpoint(checks,new Set(),0,200)?.id,'first');
  assert.equal(nextCheckpoint(checks,new Set(['first']),200,201)?.id,'second');
  assert.equal(nextCheckpoint(checks,new Set(['first','second']),200,201),undefined);
  assert.equal(nextCheckpoint(checks,new Set(['first']),190,20),undefined);
});
test('invalid time is ignored and later checkpoints still work after earlier dismissal',()=>{
  assert.equal(nextCheckpoint(checks,new Set(),0,NaN),undefined);
  assert.equal(nextCheckpoint(checks,new Set(['first']),187,189)?.id,'second');
});
test('all six U1 lessons have two valid checkpoints and matching exit tickets',()=>{
  const ids=new Set();
  for(let i=1;i<=6;i++) {
    const id=`1.${i}`;
    assert.equal(unit1Checks[id].length,2);
    for(const check of unit1Checks[id]) {
      assert.equal(check.choices.length,4);
      assert.ok(check.choices.some(choice=>choice.id===check.correctChoiceId));
      assert.ok(check.timestamp>0);
      assert.ok(!ids.has(check.id)); ids.add(check.id);
      assert.doesNotMatch(check.question + check.explanation + check.choices.map(c=>c.text).join(''), /[\u3400-\u9fff]/);
    }
    assert.ok(unit1ExitTickets[id].prompt && unit1ExitTickets[id].sample);
  }
});
