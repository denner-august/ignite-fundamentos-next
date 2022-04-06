import * as Prismic from '@prismicio/client'

export function getPrismicClient(){
    const prismic =  Prismic.createClient(process.env.PRIMSMIC_TOKEN_URL,
        {
            accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        })

    return prismic
}