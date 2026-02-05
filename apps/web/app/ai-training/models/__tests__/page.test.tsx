import { render, screen, waitFor } from '@testing-library/react';
import ModelsPage from '../page';

// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('Models Gallery Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the page header', () => {
        render(<ModelsPage />);

        expect(screen.getByText('Model Gallery')).toBeInTheDocument();
        expect(screen.getByText(/Browse and manage your trained models/i)).toBeInTheDocument();
    });

    it('displays statistics cards', async () => {
        render(<ModelsPage />);

        await waitFor(() => {
            expect(screen.getByText('Total Models')).toBeInTheDocument();
            expect(screen.getByText('Average Accuracy')).toBeInTheDocument();
            expect(screen.getByText('Storage Used')).toBeInTheDocument();
            expect(screen.getByText('Active Models')).toBeInTheDocument();
        });
    });

    it('shows loading state initially', () => {
        render(<ModelsPage />);

        expect(screen.getByText(/Loading models/i)).toBeInTheDocument();
    });

    it('renders model cards after loading', async () => {
        render(<ModelsPage />);

        // Wait for mock data to load
        await waitFor(() => {
            // Mock data should have model names
            const modelNames = screen.queryAllByText(/ResNet|MobileNet|VGG/i);
            expect(modelNames.length).toBeGreaterThan(0);
        });
    });

    it('displays framework badges correctly', async () => {
        render(<ModelsPage />);

        await waitFor(() => {
            // Check for framework badges
            expect(
                screen.queryByText('PyTorch') ||
                screen.queryByText('TensorFlow') ||
                screen.queryByText('Scikit-learn')
            ).toBeTruthy();
        });
    });

    it('filters models by search query', async () => {
        const user = (await import('@testing-library/user-event')).default.setup();
        render(<ModelsPage />);

        await waitFor(() => {
            expect(screen.queryAllByText(/ResNet|MobileNet/i).length).toBeGreaterThan(0);
        });

        const searchInput = screen.getByPlaceholderText(/Search models/i);
        await user.type(searchInput, 'ResNet');

        // Should filter to only ResNet models
        await waitFor(() => {
            expect(screen.queryByText(/MobileNet/i)).not.toBeInTheDocument();
        });
    });

    it('filters models by framework', async () => {
        const user = (await import('@testing-library/user-event')).default.setup();
        render(<ModelsPage />);

        await waitFor(() => {
            expect(screen.queryAllByText(/PyTorch|TensorFlow/i).length).toBeGreaterThan(0);
        });

        const frameworkSelect = screen.getByRole('combobox');
        await user.selectOptions(frameworkSelect, 'PYTORCH');

        // Should only show PyTorch models
        await waitFor(() => {
            const badges = screen.queryAllByText('PyTorch');
            expect(badges.length).toBeGreaterThan(0);
        });
    });

    it('displays model metrics correctly', async () => {
        render(<ModelsPage />);

        await waitFor(() => {
            // Check for accuracy percentages
            expect(screen.queryByText(/%$/)).toBeTruthy();

            // Check for loss values
            expect(screen.queryByText(/Loss:/i)).toBeTruthy();
        });
    });

    it('shows action buttons for each model', async () => {
        render(<ModelsPage />);

        await waitFor(() => {
            expect(screen.queryAllByText(/View/i).length).toBeGreaterThan(0);
            expect(screen.queryAllByText(/Export/i).length).toBeGreaterThan(0);
            expect(screen.queryAllByText(/Delete/i).length).toBeGreaterThan(0);
        });
    });

    it('formats model size correctly', async () => {
        render(<ModelsPage />);

        await waitFor(() => {
            // Should show file sizes in MB/GB
            expect(screen.queryByText(/MB|GB/)).toBeTruthy();
        });
    });

    it('displays empty state when no models found', async () => {
        const user = (await import('@testing-library/user-event')).default.setup();
        render(<ModelsPage />);

        // Search for non-existent model
        const searchInput = screen.getByPlaceholderText(/Search models/i);
        await user.type(searchInput, 'NonExistentModel12345');

        await waitFor(() => {
            expect(screen.getByText(/No models found/i)).toBeInTheDocument();
        });
    });
});
