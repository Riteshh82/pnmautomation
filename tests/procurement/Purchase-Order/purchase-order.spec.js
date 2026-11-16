const { test } = require('../../../fixtures/base.fixture');
const { PurchaseOrderPage } = require('../../../pages/PurchaseOrderPage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Purchase Order Procurement — End-to-End Tests
 *
 * Tags:
 *   @smoke           — critical happy path
 *   @positive        — happy-path scenarios
 *   @purchase-order  — scope filter for this module
 */

test.describe('Purchase Order Procurement', () => {

  test('@smoke @positive TC-PO-01: Create Purchase Order with multiple item rows', async ({ PnMPage: page }) => {
    const po = new PurchaseOrderPage(page);
    const navbar = new NavbarPage(page);
    await navbar.goToPurchaseOrder();
    await po.openAddForm();

    await po.fillHeader({
      supplier: 'gateentry',
      supplierOption: 'gateentry',
      addressOption: 'kdmkfdmdks (`skmxskxms) ,scnsjcnj',
      store: 'kullu pkj',
      storeOption: 'Kullu pkj',
      subject: 'test',
      deliveryDate: '2026-04-13',
      refNumber: 'ref number',
      dispatchMode: 'by road'
    });

    await po.addRows([
      {
        type: 'Equipment',
        category: 'JCB hydraulic',
        manufacturer: 'tata',
        manufacturerOption: 'TATA STAR',
        model: '+1S -LP712/42 BSIII',
        qty: '2',
        approvedQty: '1',
        tollerance: '10',
        rate: '1000',
        discount: '10',
        gst: '8',
        total: '18',
        remarks: 'remark'
      },
      { type: 'Tools & Tackles',
        category: 'test 18 sept',
        manufacturer: 'Minakshi',
        manufacturerOption: 'Minakshi',
        model: 'jcb',
        qty: '2',
        approvedQty: '2',
        tollerance: '10',
        rate: '1000',
        discount: '10',
        gst: '8',
        total: '18',
        remarks: 'indent'
      }
    ]);

    await po.fillTCS('0');
    await po.selectFreight('FOR');
    await po.selectTerms('GSB TERMS & CONDITIONS(Adi-01)');
    await po.uploadDocument('assets/upload.png');
    await po.fillRemark('creating');
    await po.submit();
  });

});

