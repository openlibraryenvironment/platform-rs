import Button from '@folio/stripes-testing/interactors/button';
import Checkbox from '@folio/stripes-testing/interactors/checkbox';
import Pane from '@folio/stripes-testing/interactors/pane';
import Dropdown from '@folio/stripes-testing/interactors/dropdown';
import { setInteractorTimeout } from '@interactors/html';

describe('Visit apps', () => {
  before(() => {
    setInteractorTimeout(5000);
    cy.loginAsAdmin();
  });

  it('loads request app and creation form', () => {
    // need to navigate via navbar to get default search
    cy.do(Button('Request').click());
    cy.expect(Pane({ title: 'Requests' }).exists());
    cy.expect(Checkbox({ name: 'Hide completed' }).has({ checked: true }));
    cy.do(Button('New').click());
    cy.expect(Pane({ title: 'Create patron request' }).exists());
  });

  it('loads supply app', () => {
    cy.visit('/supply');
    cy.expect(Pane({ title: 'Supply' }).exists());
  });

  it('loads directory app and creation form', () => {
    cy.visit('/directory');
    cy.expect(Pane({ title: 'Directory' }).exists());
    cy.do(Button('New').click());
    cy.expect(Pane({ title: 'Create root directory entry' }).exists());
  });

  it('loads update app', () => {
    cy.visit('/update');
    cy.expect(Dropdown().exists());
  });

  it('loads users app', () => {
    cy.visit('/users');
    cy.expect(Pane({ title: 'User search' }).exists());
  });

});