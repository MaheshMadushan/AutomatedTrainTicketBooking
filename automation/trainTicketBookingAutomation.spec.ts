import { test, expect } from "@playwright/test";

test("Book train ticked from galle to colombo", async ({ page }) => {
  await page.goto("https://seatreservation.railway.gov.lk/mtktwebslr/");

  // select galle
  await page
    .locator('xpath=//*[@id="regular-user"]/form/div[1]/div[1]/span')
    .click();
  await page.locator("xpath=/html/body/span/span/span[1]/input").fill("galle");
  await page.locator('xpath=//*[@id="select2-fromstation-results"]').click();

  // select colombo
  await page
    .locator('xpath=//*[@id="regular-user"]/form/div[1]/div[2]/span')
    .click();
  await page
    .locator("xpath=/html/body/span/span/span[1]/input")
    .fill("colombo fort");
  await page.locator('xpath=//*[@id="select2-tostation-results"]').click();

  // select date
  await page.locator('xpath=//*[@id="dateOne"]').fill("2025-11-10");

  // num of passengers fill
  await page.locator('xpath=//*[@id="passengers"]').fill("1");

  // purge recaptcha
  await page.evaluate(() => {
    const elementToDelete = document.querySelector("#RecaptchaField"); // Replace with your actual selector
    if (elementToDelete) {
      elementToDelete.remove();
    }
  });

  // click search trains
  await page
    .locator('xpath=//*[@id="regular-user"]/form/button[2]')
    .click()
    .then(() => {
      console.log("DONE");
    });

  // wait for navigation to complete
  await page.waitForURL("**/dashboard");

  // select train
  await page
    .locator('xpath=//*[@id="msgModal"]/div/div/div[3]/button')
    .click()
    .then(() => {
      console.log("DONE");
    });

  // popup handling
  await page
    .locator(
      "xpath=/html/body/section[3]/div/div[1]/section/div/div/div/div[2]/div/div[2]/div/table/tbody/tr[2]"
    )
    .click()
    .then(() => {
      console.log("DONE");
    });

  // press proceed button
  await page.locator('xpath=//*[@id="landingProceedBtn"]').click();

  // wait for navigation to complete
  await page.waitForURL("**/paymentsummary");

  // fill passenger details
  await page.locator('xpath=//*[@id="fname_"]').click();
  await page.locator('xpath=//*[@id="fname_"]').pressSequentially("abcd");
  await page.locator('xpath=//*[@id="lname_"]').pressSequentially("abcd");
  await page
    .locator('xpath=//*[@id="email_"]')
    .pressSequentially("abcd@gmail.com");
  await page.locator('xpath=//*[@id="nicpp_"]').pressSequentially("999999999V");
  await page
    .locator('xpath=//*[@id="mobile_"]')
    .pressSequentially("0777777777");

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
  
  // !!!!!!!!!!!!!!!WARNING: Use test cards only in testing environments!!!!!!!!!!!!!!!!!!!!!!
  await page.locator('xpath=//*[@id="cardNumber"]').fill("5555555555554444");
  await page.locator('xpath=//*[@id="expiryMonth"]').selectOption("09");
  await page.locator('xpath=//*[@id="expiryYear"]').selectOption("45");
  await page.locator('xpath=//*[@id="csc"]').fill("123");
  await page.locator('xpath=//*[@id="cardHolderName"]').fill("ABCD ABCD");
  await page.locator('xpath=//*[@id="button-row1"]/button[1]').click(); 

  expect(page.url()).toContain("seylan.gateway.mastercard.com/checkout/pay/**");

});
