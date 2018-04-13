import appModel from "./app"
import authModel from "./auth"
import wealthModal from './wealth'
import recordModal from './record'
import personModel from "./personModel";


export function registerModels(app) {
  app.model(appModel);
  app.model(authModel);
  app.model(wealthModal);
  app.model(recordModal);
  app.model(personModel);
}
