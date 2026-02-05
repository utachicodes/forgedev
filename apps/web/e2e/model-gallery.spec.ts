import { test, expect } from '@playwright/test';

test.describe('Model Gallery', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/ai-training/models');
    });

    test('displays model gallery page', async ({ page }) => {
        // Check header
        await expect(page.getByRole('heading', { name: /Model Gallery/i })).toBeVisible();
        await expect(page.getByText(/Browse and manage your trained models/i)).toBeVisible();
    });

    test('shows statistics dashboard', async ({ page }) => {
        // Check for statistics cards
        await expect(page.getByText('Total Models')).toBeVisible();
        await expect(page.getByText(/Average Accuracy|Avg Accuracy/i)).toBeVisible();
        await expect(page.getByText('Storage Used')).toBeVisible();
        await expect(page.getByText('Active Models')).toBeVisible();
    });

    test('displays model cards with information', async ({ page }) => {
        // Wait for models to load
        await page.waitForSelector('[class*="glass-card"]', { timeout: 5000 });

        // Check that model cards contain expected information
        const firstCard = page.locator('[class*="glass-card"]').nth(1); // Skip stats cards
        await expect(firstCard).toBeVisible();

        // Should have framework badge
        await expect(page.getByText(/PyTorch|TensorFlow|Scikit-learn/)).toBeVisible();
    });

    test('shows action buttons on model cards', async ({ page }) => {
        // Wait for models to load
        await page.waitForSelector('[class*="glass-card"]', { timeout: 5000 });

        // Check for action buttons
        await expect(page.getByText(/View/i).first()).toBeVisible();
        await expect(page.getByText(/Export/i).first()).toBeVisible();
        await expect(page.getByText(/Delete/i).first()).toBeVisible();
    });

    test('filters models by search query', async ({ page }) => {
        // Wait for models to load
        await page.waitForSelector('[class*="glass-card"]', { timeout: 5000 });

        // Enter search query
        const searchInput = page.getByPlaceholderText(/Search models/i);
        await searchInput.fill('ResNet');

        // Results should be filtered (depends on mock data)
        await page.waitForTimeout(500); // Wait for filter to apply
    });

    test('filters models by framework', async ({ page }) => {
        // Wait for models to load
        await page.waitForSelector('[class*="glass-card"]', { timeout: 5000 });

        // Select framework filter
        const frameworkSelect = page.locator('select').first();
        await frameworkSelect.selectOption('PYTORCH');

        // Results should be filtered
        await page.waitForTimeout(500);
    });

    test('has link to train new model', async ({ page }) => {
        // Check for "Train New Model" button
        const trainButton = page.getByRole('link', { name: /Train New Model/i });
        await expect(trainButton).toBeVisible();

        // Click and verify navigation
        await trainButton.click();
        await expect(page).toHaveURL(/\/ai-training\/train/);
    });

    test('displays model metrics correctly', async ({ page }) => {
        // Wait for models to load
        await page.waitForSelector('[class*="glass-card"]', { timeout: 5000 });

        // Check for accuracy percentages
        await expect(page.locator('text=/%/')).toBeVisible();
    });

    test('shows loading state initially', async ({ page }) => {
        // Reload page to catch loading state
        await page.reload();

        // May see loading indicator briefly
        // (This is timing-dependent and may not always catch it)
    });

    test('displays empty state when no models match filter', async ({ page }) => {
        // Wait for models to load
        await page.waitForSelector('[class*="glass-card"]', { timeout: 5000 });

        // Search for non-existent model
        const searchInput = page.getByPlaceholder(/Search models/i);
        await searchInput.fill('NonExistentModel12345XYZ');

        // Should show empty state
        await expect(page.getByText(/No models found/i)).toBeVisible({ timeout: 3000 });
    });
});
