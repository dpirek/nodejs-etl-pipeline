
function dag() {
  let extractFn;
  let transformFn;
  let loadFn;

  function extract(fn) {
    extractFn = fn;
    return this;
  }

  function transform(fn) {
    transformFn = fn;
    return this;
  }

  function load(fn) {
    loadFn = fn;
    return this;
  }

  async function run() {
    try {
      const data = await extractFn();
      const transformedData = await transformFn(data);
      await loadFn(transformedData);
    } catch (error) {
      console.error('Error in DAG execution:', error);
    }
  }

  return {
    extract,
    transform,
    load,
    run,
  };
}

module.exports = dag;