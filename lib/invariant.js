//#region lib/types/invariant.js
const PACKAGE_NAME = "dsh-image-conatiner";
const name = "dsh-image-conatiner-invariant";
const inject = ["invariants"];
const install = () => {};
const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
//#endregion
export { apply, inject, name };
