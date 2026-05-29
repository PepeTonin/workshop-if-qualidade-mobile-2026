import { test, expect, Page } from "@playwright/test";

const baseUrl = "http://localhost:8081";

async function searchAndAddProductToCard(page: Page, searchQuery: string) {
    await page.getByRole("tab", { name: "Home" }).click();
    await page.getByPlaceholder("Search by title, brand or category").fill(searchQuery);

    const productCard = page.locator("[data-testid^='product-card-']").filter({
        hasText: new RegExp(searchQuery)
    });
    await expect(productCard).toBeVisible();

    const productId = (await productCard.getAttribute("data-testid"))?.replace("product-card-", "");
    expect(productId).toBeDefined();

    const productButton = productCard.getByTestId(`add-to-cart-${productId}`);
    await expect(productButton).toBeVisible();
    await productButton.click();
}

test("Verifica fluxo completo de compra da criação até o checkout", async ({ page }) => {
    const COUPON_CODE = "workshopifsummit";
    const PRODUCTS_TO_TEST = [
        "iPhone X",
        "Eyeshadow Palette with Mirror",
        "Dolce Shine Eau de",
        "iPhone 6"
    ];

    await page.goto(baseUrl);
    const headerText = page.getByText("Workshop Store");
    await expect(headerText).toBeVisible();

    await page.getByRole("tab", { name: "Profile" }).click();
    await page.getByTestId("signup-button").click();
    await page.getByPlaceholder("Ada Lovelace").fill("Ada Lovelace");
    await page.getByPlaceholder("name@example.com").fill("ada.lovelace@gmail.com");
    await page.getByPlaceholder("Choose a password").fill("aprimeiraprogramadora!");
    await page.getByTestId("signup-submit-button").click();

    await expect(page.getByTestId("logout-button"));

    for (let product of PRODUCTS_TO_TEST) {
        await searchAndAddProductToCard(page, product)
    }

    await page.getByRole("tab", { name: "Cart" }).click();

    await page.getByTestId("coupon-code-input").fill(COUPON_CODE);
    await page.getByTestId("apply-coupon-button").click();
    await expect(page.getByTestId("coupon-applied-feedback")).toBeVisible();
    await page.getByTestId("finish-purchase-button").click();
    await expect(page).toHaveURL(/checkout-success/);
    await expect(page.getByTestId("checkout-success-card")).toBeVisible();


    // await expect(page.locator("[data-testid^='cart-item-container-']")).toBeVisible();


    

    

    

    // const firstProductTitle = await firstProductCard.textContent();
    // expect(firstProductTitle).toBeTruthy();
    // if (!firstProductTitle) { exit(0); }

    

    // await firstProductButton.click();

    


    // await expect(page.getByText("Your cart")).toBeVisible();
    // await expect(page.getByTestId(`cart-item-container-${firstProductId}`)).toBeVisible();
    // await expect(page.getByTestId(`cart-item-title-${firstProductId}`)).toHaveText(firstProductTitle);
})