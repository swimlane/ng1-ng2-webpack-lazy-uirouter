export function loadNg1Module(getModule) {
  return (transition) => {
    let $ocLazyLoad = transition.injector().get('$ocLazyLoad');

    return new Promise((success, fail) => {
      getModule().then(newModule => {
        if(!newModule.name) newModule = newModule.default;
        $ocLazyLoad.load(newModule).then(success, fail);
      });
    });
  };
}
