import { DETECT_PHASES } from "~@/__fixtures__/tasks.ai.fixture";
jest.mock("~@/core/modules/hasura.module");
import { aiTasks } from "~@/core/modules/freelancer/ai";
// import { detectLang } from "~@/core/modules/translate.module";
describe("AI features", () => {
  it("should detect task list need to be resolved", async () => {
    const list = await aiTasks(
      "Hi. My partner has a website and the hosting company states she has malware. This is a new site, and not live yet - we require the malware removing - we have the malware.txt file with locations in cpanel. \n\nPlease only bid if you are 100% confident you are able to remove and make secure again. And have good feedback with good repeat hire. \n\nThanks in advance...",
      DETECT_PHASES as any
    );
    expect(
      list.includes(
        `this is a new site, and not live yet - you require the malware removing - you have the malware.txt file with locations in cpanel`
      )
    );
  });
  it("should detect task list need to be resolved: can return multiple tasks", async () => {
    const list = await aiTasks(
      "Hello!\n\nI need a theme change on a new Wordpress site from Themesphere to Generate press. The site has minimal posts. Want someone who can start and complete the changes within a short time. \n\nThank you....",
      DETECT_PHASES as any
    );

    expect(list).toEqual([
      "you need a theme change on a new wordpress site from themesphere to generate press",
      "want someone who can start and complete the changes within a short time"
    ]);
  });

  it("should detect task list need to be resolved: can handle long desc", async () => {
    const list = await aiTasks(
      "We want to create a website that sells products for babies. We want to be able to create baby registries & birthday gifts lists. Those registries have to include the regular features of an online baby registry but with the additional smart system of https://www.babylist.com/  The idea is that by installing the button in the browser the client is able to import ANY product  into the registry\n\nAbout the import Button\nThe button must be friendly with all the browsers and can input price and some free text like colors or sizes.\nWhen someone wants to buy this item from an external website, the reditect link needs to use our affiliate  service so we can get the commission from amazon, Awin, RakutenMarketing, afiliado.com, tradetracker.com, etc...\nWe want the availability tocreate our OWN Afilliate/Referal program for local shops that we would contact manually and get the commission afterwards.\nCreate a userfriendly installation of the button and instruction page like this: https://www.babylist.com/add-items and with an arrow pointing the bookmarks\nA section where we feature all the stores where we will work with\nWe would like to focus on our own store like www.smallable.com BUT Like Babylist we will like to add the registry functionality with availability to import ANY website. The addition of the button has to be a nice design with arrows etc like the babylist website\nUpdate registry if the item has been bought or not, and ask if been bought\nfriendly link creation for own registry (your registry url)\nthank you note tracker\nUser is able to make it personal with backgrounds, photos, a welcome message, and more.\n\nAdditional Features:\nInclude price comparison of the products from different sources\ninclude cash voucheurs\nMultilingual Website frontoffice in SPANISH and ENGLISH. Available to add more languages in the future. \n10% Registry Discount. Once the family decides to close the registry they will get 10% discount from the products bought via our website. Automatic Cupon code based on rules\nSimilar like this feature: https://help.babylist.com/hc/en-us/articles/115006102688-When-is-my-Babylist-discount-available-\n\nSubscription Feature\nDiaper / Wipes / Changing PAD Subscription like LillyDoo. Check the lillydoo website and beeing able to create diapers subscriptions\nhttps://www.lillydoo.com/es/suscripcion-de-panales/configurador\nIt’s a subscription where the diaper and box can be selected within different parameters:\nDiaper type\nSize\nDesign\nIt can be added into the montly subscription: Wipes Package, Skin products, Chaning pad etc.\nSelect the frequency and the first delivery date\nThey can login and change the next subscription box if has not been sent already\n\n\nWebsite Features:\nFree Guides & Tutorials section\nPaid Video Courses section\nZendesk Live Chat\nHelp Center Section & FAQ\nSendgrid or similar for email trigger, mailchimp\nemails to baby register owners & their parents, differenciate the owner of the registry and the people that makes the gift – Trigger emails\nCash Funds and gifts\nDashbuttons\nWhatsapp Business Support\nUPS & Label Creation & Shippement Calculator\nNACEX Label Creation https://www.nacex.es/irServicioIntegraciones.do\nPacklink Shippement integration   https://pro.packlink.es/integraciones/magento/\nAmazon integration to sell our products to Amazon\nEbay Integration sell our products to Amazon\nCountdown for next day delivery\nUsers should be able to login using their google or Facebook account\nResponsible and adaptative website suitable for all smartphones, tablets and computer.\n\nDESIGN \nMenus & Submenus & Right Filtering Menus and categories like Smallable.com :\nBrands:\nBaby Fashion\nDiapers\nToys\nInspiration\nHome\n\nFooter:\npayment\nfor Spanish based customers: Redsys Payment gataway Integration\nHTPPS system\nFor outside Spain system; \nPCI compliance\ncookies and privacy data compliance\n\nCustomisation of documents\nInvoices\nDelivery Notes\nReturns\n...",
      DETECT_PHASES as any
    );
    expect(list).toEqual([
      "you want to create a website that sells products for babies",
      "you want to be able to create baby registries & birthday gifts lists",
      "you want the availability tocreate your own afilliate/referal program for local shops that you would contact manually and get the commission afterwards"
    ]);
  });

  it("should detect task list need to be resolved: can handle small desc", async () => {
    const list = await aiTasks(
      "I need to integrate paypal in my web app(node,express,mongo,bootstrap)...",
      DETECT_PHASES as any
    );
    expect(list).toEqual([
      "you need to integrate paypal in your web app(node,express,mongo,bootstrap)"
    ]);
  });

  it("should detect task list need to be resolved: remove .... in the end", async () => {
    const list = await aiTasks(
      "Looking for an RTL arabic website developer that can design a website using wordpress, and integrate it with a mobile app....",
      DETECT_PHASES as any
    );
    expect(list).toEqual([
      "looking for an rtl arabic website developer that can design a website using wordpress, and integrate it with a mobile app"
    ]);
  });

  it("should detect task list need to be resolved: add would like", async () => {
    const list = await aiTasks(
      "Hello! \nI have launched a company in Feb 2018. A website has been done by a web designer and a developer on Wordpress. Divi theme has been used but everything has been built manually (i mean it is not a standard theme). The website was only a showcase to show what my company was offering. \nToday I need to create a shop. I thought about opening it with WooCommerce or Prestashop. I'd like to have a proper standard theme which is easy for me to use. This is a very important point for me as I struggle to use my main website today as it is look far too complicated for me....",
      DETECT_PHASES as any
    );
    expect(list).toEqual([
      "you need to create a shop",
      "You would like to have a proper standard theme which is easy for you to use"
    ]);
  });

  it("should detect task list need to be resolved: add would like", async () => {
    const list = await aiTasks(
      "I want some one to write a thesis document with a template that I provide for the following project:\nCreating highly scalable ecommerce website using woocommerce on wordpress and AWS\nImportant: \n1- the document to be submitted on saturday 4th Jan 10am GMT+3\n2- original work as Plagiarism test will happen...",
      DETECT_PHASES as any
    );
    expect(list).toEqual([
      "you want some one to write a thesis document with a template that you provide for the following project:creating highly scalable ecommerce website using woocommerce on wordpress and awsimportant: 1- the document to be submitted on saturday 4th jan 10am gmt+32- original work as plagiarism test will happen"
    ]);
  });

  it("should detect task list need to be resolved: add would like", async () => {
    const list = await aiTasks(
      "Looking for someone based in the U.S, who is an expert in all facets of Wordpress and is knowledgeable of WP Engine to maintain, update and correct any issues that may arise on the website.\r\n\r\nMust be security minded.\r\n\r\nMust be fluent in the Learndash, MemberPress, Woocommerce, Stripe and other plugins.\r\n\r\nKnows necessary coding : Php, Html, Css, Javascript\r\nAnimation a plus.\r\n\r\nSketch vector graphic knowledge a plus!...",
      DETECT_PHASES as any
    );
    expect(list).toEqual([
      "looking for someone based in the u.s, who is an expert in all facets of wordpress and is knowledgeable of wp engine to maintain, update and correct any issues that may arise on the website"
    ]);
  });
  // it("able to connect and detect language", async () => {
  //     let theError = null;
  //     let result = null;
  //     try {
  //         const res = await detectLang(
  //             `looking for someone based in the u.s, who is an expert in all facets of wordpress`
  //         );
  //         result = res;
  //     } catch (res) {
  //         theError = res;
  //     }
  //     expect(theError).toBeNull();

  //     expect(result === null).toBeFalsy();
  //     expect(result).toEqual("en");
  // });
});
