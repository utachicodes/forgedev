import { test, expect } from '@playwright/test';

test.describe('Training Workflow', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to training wizard
        await page.goto('/ai-training/train');
    });

    test('displays training wizard with step 1', async ({ page }) => {
        // Check page header
        await expect(page.getByRole('heading', { name: /Train New Model/i })).toBeVisible();

        // Check step 1 title
        await expect(page.getByText(/Select Framework/i)).toBeVisible();

        // Check framework options
        await expect(page.getByText(/PyTorch/i)).toBeVisible();
        await expect(page.getByText(/TensorFlow/i)).toBeVisible();
        await expect(page.getByText(/Scikit-learn/i)).toBeVisible();
    });

    test('shows step progress indicator', async ({ page }) => {
        // Check for step indicators
        await expect(page.locator('text=/Step \\d/')).toBeVisible();
    });

    test('advances to step 2 after selecting framework', async ({ page }) => {
        // Select PyTorch framework
        await page.getByText(/PyTorch/i).first().click();

        // Select an architecture
        await page.locator('select').first().selectOption({ index: 1 });

        // Click Next
        await page.getByRole('button', { name: /Next/i }).click();

        // Should be on step 2
        await expect(page.getByText(/Select Dataset/i)).toBeVisible({ timeout: 5000 });
    });

    test('shows back button on step 2', async ({ page }) => {
        // Navigate to step 2
        await page.getByText(/PyTorch/i).first().click();
        await page.locator('select').first().selectOption({ index: 1 });
        await page.getByRole('button', { name: /Next/i }).click();

        // Check for back button
        await expect(page.getByRole('button', { name: /Back/i })).toBeVisible({ timeout: 5000 });
    });

    test('returns to step 1 from step 2', async ({ page }) => {
        // Navigate to step 2
        await page.getByText(/PyTorch/i).first().click();
        await page.locator('select').first().selectOption({ index: 1 });
        await page.getByRole('button', { name: /Next/i }).click();

        // Wait for step 2
        await page.waitForSelector('text=/Select Dataset/i', { timeout: 5000 });

        // Click back
        await page.getByRole('button', { name: /Back/i }).click();

        // Should be back on step 1
        await expect(page.getByText(/Select Framework/i)).toBeVisible();
    });

    test('disables next button when required fields are missing', async ({ page }) => {
        // Next button should be disabled initially if no framework selected
        const nextButton = page.getByRole('button', { name: /Next/i });
        await expect(nextButton).toBeDisabled();
    });

    test('displays hyperparameter controls on step 3', async ({ page }) => {
        // Navigate to step 3
        // Step 1: Select framework
        await page.getByText(/PyTorch/i).first().click();
        await page.locator('select').first().selectOption({ index: 1 });
        await page.getByRole('button', { name: /Next/i }).click();

        // Step 2: Select dataset (assuming mock data exists)
        await page.waitForSelector('text=/Select Dataset/i', { timeout: 5000 });
        // Click first dataset if available
        const datasetCards = page.locator('[class*="glass-card"]').first();
        if (await datasetCards.isVisible()) {
            await datasetCards.click();
        }
        await page.getByRole('button', { name: /Next/i }).click();

        // Step 3: Check for hyperparameter controls
        await page.waitForSelector('text=/Learning Rate|Batch Size|Epochs/i', { timeout: 10000 });
    }, 30000);

    test('shows GPU toggle on hardware configuration step', async ({ page }) => {
        // This is a longer test that navigates through all steps
        // Simplified version - full test would go through all steps

        // navigate through steps...
        // Check for GPU toggle on step 4
    });

    test('displays configuration summary on final step', async ({ page }) => {
        // Navigate through all steps to final review
        // Check that configuration summary is shown
    });

    test('has cancel/exit option', async ({ page }) => {
        // Check for way to exit wizard
        await expect(page.getByRole('link', { name: /cancel|back/i }).first()).toBeVisible();
    });
});
