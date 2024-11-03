export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields:[
        {
            name: 'name',
            type: 'string',
            title: 'Name of product',
        },
        {
            name: 'images',
            type: 'array',
            title: 'Product images',
            of: [{type: 'image'}],
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description of product',
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Product slug',
            options: {
                source: 'name',
                maxLength: 96,
            }
        },
        {
            name: 'price',
            type: 'number',
            title: 'Price',
        },
        {
            name: 'category',
            type: 'reference',
            title: 'Category',
            to: [{type: 'category'}],
        }
    ]
}