import Button from '@folio/stripes-testing/interactors/button';
import Checkbox from '@folio/stripes-testing/interactors/checkbox';
import KeyValue from '@folio/stripes-testing/interactors/key-value';
import MultiColumnList from '@folio/stripes-testing/interactors/multi-column-list';
import Pane from '@folio/stripes-testing/interactors/pane';
import Select from '@folio/stripes-testing/interactors/select';
import SearchField from '@folio/stripes-testing/interactors/search-field';
import TextField from '@folio/stripes-testing/interactors/text-field';
import { Heading, including, setInteractorTimeout } from '@interactors/html';

describe('Create request and move it through workflow', () => {
  const cfg = Cypress.env('flow');

  // Only run this test if we've been configured to do so
  if (typeof cfg !== 'object') return false;

  before(() => {
    setInteractorTimeout(5000);

    // log in to supplier
    cy.login(cfg.supplierLogin, cfg.supplierPassword, {
      path: cfg.supplierBase,
      waiter: () => cy.expect(Heading(including('Welcome')).exists())
    });

    // log in to requester
    cy.loginAsAdmin();
  });

  // Cypress is set up such that tests aren't supposed to depend on context from each other.
  // Since this is all coupled together, it's thus best modelled (I guess?) as one really big
  // test.
  it('creates new request and moves it through the workflow', () => {

    // Create request
    cy.visit('/request');
    cy.do(Button('New').click());
    cy.expect(Pane({ title: 'Create patron request' }).exists());
    cy.do([
      TextField('Requesting user*').fillIn(cfg.patron),
      Select('Pick-up location*').choose(cfg.pickupLocation),
      TextField('System identifier').fillIn(cfg.itemSystemId),
      TextField('ISBN').fillIn(cfg.itemISBN),
      TextField('Title*').fillIn(cfg.itemTitle),
      TextField('Author*').fillIn(cfg.itemAuthor),
      Button('Create patron request').click(),
      Button('Details').click(),
    ]);

    // Read details of new request
    cy.then(() => KeyValue('Request ID').value()).as('hrid');
    cy.then(() => KeyValue('Full ID').value()).as('reqId');

    // Find request on supplier and store id
    cy.visit(`${cfg.supplierBase}/supply`);
    cy.get('@hrid').then(hrid => SearchField().fillIn(hrid)),
    cy.do([
      Button('Search').click(),
      MultiColumnList().click({ row: 0 }),
      Button('Details').click(),
    ]);
    cy.then(() => KeyValue('Full ID').value()).as('supId');

    // Move request through workflow until shipped
    cy.do([
      Button('Flow').click(),
      Button('Mark pull slip printed').click(),
      TextField().fillIn('123'),
      Button('Scan').click(),
      Button('Mark request shipped').click(),
    ]);

    // Return to requester and proceed
    cy.get('@reqId').then(reqId => cy.visit(`/request/requests/view/${reqId}`));
    cy.do(Button('Mark received').click());
    cy.contains('returned by patron and return shipped');
    cy.get('@hrid').then(hrid => TextField().fillIn(hrid));
    cy.do(Button('Scan').click());

    // Complete request at supplier
    cy.wait(2000);
    cy.get('@supId').then(supId => cy.visit(`${cfg.supplierBase}/supply/requests/view/${supId}`));
    cy.do(Button('Complete request').click());

  });

});
