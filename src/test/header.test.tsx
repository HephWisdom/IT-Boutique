import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Header } from '../components/Layout';

describe('hero navigation',()=>{
  it('transitions from transparent to sticky styling after scroll',()=>{Object.defineProperty(window,'scrollY',{value:0,writable:true,configurable:true});const {container}=render(<MemoryRouter><Header/></MemoryRouter>);const header=container.querySelector('header');expect(header).not.toHaveClass('is-scrolled');Object.defineProperty(window,'scrollY',{value:80,writable:true,configurable:true});fireEvent.scroll(window);expect(header).toHaveClass('is-scrolled')});
  it('opens an accessible mobile dialog and closes it with Escape',async()=>{const user=userEvent.setup();render(<MemoryRouter><Header/></MemoryRouter>);const trigger=screen.getByRole('button',{name:'Open menu'});await user.click(trigger);expect(screen.getByRole('dialog',{name:'Navigation menu'})).toBeInTheDocument();expect(screen.getByRole('button',{name:'Close menu'})).toHaveFocus();await user.keyboard('{Escape}');await waitFor(()=>expect(screen.queryByRole('dialog',{name:'Navigation menu'})).not.toBeInTheDocument());await waitFor(()=>expect(trigger).toHaveFocus())});
});
