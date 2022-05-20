import Button from '@folio/stripes-testing/interactors/button';
import Checkbox from '@folio/stripes-testing/interactors/checkbox';
import Pane from '@folio/stripes-testing/interactors/pane';

describe('Visit settings', () => {
  before(() => {
    cy.loginAsAdmin();
  });

  it('finds resource sharing settings', () => {
    cy.do(Button('Settings').click());
    cy.do(Button('Resource Sharing').click());
    cy.expect(Button('Auto responder settings').exists());
  });

  it('displays autoresponder settings', () => {
    cy.visit('/settings/rs/autoResponder');
    cy.expect(Pane({ title: 'Auto responder settings' }).exists());
  });

  it('displays ISO18626 settings', () => {
    cy.visit('/settings/rs/CustomISO18626Settings');
    cy.expect(Pane({ title: 'Custom ISO18626 settings' }).exists());
  });

  it('displays host lms location settings', () => {
    cy.visit('/settings/rs/lmslocations');
    cy.expect(Pane({ title: 'Host LMS locations' }).exists());
    cy.do(Button('Create').click());
    cy.expect(Button('Save').is({ disabled: true }));
  });

  it('displays host lms patron profile settings', () => {
    cy.visit('/settings/rs/lmsprofiles');
    cy.expect(Pane({ title: 'Host LMS patron profiles' }).exists());
    cy.do(Button('Create').click());
    cy.expect(Button('Save').is({ disabled: true }));
  });

  it('displays host lms shelving location settings', () => {
    cy.visit('/settings/rs/lmsshelving');
    cy.expect(Pane({ title: 'Host LMS shelving locations' }).exists());
    cy.do(Button('Create').click());
    cy.expect(Button('Save').is({ disabled: true }));
  });

  it('displays notice policy settings', () => {
    cy.visit('/settings/rs/notice-policies');
    cy.expect(Pane({ title: 'Notice policies' }).exists());
    cy.do(Button('+ New').click());
    cy.expect(Pane({ title: 'New notice policy' }).exists());
  });

  it('displays notice template settings', () => {
    cy.visit('/settings/rs/notices');
    cy.expect(Pane({ title: 'Notice templates' }).exists());
    cy.do(Button('+ New').click());
    cy.expect(Pane({ title: 'New notice template' }).exists());
  });

  it('displays pullslip notification settings', () => {
    cy.visit('/settings/rs/pullslip-notifications');
    cy.expect(Pane({ title: 'Pull slip notifications' }).exists());
    cy.do(Button('New').click());
    cy.expect(Button('Save').is({ disabled: true }));
  });

  it('displays pullslip template settings', () => {
    cy.visit('/settings/rs/pullslipTemplates');
    cy.expect(Pane({ title: 'Pull slip templates' }).exists());
    cy.do(Button('+ New').click());
    cy.expect(Pane({ title: 'New pullslip template' }).exists());
  });
});