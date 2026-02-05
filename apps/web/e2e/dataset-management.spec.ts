import { test, expect } from '@playwright/test';

test.describe('Dataset Management Workflow', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to datasets page before each test
        await page.goto('/ai-training/datasets');
    });

    test('displays datasets page with statistics', async ({ page }) => {
        // Check page header
        await expect(page.getByRole('heading', { name: /Dataset Management/i })).toBeVisible();

        // Check statistics cards
        await expect(page.getByText('Total Datasets')).toBeVisible();
        await expect(page.getByText('Total Samples')).toBeVisible();
        await expect(page.getByText('Storage Used')).toBeVisible();
    });

    test('navigates to upload page', async ({ page }) => {
        // Click upload button
        await page.getByRole('link', { name: /Upload Dataset/i }).click();

        // Should navigate to upload page
        await expect(page).toHaveURL(/\/ai-training\/datasets\/upload/);
        await expect(page.getByRole('heading', { name: /Upload Dataset/i })).toBeVisible();
    });

    test('shows upload interface with drag-and-drop area', async ({ page }) => {
        await page.goto('/ai-training/datasets/upload');

        // Check for upload area
        await expect(page.getByText(/Drag & drop files here/i)).toBeVisible();
        await expect(page.getByText(/Supports images, CSV, JSON/i)).toBeVisible();
    });

    test('displays dataset name input', async ({ page }) => {
        await page.goto('/ai-training/datasets/upload');

        // Check for dataset name input
        const nameInput = page.getByPlaceholder(/e.g., ImageNet, COCO/i);
        await expect(nameInput).toBeVisible();
        await expect(nameInput).toBeEditable();
    });

    test('shows dataset type selector', async ({ page }) => {
        await page.goto('/ai-training/datasets/upload');

        // Check for type selector
        const typeSelect = page.locator('select').first();
        await expect(typeSelect).toBeVisible();

        // Verify options are present
        const options = await typeSelect.locator('option').allTextContents();
        expect(options).toContain('IMAGE');
        expect(options).toContain('TEXT');
        expect(options).toContain('TABULAR');
        expect(options).toContain('VIDEO');
    });

    test('searches datasets', async ({ page }) => {
        // Wait for datasets to load
        await page.waitForSelector('[class*="glass-card"]', { timeout: 5000 });

        // Type in search
        const searchInput = page.getByPlaceholder(/Search datasets/i);
        await searchInput.fill('CIFAR');

        // Results should be filtered
        // (Actual verification depends on mock data)
    });

    test('filters datasets by type', async ({ page }) => {
        // Wait for datasets to load
        await page.waitForSelector('[class*="glass-card"]', { timeout: 5000 });

        // Select filter
        const filterSelect = page.locator('select').first();
        await filterSelect.selectOption('IMAGE');

        // Results should be filtered
        // (Actual verification depends on mock data)
    });

    test('has back navigation on upload page', async ({ page }) => {
        await page.goto('/ai-training/datasets/upload');

        // Check for back link
        const backLink = page.getByRole('link', { name: /Back to Datasets/i });
        await expect(backLink).toBeVisible();

        // Click and verify navigation
        await backLink.click();
        await expect(page).toHaveURL(/\/ai-training\/datasets$/);
    });
});
