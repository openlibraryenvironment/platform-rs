import Button from '@folio/stripes-testing/interactors/button';
import Dropdown from '@folio/stripes-testing/interactors/dropdown';
import TextField from '@folio/stripes-testing/interactors/text-field';
import { Heading, including } from '@interactors/html';

Cypress.Commands.add('login', (username, password, visitPath = { path: '/', waiter: () => cy.expect(Heading(including('Welcome')).exists()) }) => {
  // We use a behind-the-scenes method of ensuring we are logged
  // out, rather than using the UI, in accordance with the Best
  // Practices guidance at
  // https://docs.cypress.io/guides/references/best-practices.html#Organizing-Tests-Logging-In-Controlling-State
  // localforage.removeItem('okapiSess');

  // That other approach only worked for the base url and added an extra dep
  cy.visit(visitPath.path, {
    onBeforeLoad(win) {
      win.localStorage.clear();
      win.indexedDB.deleteDatabase('localforage');
    },
  });

  try {
  cy.get(TextField('Username')).then(() => {
    // Todo: find the way to wrap interactor to cy chainable object
    cy.do([
      TextField('Username').fillIn(username),
      TextField('Password').fillIn(password),
      Button('Log in').click()
    ]);

    // TODO: find the way how customize waiter timeout in case of interactors(cy.wrap may be)
    // https://stackoverflow.com/questions/57464806/set-timeout-for-cypress-expect-assertion
    // https://docs.cypress.io/api/commands/wrap#Requirements

    visitPath.waiter();
  });
} catch (e) {}

  // There seems to be a race condition here: sometimes there is
  // re-render that happens so quickly that following actions like
  //       cy.get('#app-list-item-clickable-courses-module').click()
  // fail because the button becomes detached from the DOM after the
  // get() but before the click().
});

Cypress.Commands.add('logout', () => {
  cy.do([
    Dropdown('My profile').open(),
    Button('Log out').click(),
  ]);

  cy.expect(Button('Log in', { disabled: true }).exists());
});

Cypress.Commands.add('loginAsAdmin', (visitPath) => {
  cy.login(Cypress.env('admin_login'), Cypress.env('admin_password'), visitPath);
});
