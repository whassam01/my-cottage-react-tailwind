import React, { useLayoutEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Button, Row, Col } from 'antd';
import './FullPage.scss';
import { Footer } from '../common';
import { Formik } from 'formik';
import * as Scroll from 'react-scroll';

let Link      = Scroll.Link;
let Element   = Scroll.Element;
let Events    = Scroll.Events;
let scroll    = Scroll.animateScroll;
let scrollSpy = Scroll.scrollSpy;

const TermsCon = () => {
  const [index, setIndex] = useState('index');
  React.useEffect(()=> {
    console.log(index)
  },[index]);
  return (
    <div className="home-container">
      <div className="md:px-8 lg:px-6 flex flex-row">
        <Row type="flex"  className="term-container sm:pt-32 md:pt-40 lg:pt-48 xl:pt-48w-full md:rounded-2xl xl:px-32 sm:px-12">
          <Col xs={24} lg={8} md={8} className="px-4 pb-6">
            <div className="flex flex-col md:max-w-md nav-link-container">
              <p className="sub-header">Sections</p>
              <Link className={index==='test1'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test1'); }} >
                Definitions
              </Link>
              <Link className={index==='test2'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test2'); }} >
                Parties' Relationship
              </Link>
              <Link className={index==='test3'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test3'); }} >
                Marketplace Responsibilities
              </Link>
              <Link className={index==='test4'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test4'); }} >
                Refunds and Re-Orders
              </Link>
              <Link className={index==='test5'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test5'); }} >
                Order Equipment
              </Link>
              <Link className={index==='test6'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test6'); }} >
                Payment, Fees, Title and Taxes
              </Link>
              <Link className={index==='test7'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test7'); }} >
                Payment Processing
              </Link>
              <Link className={index==='test8'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test8'); }} >
                Food Producer Content and Trademark;<br/>
                Photographs of Menu Items
              </Link>
              <Link className={index==='test9'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test9'); }} >
                Confidential Information
              </Link>
              <Link className={index==='test10'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test10'); }} >
                Data Privacy and Security
              </Link>
              <Link className={index==='test11'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test11'); }} >
                Termination
              </Link>
            </div>
          </Col>
          <Col xs={24} lg={16} md={16} className="px-4">
            <div className={index==='index'?'content-show':'content-hide'}>
              <p className = "sub-header" >Terms & Conditions</p>
              <div className="term-content">
                <p className = "text-sm">Effective: July 10, 2020</p>
                <p>
                  BEFORE YOU USE THE COTTAGE PLATFORM ("PLATFORM") PLEASE READ THESE TERMS CAREFULLY. BY EXECUTING THE SIGNUP SHEET WITH COTTAGE OR USING THE PLATFORM, YOU, ANY ENTITIES THAT YOU REPRESENT AND ALL OF YOUR PARTICIPATING STORE LOCATIONS ("YOU" OR "FOOD PRODUCER") AGREE TO BE BOUND BY THESE TERMS IN ADDITION TO THE TERMS ON YOUR SIGN-UP SHEET
                </p>
                <p>
                  SECTION 17OF THIS AGREEMENT CONTAINS PROVISIONS THAT GOVERN HOW CLAIMS THAT YOU AND WE HAVE AGAINST EACH OTHER ARE RESOLVED, INCLUDING, WITHOUT LIMITATION, ANY CLAIMS THAT AROSE OR WERE ASSERTED BEFORE THE EFFECTIVE DATE OF THIS AGREEMENT. IN PARTICULAR, SECTION 17 SETS FORTH OUR ARBITRATION AGREEMENT WHICH WILL, WITH LIMITED EXCEPTIONS, REQUIRE DISPUTES BETWEEN US TO BE SUBMITTED TO BINDING AND FINAL ARBITRATION. UNLESS YOU OPT OUT OF THE ARBITRATION AGREEMENT: (1) YOU WILL ONLY BE PERMITTED TO PURSUE CLAIMS AND SEEK RELIEF AGAINST US ON ANINDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING; AND (2) YOU ARE WAIVING YOUR RIGHT TO SEEK RELIEF IN A COURT OF LAW AND TO HAVE A JURY TRIAL ON YOUR CLAIMS. THE ARBITRATION AGREEMENT COULD AFFECT YOUR RIGHT TO PARTICIPATE IN PENDING PROPOSED CLASS ACTION LITIGATION.
                </p>
                <p>
                  PLEASE SEE SECTION 17 FOR MORE INFORMATION REGARDING THIS ARBITRATION AGREEMENT, THE POSSIBLE EFFECTS OF THIS ARBITRATION AGREEMENT, AND HOW TO OPT OUT OF THE ARBITRATION AGREEMENT.
                </p>
              </div>
            </div>
            <Element className={index==='test1'?'element content-show':'content-hide'} >
              <p className = "sub-header">1. Definitions</p>
              <div className="term-content">
              <p>
              “Ordering API” means the Cottage application programming interface (API) that allows the Food Producer to exchange information with Cottage.</p>
              <p>“Cottage Data” shall mean any information that Cottage provides or makes accessible to Food Producer through the Cottage Platform, including without limitation Personal Information.</p>
              <p>"Food Consumer" means the customer who places an order for Food Producer products through the Cottage Marketplace.</p>
              <p>"Cottage Marketplace" means Cottage’s proprietary online communication platform where Food Consumers can view and search for the menus of Food Producers and/or place an order for Food Producer Products via the Cottage website or mobile application either for pickup or delivery by a Courierto the Food Consumer. This is also referred to herein as the Cottage Platform.</p>
              <p>"Marketplace Owners" means orders for Food Producer Products through the Cottage Marketplace from Cottage customers.</p>
              <p>"Food Producer" means the restaurant or other entity that has agreed to participate in the Cottage Marketplace.</p>
              <p>"Food Producer Portal" is an online website, accessible at https://dashboard.cottage.menu through which Food Producer may and regularly should review and confirm its transactions, fees and charges and account on the Platform.</p>
              <p>"Food Producer Products" includes all products offered for take-out or delivery orders at Food Producer Locations.</p>
              <p>"Food Producer Locations" means the Food Producerrestaurant locations that participate in the CottageMarketplace "Marketplace Term" means the term of the agreement between Cottage and Food Producer for the Cottage Marketplace.</p>
              <p>"Order Equipment" means and includes any equipment reasonably required by Cottage for Food Producer to receive and process Orders, including, without limitation, a tablet, fax machine, or other automated, electronic means of receiving Orders.</p>
              <p>"Personal Information" shall mean any information exchanged under this Agreement that (i) identifies or can be used to identify an individual (including without limitation, names, telephone numbers, addresses, signatures, email addresses or other unique identifiers); or (ii) that can reasonably be used to authenticate an individual (including without limitation, name, contact information, precise location information, access credentials, persistent identifiers and any informationthat may be considered ‘personal data’ or ‘personal information’ under applicable law).</p>
              <p>"Promotion Fee" means the fees collected by Cottage as a commission in exchange for promoting and featuring the Food Producer and Food Producer Location(s) on the Cottage Platform, which is charged as a percentage of revenues transacted on the Cottage Platform.</p>
              <p>"Food Schedules" means the feature to define menu items that are available on a given day if a Food Consumer places an order by a particular deadline "Courier" means independent third-party delivery contractor.</p>
              </div>
            </Element>

            <Element className={index==='test2'?'element content-show':'content-hide'} >
              <p className="sub-header">2. The Parties' Relationship:</p>
              <div className="term-content">
              <p>
              Cottage provides an online marketplace platform using web-based technology ("Platform") that connects Food Producers and Food Consumers, as described in these Terms for Cottage Marketplace. Cottage is not a merchant or delivery service; it is an online connection platform. Food Producer and Cottage agree they are independent businesses whose relationship is governed by the Sign-Up Sheet and these Terms. Nothing in the Parties' agreements, relationship or transactions shall create or be construed as creating an agency, partnership, fiduciary or joint venture relationship between Cottage and Food Producer (or Food Producer's employees, representatives or locations), Cottage and Courier, or Cottage and customers. Except as expressly set forth in the Sign-Up Sheet and these Terms, each Party shall be responsible for its own expenses, profits and losses.
              </p>
              </div>
            </Element>

            <Element className={index==="test3"?"element content-show":"content-hide"}>
              <p className="sub-header">3. Marketplace Responsibilities: </p>
              <div className="term-content">
              <p>For Food Producers that have agreed to participate in the Cottage Marketplace, Cottage and Food Producer shall have the following responsibilities during the Marketplace Term:</p>
              <p>a) Cottage Responsibilities. Cottage will, in a timely manner</p>
              <p>i. Display Food Producer’s logo; a listing of the Food Producer Locations; and a menu of Food Producer Products on the Cottage Platform</p>
              <p>ii. Accept Marketplace Orders from Food Consumers;</p>
              <p>iii. Forward each Marketplace Order to the relevant Food Producer Location; and</p>
              <p>iv. Pay the Food Producer in accord with the Parties' agreements, deducting applicable Promotion Fees, marketing fees, subscription fees, and other fees as maybe required.</p>

              <p>b) Food Producer Responsibilities. Food Producer will, in a timely manner:</p>

              <p>i. Provide Cottage with the Food Producer’s in-store or take-out menu, including the price of each item on such menu;</p>

              <p>ii. Monitor Food Producer’s menu and store information on the Cottage Marketplace, promptly make updates via the Food Producer portal to reflect the most up-to-date products, pricing and other information or immediately notify Cottage of any errors or changes in writing;

              iii. Accept all Marketplace Orders placed by Cottage from Food Producer’s then-current menu;

              iv. Confirm all Marketplace Orders from Cottage;

              v. Prepare the Food Producer Products for each Marketplace Order for pickup by a Courier at the designated time;

              vi. Process Marketplace Orders in the order in which they are received;

              vii. Update Cottage with any changes to the pricing, availability, description, or other characteristics of the Food Producer Products;

              viii. Notify Cottage of its days and hours of operation, and remain open for business on Cottage the samedays and hours of operation as Food Producer’s in-store business; notify Cottage of any changes to Food Producer’s hours of operations on holidays; and notify Cottage if Food Producer closes earlier than Food Producer’s standard hours of operation or plans to close earlier than Food Producer’s standard hours of operation;

              ix. Notify all Food Producer store staff members of the relationship with Cottage immediately upon execution of this Agreement; and

              x. Provide the same utensils, napkins, bags and other materials that Food Producer would typically provide in a standard take-out or delivery order.

              xi. On an ongoing basis, review and confirm the transactions, fees and charges on orders via the Food Producer Portal, and promptly communicate to Cottage any inaccuracies.
              </p>
              </div>
            </Element>

            <Element className={index==="test4"?"element content-show":"content-hide"}>
              <p className="sub-header">4. Refunds and Re-Orders: Refunds and re-orders will be addressed as follows:</p>
              <div className="term-content">
              <p>
              In the event that Cottage, in its sole reasonable discretion, has to issue a refund, creditor re-order on a Food Consumer’s Order, Food Producer will prepare the food to the same specifications as the original Order (in the case of a re-order) and bear the full cost of that refund, credit or re-order, as applicable, unless the refund, credit or re-order is due to the fault of Cottage. Cottage shall be responsible for customer support issues relating to the ordering of Food Producer Products and issues relating to a Food Consumer’s Cottage account. All other customer issues or complaints will be Food Producer’s sole responsibility.
              </p>
              </div>
            </Element>

            <Element className={index==="test5"?"element content-show":"content-hide"}>
              <p className="sub-header">5. Order Equipment:</p>
              <div className="term-content">
              <p>
              With respect to the CottageMarketplace, Food Producer will install any equipment reasonably required by Cottagefor Food Producer to receive and process Orders (including, without limitation, a tablet, fax machine, or other automated, electronic means of receiving Orders) (“Order Equipment”).
              </p>
              </div>
            </Element>

            <Element className={index==="test6"?"element content-show":"content-hide"}>
              <p className="sub-header">6. Payment, Fees, Title and Taxes. Payment, fees, and taxes shall be addressed as follows:</p>
              <div className="term-content">
              <p>
              a) Cottage Marketplace: Cottagewill pay Food Producer for Marketplace Orders fulfilled by Food Producer each week on a consistent day of the week, subject to change with no less than 10 days notice to Food Producers by email or service notification. Cottage shall be entitled to deduct from such payments Promotion Fees, service fees, marketing fees, subscription fees, and other fees as required. Food Producer agrees Cottage may charge the customer fees, including but not limited to a Delivery Fee, Service Fee, Surcharge Fee, and Small Order Feewhere applicable, as well as an additional markup for Food Producer Products, in Cottage's sole discretion. Food Producer shall be responsible for all taxes, duties, and other governmental charges on the sale of Food Producer Products and for remitting suchtaxes, duties, and other governmental charges to the appropriate authorities. In the event that Food Producer raises the pricefor a menu item, Cottage shall not be required to remit the higher price to the Food Producer until 3 business days after the Food Producer first provides notice to Cottage of such pricing change.</p>

              <p>b) Communication: Food Producer agrees, on an ongoing basis, to review and confirm its transactions, fees and charges on orders and invoices and via the Food Producer Portal, and to promptly communicate to Cottage in writing any claimed inaccuracies, so that Cottage has the prompt opportunity to address and resolve any issues and so such issues do not persist, which Cottage and Food Producer agree is in the best interests of both parties and their commercial relationship. Food Producer agrees to communicate to Cottage any disagreement, non-conformity or any issue with any transaction, fee, charge or order within 60 days of the transaction, fee or order. Food Producer shall be deemed to have acquiesced in and ratified, and to have waived any claim or objection regarding, each transaction, fee, charge and order if Food Producer does not communicate awritten claim or objection to Cottage regarding such transaction, fee, charge or order within such 60-day period.</p>

              <p>c) Title: Food Producer agrees that Food Producer holds title to the goods or products that Food Producer provides through the Platform until the goods are picked up from Food Producer, and that title passes from the Food Producer to the customer upon pickup at the Food Producer’s location. Food Producer agrees that neither the Courier nor Cottage holds title toor acquires any ownership interest in any goods or products that Food Producer prepares or provides through the Platform.</p>
              >
              </div>
            </Element>

            <Element className={index==="test7"?"element content-show":"content-hide"}>
              <p className="sub-header">7. Payment Processing</p>
              <div className="term-content">
              <p>
              Payment processing services for Food Producers on the Cottage Marketplace are provided by Stripe and are subject to the Stripe Connected Account Agreement, which includes the Stripe Services Agreement. By agreeing to these Terms, Food Producer agrees to be bound by the Stripe Connected Account Agreement and the Stripe Services Agreement, as the same may be modified by Stripe from time to time. As a condition of Cottage enabling payment processing services through Stripe, Food Producer agrees to provide Cottage accurate and complete information about Food Producer’s representative and its business, and Food Producer authorizes Cottage to share it and transaction information related to Food Producer’s use of the payment processing services provided by Stripe. Stripe has been auditedby a PCI-certified auditor and is certified to PCI Service Provider Level 1.
              </p>
              </div>
            </Element>
            <Element className={index==="test8"?"element content-show":"content-hide"}>
              <p className = "sub-header">8. Food ProducerContent and Trademark; Photographs of Menu Items.</p>
              <div className="term-content">
              <p>
                a) Food Producer grants to Cottage a royalty-free, non-exclusive, limited, revocable, non-transferable, non-sublicense-able right and license to use and display the Food Producer Content in the provision of providing services to Food Producer. As used herein, “Food Producer Content” includes, without limitation, menus, photographs (either provided by Food Produceror on Food Producer’s website), trademarks, logos and other materials provided by Food Producer to Cottage.
              </p>
              <p>
                b) If photographs of Food Producer’s menu items are not available or if they do not meet Cottage’s requirements, as reasonably determined by Cottage, then Food Producer consents to Cottage engaging a professional photographer to take photographs of Food Producer’s menu items and display such photographs on the Cottage Marketplace as representations of Food Producer’s menu items; provided that Food Producer may contact Cottage support to have such photographs removed from the Food Producer’s store listing and, in such event, Cottage will comply in a timely manner.
              </p>
              </div>
            </Element>
            <Element className={index==="test9"?"element content-show":"content-hide"}>
              <p className="sub-header">9. Confidential Information</p>
              <div className="term-content">
              <p>
              a) The term “Confidential Information” shall mean any confidential or proprietary business, technical or financial informationor materials of a party (“Disclosing Party”) provided to the other party (“Receiving Party”) in connection with thisAgreement, whether orally or in physical form, and shall include the terms of this Agreement. Without limiting theforegoing, Cottage Data is the Confidential Information of Cottage.</p>

              <p>b) Confidential Information does not include information that: (i) was rightfully known to the Receiving Party withoutrestriction on use or disclosure prior to such information's being disclosed to the Receiving Party in connection with thisAgreement; (ii) was or becomes public domain other than by the fault of the Receiving Party; (iii) was or is received by the Receiving Party on a non-confidential basis from a third party that, to the Receiving Party's knowledge, was not at the time under any obligation to maintain its confidentiality; or (iv) the Receiving Party can demonstrate by documentary recordswas independently developed by the Receiving Party without access to, use of or reference to any Confidential Information.</p>

              <p>c) The Receiving Party shall:(i) not access or use Confidential Information other than as necessary to exercise its rights or perform its obligations in accordance with this Agreement; (ii) except subject to its compliance with Section 11(d), not disclose or permit access to Confidential Information other than to its or any of its employees, officers, directors, consultants, agents, independent contractors, service providers, subcontractors and legal advisors (“Representatives”) who need to know such Confidential Information for purposes of the Receiving Party's exercise of its rights or performance of its obligations under and in accordance with this Agreement, and prior to any such disclosure are boundby written confidentiality and restricted use obligations at least as protective of the Confidential Information as the terms set forth in this Section; and (iii) safeguard the Confidential Information from unauthorized use, access or        disclosure using at least the degree of care it uses to protect its most/similarly sensitive information and in no event less than a reasonable degree of care.</p>

              <p>d) If the Receiving Party is compelled by applicable Law to disclose any Confidential Information then, to the extentpermitted by applicable Law, the Receiving Party shall promptly notify the Disclosing Party in writing of such requirementso that the Disclosing Party can seek a protective order or other remedy or waive its rights under Section 9(c) and providereasonable assistance to the Disclosing Party, at the Disclosing Party's sole expense, in opposing or seeking protective limitations on disclosure.</p>
              </div>
            </Element>
            <Element className={index==="test10"?"element content-show":"content-hide"}>
              <p className="sub-header">10. Data Privacy and Security</p>
              <div className="term-content">
              <p>
              Food Producer agrees not to access, collect, store, retain, transfer, use or otherwise process in any manner Cottage Data, including without limitation Personal Information, except as required to perform under this Agreement. Food Producer shall keep Cottage Data secure from unauthorized access and maintain the accuracy and integrity of Cottage Data in Food Producer’s custody or control by using appropriate organizational, physical and technical safeguards. If Food Producer becomes aware of any unauthorized access to Cottage Data, Food Producer will immediately notify Cottage, consult and cooperate with investigations and potentially required notices, and provide any information reasonably requested byCottage. Food Producer agrees to implement and use security procedures, protocols or access credentials as reasonably requested by Cottage and will be responsible for damages resulting from Food Producer’s failure to comply. Food Producer will not allow any third party to use the Cottage Platform; copy, modify, rent, lease, sell, distribute, reverse engineer or otherwise attempt to gain access to the source code of the Cottage Platform; damage, destroy or impede the services provided through the Cottage Platform; transmit injurious code; or bypass or breach any security protection on the Cottage Platform.
              </p>
              </div>
            </Element>
            <Element className={index==="test11"? "element content-show":"content-hide"}>
              <p className="sub-header">11. Termination</p>
              <div className="term-content">
              <p>
              Food Producer may terminate this Agreement for any reason at any time upon 7 days prior written notice. Cottage may terminate this Agreement or any promotion under this Agreement for any reason at any time upon written notice. Email shall suffice for written notice. Neither Food Producer nor Cottage will be required to pay any fee in connection with a termination by either party, or be liable to the otheras a result of termination of this Agreement for any damages, for the loss of goodwill, prospective profits or anticipated income, or for any expenditures, investments, leases or commitments made by either Food Produceror Cottage.
              </p>
              </div>
            </Element>
          </Col>
        </Row>

      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default TermsCon;
