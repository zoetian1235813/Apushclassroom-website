// // 原来的错误写法（带 .ts 后缀）
// // import { unit1Contents } from './units/unit1.ts';

// // 正确写法（去掉 .ts）
// import { unit1Contents } from './units/unit1';
// import { unit2Contents } from './units/unit2';
// import { unit3Contents } from './units/unit3';
// import { unit4Contents } from './units/unit4';
// import { unit5Contents } from './units/unit5';
// import { unit6Contents } from './units/unit6';
// import { unit7Contents } from './units/unit7';
// import { unit8Contents } from './units/unit8';
// import { unit9Contents } from './units/unit9';

// // 后面的代码不变...
// export const topicContents: Record<string, string> = {
//   ...unit1Contents,
//   ...unit2Contents,
//   // ... 其他单元
// };

// export {
//   unit1Contents,
//   // ... 其他单元
// };