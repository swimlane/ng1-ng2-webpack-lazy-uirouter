 import {NgModuleFactoryLoader, NgModuleRef, Injector, NgModuleFactory, Type, Compiler} from '@angular/core';

 import {Transition} from 'ui-router-ng2/transition/transition';
 import {RootModule, StatesModule, UIROUTER_ROOT_MODULE, UIROUTER_MODULE_TOKEN} from 'ui-router-ng2/ng2/uiRouterNgModule';
 import {applyModuleConfig} from 'ui-router-ng2/ng2/uiRouterConfig';
 import {UIRouter} from 'ui-router-ng2/router';
 import {Resolvable} from 'ui-router-ng2/resolve/resolvable';
 import {NATIVE_INJECTOR_TOKEN} from 'ui-router-ng2/resolve/resolveContext';

 /**
  * THIS IS A FORKED COPY FROM:
  *
  *    https://github.com/angular-ui/ui-router/pull/3037
  *
  * FOR THE FILE
  *
  *    https://github.com/angular-ui/ui-router/blob/master/src/ng2/lazyLoadNgModule.ts#L13-L90
  *
  * Remove soon!
  */
 export function loadNgModule(moduleToLoad) {
   const getNg2Injector = (transition) =>
       transition.injector().getAsync(NATIVE_INJECTOR_TOKEN);

   const loadModuleFactory = (loadChildren, ng2Injector) =>{
     if(typeof(loadChildren) === 'string'){
       return ng2Injector.get(NgModuleFactoryLoader).load(loadChildren);
     } else {
       const compiler: Compiler = ng2Injector.get(Compiler);
       const offlineMode = compiler instanceof Compiler;
       const loadChildrenPromise = Promise.resolve(loadChildren());
       return offlineMode ? loadChildrenPromise : loadChildrenPromise.then( moduleType => compiler.compileModuleAsync(moduleType))
     }
   }

   const createNg2Module = (moduleToLoad, ng2Injector) =>
       loadModuleFactory(moduleToLoad, ng2Injector).then((factory) =>
           factory.create(ng2Injector));

   function loadUIRouterModules(transition, ng2Module) {
     let injector = ng2Module.injector;
     let parentInjector = ng2Module.injector['parent'];
     let uiRouter = injector.get(UIRouter);

     let originalName = transition.to().name;
     let originalState = uiRouter.stateRegistry.get(originalName);

     let rootModules = injector.get(UIROUTER_ROOT_MODULE);
     let parentRootModules = parentInjector.get(UIROUTER_ROOT_MODULE);
     let newRootModules = rootModules.filter(module => parentRootModules.indexOf(module) === -1);

     if (newRootModules.length) {
       console.log(rootModules);
       throw new Error('Lazy loaded modules should not contain a UIRouterModule.forRoot() module');
     }

     let modules = injector.get(UIROUTER_MODULE_TOKEN);
     modules.forEach(module => applyModuleConfig(uiRouter, injector, module));

     let replacementState = uiRouter.stateRegistry.get(originalName);
     if (replacementState === originalState) {
       throw new Error(`The module that was loaded from ${moduleToLoad} should have a ui-router state named '${originalName}'`);
     }

     replacementState.$$state().resolvables.push(Resolvable.fromData(NATIVE_INJECTOR_TOKEN, injector));

     return {};
   }

   return (transition) => getNg2Injector(transition)
       .then((injector) => createNg2Module(moduleToLoad, injector))
       .then((moduleRef) => loadUIRouterModules(transition, moduleRef))
 }
