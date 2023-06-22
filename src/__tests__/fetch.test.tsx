/**
* @vitest-environment jsdom
*/

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest';
import App from '../App'

vi.mock('../giphyApiService', () => ({
    fetchImages: vi.fn().mockReturnValue([
        {
            "url": "https://media1.giphy.com/media/n5CHDD8c4sW18Dqz3z/200w.gif?cid=f0c0ba20ikjk8ijzyg94lmwsobygmr4nsgb7c9mmxcvscsxb&ep=v1_gifs_search&rid=200w.gif&ct=g",
            "originalUrl": "https://media1.giphy.com/media/n5CHDD8c4sW18Dqz3z/giphy.gif?cid=f0c0ba20ikjk8ijzyg94lmwsobygmr4nsgb7c9mmxcvscsxb&ep=v1_gifs_search&rid=giphy.gif&ct=g",
            "width": "200",
            "height": "356"
        },
        {
            "url": "https://media4.giphy.com/media/2C2qwckZzyiz8UzvzK/200w.gif?cid=f0c0ba20ikjk8ijzyg94lmwsobygmr4nsgb7c9mmxcvscsxb&ep=v1_gifs_search&rid=200w.gif&ct=g",
            "originalUrl": "https://media4.giphy.com/media/2C2qwckZzyiz8UzvzK/giphy.gif?cid=f0c0ba20ikjk8ijzyg94lmwsobygmr4nsgb7c9mmxcvscsxb&ep=v1_gifs_search&rid=giphy.gif&ct=g",
            "width": "200",
            "height": "356"
        }
    ])
}));

describe('giphy app', async () => {
    render(<App />)

    it('Should load the first page of images', async () => {
        expect(screen.queryAllByRole('img')).toHaveLength(0);
        await userEvent.click(screen.getByText('Show Me Cats 🐱'))
        expect(screen.queryAllByRole('img')).toHaveLength(2);
    })

    it('Should load the second page of images', async () => {
        await userEvent.click(screen.getByText('Load More'))
        expect(screen.queryAllByRole('img')).toHaveLength(4);
    })

    it('Should open the modal when an image is clicked', async () => {
        await userEvent.click(screen.getAllByRole('img')[0])
        await screen.queryAllByRole('img');
        expect(screen.getByRole('presentation')).toBeTruthy();
    })
})
