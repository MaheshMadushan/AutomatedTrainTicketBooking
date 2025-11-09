import { test, expect } from "@playwright/test";

test("Book train ticked from galle to colombo", async ({ page }) => {
  await page.goto("https://seatreservation.railway.gov.lk/mtktwebslr/");

  // select galle
  await page
    .locator('xpath=//*[@id="regular-user"]/form/div[1]/div[1]/span')
    .click();
  await page.locator("xpath=/html/body/span/span/span[1]/input").fill("galle"); // (from which station) CHANGE as user intened 
  await page.locator('xpath=//*[@id="select2-fromstation-results"]').click();

  // select colombo
  await page
    .locator('xpath=//*[@id="regular-user"]/form/div[1]/div[2]/span')
    .click();
  await page
    .locator("xpath=/html/body/span/span/span[1]/input")
    .fill("colombo fort"); // (to which station) CHANGE as user intened 
  await page.locator('xpath=//*[@id="select2-tostation-results"]').click();

  // select date
  await page.locator('xpath=//*[@id="dateOne"]').fill("2025-11-10"); // (when?) CHANGE as user intened 

  // num of passengers fill
  await page.locator('xpath=//*[@id="passengers"]').fill("1"); // for now only support single passenger

  // purge recaptcha
  await page.evaluate(() => {
    const elementToDelete = document.querySelector("#RecaptchaField");
    if (elementToDelete) {
      elementToDelete.remove();
    }
  });

  // click search trains
  await page
    .locator('xpath=//*[@id="regular-user"]/form/button[2]')
    .click()

  // wait for navigation to complete
  await page.waitForURL("**/dashboard");

  // select train
  await page
    .locator('xpath=//*[@id="msgModal"]/div/div/div[3]/button')
    .click()

  // popup handling
  await page
    .locator(
      "xpath=/html/body/section[3]/div/div[1]/section/div/div/div/div[2]/div/div[2]/div/table/tbody/tr[2]"
    )
    .click()

  // press proceed button
  await page.locator('xpath=//*[@id="landingProceedBtn"]').click();

  // wait for navigation to complete
  await page.waitForURL("**/paymentsummary");

  // fill passenger details
  await page.locator('xpath=//*[@id="fname_"]').click();
  await page.locator('xpath=//*[@id="fname_"]').pressSequentially("abcd"); // (first name) CHANGE as user intened 
  await page.locator('xpath=//*[@id="lname_"]').pressSequentially("abcd"); // (last name) CHANGE as user intened 
  await page
    .locator('xpath=//*[@id="email_"]')
    .pressSequentially("abcd@gmail.com"); // (email) CHANGE as user intened 
  await page.locator('xpath=//*[@id="nicpp_"]').pressSequentially("999999999V"); // (nic) CHANGE as user intened 
  await page
    .locator('xpath=//*[@id="mobile_"]')
    .pressSequentially("0777777777"); // (mobile num) CHANGE as user intened 

  // select seats
  //*[@id="onewayseatclass"]/div/div/div[2]/div[1]
  await page.locator('xpath=//*[@id="onewayseatclass"]/div/div/div[2]/div[1]').click();
  
  // t & C
  await page.locator('xpath=//*[@id="termsAndCon"]').click();

  // proceed to payment
  await page.locator('xpath=//*[@id="exampleModalScrollable"]/div/div/div[3]/button[1]').click();
  await page.locator('xpath=//*[@id="inlineRadioService1"]').click();
  await page.locator('xpath=//*[@id="submitPageBtn"]').click();

  // wait for navigation to complete reservation
  await page.waitForURL("**/reservation");
  await page.waitForURL("https://seylan.gateway.mastercard.com/checkout/pay/**");

  console.log(page.url())
  expect(page.url()).toContain("https://seylan.gateway.mastercard.com/checkout/pay/");
  
  // !!!!!!!!!!!!!!!WARNING: Use test cards only in testing environments!!!!!!!!!!!!!!!!!!!!!!
  await page.locator('xpath=//*[@id="cardNumber"]').fill("5555555555554444"); // (card num) CHANGE as user intened 
  await page.locator('xpath=//*[@id="expiryMonth"]').selectOption("09"); // (expiry month) CHANGE as user intened 
  await page.locator('xpath=//*[@id="expiryYear"]').selectOption("45");// (expiry date) CHANGE as user intened 
  await page.locator('xpath=//*[@id="csc"]').fill("123");  // (card cvv) CHANGE as user intened 
  await page.locator('xpath=//*[@id="cardHolderName"]').fill("ABCD ABCD"); // (name) CHANGE as user intened 
  
  await page.locator('xpath=//*[@id="button-row1"]/button[1]').click(); 

  

});
