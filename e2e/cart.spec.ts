import { test, expect } from "@playwright/test";
import { exit } from "node:process";

const baseUrl = "http://localhost:8081";

test("Verifica se o primeiro produto da home pode ser adicionado ao carrinho corretamente", async ({ page }) => {
    await page.goto(baseUrl);
    const headerText = page.getByText("Workshop Store");
    await expect(headerText).toBeVisible();

    const firstProductCard = page.locator("[data-testid^='product-card-']").first();
    await expect(firstProductCard).toBeVisible();

    const firstProductId = (await firstProductCard.getAttribute("data-testid"))?.replace("product-card-", "");
    expect(firstProductId).toBeDefined();

    const firstProductTitle = await firstProductCard.textContent();
    expect(firstProductTitle).toBeTruthy();
    if (!firstProductTitle) { exit(0); }

    const firstProductButton = firstProductCard.getByTestId(`add-to-cart-${firstProductId}`);
    await expect(firstProductButton).toBeVisible();

    await firstProductButton.click();
    
    const cartTab = await page.getByRole("tab", {name: "Cart"});
    await cartTab.click();

   
    await expect(page.getByText("Your cart")).toBeVisible();
    await expect(page.getByTestId(`cart-item-container-${firstProductId}`)).toBeVisible();
    // await expect(page.getByTestId(`cart-item-title-${firstProductId}`)).toHaveText(firstProductTitle);
})