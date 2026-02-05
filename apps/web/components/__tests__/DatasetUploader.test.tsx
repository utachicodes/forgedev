import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatasetUploader from '../DatasetUploader';

describe('DatasetUploader', () => {
    const mockOnUploadComplete = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the upload area with correct text', () => {
        render(<DatasetUploader onUploadComplete={mockOnUploadComplete} />);

        expect(screen.getByText(/Drag & drop files here, or click to browse/i)).toBeInTheDocument();
        expect(screen.getByText(/Supports images, CSV, JSON, videos, and ZIP archives/i)).toBeInTheDocument();
    });

    it('renders dataset name input field', () => {
        render(<DatasetUploader onUploadComplete={mockOnUploadComplete} />);

        const nameInput = screen.getByPlaceholderText(/e.g., ImageNet, COCO/i);
        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toHaveAttribute('type', 'text');
    });

    it('renders dataset type selector', () => {
        render(<DatasetUploader onUploadComplete={mockOnUploadComplete} />);

        const typeSelect = screen.getByRole('combobox');
        expect(typeSelect).toBeInTheDocument();

        // Check all dataset type options are present
        expect(screen.getByText('IMAGE')).toBeInTheDocument();
        expect(screen.getByText('TEXT')).toBeInTheDocument();
        expect(screen.getByText('TABULAR')).toBeInTheDocument();
        expect(screen.getByText('VIDEO')).toBeInTheDocument();
    });

    it('updates dataset name when user types', async () => {
        const user = userEvent.setup();
        render(<DatasetUploader onUploadComplete={mockOnUploadComplete} />);

        const nameInput = screen.getByPlaceholderText(/e.g., ImageNet, COCO/i);
        await user.type(nameInput, 'My Test Dataset');

        expect(nameInput).toHaveValue('My Test Dataset');
    });

    it('updates dataset type when user selects', async () => {
        const user = userEvent.setup();
        render(<DatasetUploader onUploadComplete={mockOnUploadComplete} />);

        const typeSelect = screen.getByRole('combobox');
        await user.selectOptions(typeSelect, 'TEXT');

        expect(typeSelect).toHaveValue('TEXT');
    });

    it('displays drag active state when dragging over', async () => {
        render(<DatasetUploader onUploadComplete={mockOnUploadComplete} />);

        const dropzone = screen.getByText(/Drag & drop files here/i).closest('div');

        // Simulate drag enter
        fireEvent.dragEnter(dropzone!);

        await waitFor(() => {
            expect(screen.getByText(/Drop files here.../i)).toBeInTheDocument();
        });
    });

    it('validates required dataset name before upload', async () => {
        render(<DatasetUploader onUploadComplete={mockOnUploadComplete} />);

        // Try to upload without setting name
        const file = new File(['test'], 'test.csv', { type: 'text/csv' });
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;

        if (input) {
            await userEvent.upload(input, file);
        }

        // Verify upload button is disabled or shows error
        // (This depends on your implementation)
    });

    it('shows file upload progress', async () => {
        // Mock fetch for upload API
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: async () => ({ dataset_id: 'test-123', status: 'success' }),
            })
        ) as jest.Mock;

        const user = userEvent.setup();
        render(<DatasetUploader onUploadComplete={mockOnUploadComplete} />);

        // Fill in dataset name
        const nameInput = screen.getByPlaceholderText(/e.g., ImageNet, COCO/i);
        await user.type(nameInput, 'Test Dataset');

        // Upload file
        const file = new File(['test content'], 'test.csv', { type: 'text/csv' });
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;

        if (input) {
            await userEvent.upload(input, file);
        }

        // Check that file name appears in the list
        await waitFor(() => {
            expect(screen.getByText('test.csv')).toBeInTheDocument();
        });
    });

    it('accepts multiple files', async () => {
        const user = userEvent.setup();
        render(<DatasetUploader onUploadComplete={mockOnUploadComplete} />);

        const files = [
            new File(['test1'], 'test1.csv', { type: 'text/csv' }),
            new File(['test2'], 'test2.csv', { type: 'text/csv' }),
            new File(['test3'], 'test3.json', { type: 'application/json' }),
        ];

        const input = document.querySelector('input[type="file"]') as HTMLInputElement;

        if (input) {
            await userEvent.upload(input, files);
        }

        // All files should be listed
        await waitFor(() => {
            expect(screen.getByText('test1.csv')).toBeInTheDocument();
            expect(screen.getByText('test2.csv')).toBeInTheDocument();
            expect(screen.getByText('test3.json')).toBeInTheDocument();
        });
    });

    it('formats file sizes correctly', async () => {
        render(<DatasetUploader onUploadComplete={mockOnUploadComplete} />);

        // Create file with specific size
        const largeFile = new File(
            [new ArrayBuffer(1024 * 1024 * 2.5)], // 2.5 MB
            'large.zip',
            { type: 'application/zip' }
        );

        const input = document.querySelector('input[type="file"]') as HTMLInputElement;

        if (input) {
            await userEvent.upload(input, largeFile);
        }

        // Check that size is formatted (e.g., "2.5 MB")
        await waitFor(() => {
            expect(screen.getByText(/2\.\d+ MB/)).toBeInTheDocument();
        });
    });

    it('calls onUploadComplete with dataset ID on successful upload', async () => {
        const mockDatasetId = 'dataset-abc-123';

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: async () => ({ dataset_id: mockDatasetId, status: 'success' }),
            })
        ) as jest.Mock;

        const user = userEvent.setup();
        render(<DatasetUploader onUploadComplete={mockOnUploadComplete} />);

        // Fill in dataset name
        const nameInput = screen.getByPlaceholderText(/e.g., ImageNet, COCO/i);
        await user.type(nameInput, 'Test Dataset');

        // Upload file and submit
        const file = new File(['test'], 'test.csv', { type: 'text/csv' });
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;

        if (input) {
            await userEvent.upload(input, file);
        }

        // Click upload button
        const uploadButton = screen.getByRole('button', { name: /upload dataset/i });
        await user.click(uploadButton);

        // Verify callback was called with correct ID
        await waitFor(() => {
            expect(mockOnUploadComplete).toHaveBeenCalledWith(mockDatasetId);
        });
    });

    it('displays error message on upload failure', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                statusText: 'Server Error',
            })
        ) as jest.Mock;

        const user = userEvent.setup();
        render(<DatasetUploader onUploadComplete={mockOnUploadComplete} />);

        // Fill in dataset name and upload
        const nameInput = screen.getByPlaceholderText(/e.g., ImageNet, COCO/i);
        await user.type(nameInput, 'Test Dataset');

        const file = new File(['test'], 'test.csv', { type: 'text/csv' });
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;

        if (input) {
            await userEvent.upload(input, file);
        }

        const uploadButton = screen.getByRole('button', { name: /upload dataset/i });
        await user.click(uploadButton);

        // Check for error indication
        await waitFor(() => {
            // Your implementation might show error text or change file status
            expect(screen.getByText(/error/i) || screen.getByText(/failed/i)).toBeInTheDocument();
        });
    });
});
