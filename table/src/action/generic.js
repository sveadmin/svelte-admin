export const runGenericAction = async function({callback}) {
  await callback();
}