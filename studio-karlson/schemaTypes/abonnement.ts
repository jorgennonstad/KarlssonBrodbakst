export default {
    name: 'abonnement',
    title: 'Abonnement',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Tittel',
            type: 'string',
            description: 'Tittelen på abonnementet',
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Beskrivelse',
            type: 'text',
            description: 'Detaljert beskrivelse av abonnementstilbudet',
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
        {
            name: 'backgroundImage',
            title: 'Bakgrunnsbilde',
            type: 'image',
            description: 'Bakgrunnsbilde for abonnementskortet',
            options: {
                hotspot: true, // Lar brukere justere fokuspunktet
            },
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
        {
            name: 'discountPercentage',
            title: 'Rabattprosent',
            type: 'number',
            description: 'Rabattprosent som skal brukes på totalprisen (f.eks. 20 for 20%)',
            validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): { (): any; new(): any; error: { (arg0: string): any; new(): any; }; }; new(): any; }; }; new(): any; }; }; }) =>
                Rule.required()
                    .min(0)
                    .max(100)
                    .error('Rabattprosenten må være mellom 0 og 100'),
        },
        {
            name: 'deliveryFee',
            title: 'Leveringsgebyr',
            type: 'number',
            description: 'Et fast gebyr for levering eller håndtering',
            validation: (Rule: { required: () => { (): any; new(): any; positive: { (): any; new(): any; }; }; }) => Rule.required().positive(),
        },
    ],
  };
  