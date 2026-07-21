import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import WorkPage from '../pages/WorkPage';

describe('work filters',()=>{
  it('filters structured projects by industry and clears filters',async()=>{const user=userEvent.setup();render(<MemoryRouter><WorkPage/></MemoryRouter>);expect(screen.getByText('Showing 7 of 7 projects')).toBeInTheDocument();await user.selectOptions(screen.getByLabelText('Filter by industry'),'Education');expect(screen.getByText('Showing 2 of 7 projects')).toBeInTheDocument();await user.selectOptions(screen.getByLabelText('Filter by industry'),'');expect(screen.getByText('Showing 7 of 7 projects')).toBeInTheDocument()});
});
