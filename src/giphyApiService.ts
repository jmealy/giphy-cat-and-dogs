import axios from 'axios'
import { Image } from './types/image'


export const fetchImages = async (searchTerm: string, pageNumber: number): Promise<Image[]> => {
    const { data } = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
            q: searchTerm,
            api_key: '',
            limit: 25,
            offset: (pageNumber - 1) * 25,
        }
    })

    const imageList = data.data.map((image: any) => ({
        url: image.images.fixed_width.url,
        originalUrl: image.images.original.url,
        width: image.images.fixed_width.width,
        height: image.images.fixed_width.height,
    }))

    return imageList;
}
