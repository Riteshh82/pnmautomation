const { test, expect } = require('../../../fixtures/base.fixture');
const { NavbarPage } = require('../../../pages/NavbarPage');
const { ServiceSchedulePage } = require('../../../pages/ServiceSchedulePage');

test.describe('Service Schedule', () => {

  test('@smoke @positive TC-SS-01: Create Service Schedule with multiple templates & tasks', async ({ PnMPage: page }) => {

    const navbar = new NavbarPage(page);
    const service = new ServiceSchedulePage(page);

    await navbar.goToServiceSchedule();
    await service.openAddForm();

    await service.selectEquipment('JCB hydraulic', 'TATA STAR', '32+1S -LP712/42 BSIII');

    const templates = [
      {
        serviceName: 'service 1',
        periodDays: 200,
        primaryReading: 200,
        secondaryReading: 40,
        isActive: true,
        tasks: [
          {
            taskName: 'mobil diesel oil',
            itemName: 'Grease AP3',
            quantity: 2
          }
        ],
        alert: {
          dayBefore: 10,
          readingBefore: 20,
          secondaryReadingBefore: 12,
          message: 'service coming soon',
          remark: 'remark 1'
        }
      },
      {
        serviceName: 'service 2',
        periodDays: 300,
        primaryReading: 300,
        secondaryReading: 40,
        isActive: true,
        tasks: [
          {
            taskName: 'Change old engine oil',
            itemName: 'Mobile Service Van',
            quantity: 10
          },
          {
            taskName: 'mobil diesel oil',
            itemName: 'Grease AP3',
            quantity: 5
          }
        ],
        alert: {
          dayBefore: 10,
          readingBefore: 0,
          secondaryReadingBefore: 10,
          message: 'alert message',
          remark: 'remark 2'
        }
      }
    ];

    for (let i = 0; i < templates.length; i++) {
      await service.addTemplate(templates[i], i);
    }

    await service.submit();
  });
});
